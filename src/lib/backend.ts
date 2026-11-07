// The shop's orders, payments and reviews live in a separate backend service (the manikstu-backend project).
// These routes only pass requests to it. The API key stays on this server and never reaches the browser.
//
// Settings (see .env.example):
//   BACKEND_URL       where the backend runs, for example http://localhost:4000
//   BACKEND_API_KEY   the same secret as API_KEY in the backend

const TIMEOUT_MS = 15_000

type CallOptions = { method?: "GET" | "POST"; body?: unknown }

// Sends one request to the backend and returns its answer as it is (same status, same JSON), so the browser sees the backend's error codes
export async function callBackend(request: Request, path: string, { method = "GET", body }: CallOptions = {}): Promise<Response> {
  const base = process.env.BACKEND_URL
  if (!base) return Response.json({ error: "backend_not_configured" }, { status: 503 })

  const headers: Record<string, string> = { Accept: "application/json" }
  if (body !== undefined) headers["Content-Type"] = "application/json"
  if (process.env.BACKEND_API_KEY) headers["x-api-key"] = process.env.BACKEND_API_KEY
  // The backend rate-limits by visitor address, so it needs the visitor's address, not this server's.
  // The LAST entry is the one the proxy in front of this site (Vercel, nginx, a load balancer) added itself from the real connection.
  // Earlier entries are whatever the visitor wrote, so using the first would let anyone dodge the limits by inventing addresses.
  // This relies on the site being served behind such a proxy, as it is on Vercel.
  const visitor = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim()
  if (visitor) headers["x-forwarded-for"] = visitor

  try {
    const res = await fetch(new URL(path, base), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    })
    return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } })
  } catch (error) {
    console.error("Backend: could not be reached", error instanceof Error ? error.message : error)
    return Response.json({ error: "backend_unreachable" }, { status: 502 })
  }
}

// Bodies are read with the shared size cap: an order, a review or a payment proof is a few kilobytes
export { readJson, type JsonBody } from "@/lib/requestGuard"
