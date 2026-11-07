// Guards shared by every route that takes a request from the public: a rate limit and a cap on the body size.
// No "@/" imports here, so `node --test` can load this file on its own.

// The visitor's address as the first proxy saw it. A client can put anything in x-forwarded-for, so this is only good for a
// per-visitor limit; the shared limit in rateLimiter() is what holds when someone sends a fresh made-up address every time.
export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
}

type Limits = { perVisitor: number; total: number; windowMs: number }

// shortcut: the counts live in this server instance's memory, so they reset on restart and are not shared between instances.
// Move them to a shared store (Redis, Upstash) if the site ever runs on more than one instance.
export function rateLimiter({ perVisitor, total, windowMs }: Limits) {
  const hits = new Map<string, number[]>()
  let all: number[] = []
  // Returns true when this request is over a limit. A refused request is not counted, so a flood cannot extend its own lockout.
  return function limited(ip: string, now = Date.now()) {
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
    all = all.filter((t) => now - t < windowMs)
    if (recent.length >= perVisitor || all.length >= total) {
      if (recent.length) hits.set(ip, recent)
      else hits.delete(ip)
      return true
    }
    recent.push(now)
    all.push(now)
    hits.set(ip, recent)
    // Drop visitors with nothing left in the window, so the map cannot grow without end
    if (hits.size > 5000) for (const [key, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(key)
    return false
  }
}

export type Body = { ok: true; bytes: Buffer } | { ok: false; response: Response }
const refuse = (error: string, status: number) => ({ ok: false as const, response: Response.json({ error }, { status }) })

// Reads the request body, stopping as soon as it passes maxBytes, so a hostile client cannot make the server hold megabytes
export async function readBody(request: Request, maxBytes: number): Promise<Body> {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) return refuse("payload_too_large", 413)
  const reader = request.body?.getReader()
  if (!reader) return refuse("bad_request", 400)
  const chunks: Uint8Array[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) {
      await reader.cancel()
      return refuse("payload_too_large", 413)
    }
    chunks.push(value)
  }
  return { ok: true, bytes: Buffer.concat(chunks) }
}

export type JsonBody = { ok: true; data: Record<string, unknown> } | { ok: false; response: Response }

// Reads a JSON object body: the object, or the response to send back when it is missing, broken, not an object or too big.
// Every form and order on this site is a few kilobytes, so 100 KB is the default.
export async function readJson(request: Request, maxBytes = 100 * 1024): Promise<JsonBody> {
  const body = await readBody(request, maxBytes)
  if (!body.ok) return body
  try {
    const data: unknown = JSON.parse(body.bytes.toString("utf8"))
    return data && typeof data === "object" && !Array.isArray(data) ? { ok: true, data: data as Record<string, unknown> } : refuse("bad_request", 400)
  } catch {
    return refuse("bad_request", 400)
  }
}
