import { cookies } from "next/headers"
import { COOKIE, SESSION_HOURS, adminConfigured, newToken, passwordMatches } from "@/lib/adminAuth"

// shortcut: the attempt limit lives in this server instance's memory, so it resets on restart and is not shared between
// serverless instances. Move it to a shared store (Redis, Upstash) if the admin address is ever attacked.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 8

export async function POST(request: Request) {
  if (!adminConfigured) return Response.json({ error: "not_configured" }, { status: 503 })
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (recent.length > MAX_PER_WINDOW) return Response.json({ error: "rate_limited" }, { status: 429 })

  let password = ""
  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : ""
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 })
  }
  if (!passwordMatches(password)) return Response.json({ error: "wrong_password" }, { status: 401 })

  ;(await cookies()).set(COOKIE, newToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  })
  return Response.json({ ok: true })
}
