import { cookies } from "next/headers"
import { COOKIE, SESSION_HOURS, adminConfigured, newToken, passwordMatches } from "@/lib/adminAuth"
import { clientIp, rateLimiter, readJson } from "@/lib/requestGuard"

// 8 tries per visitor, and 30 for everyone together: a made-up x-forwarded-for on every try still hits the shared cap
const limited = rateLimiter({ perVisitor: 8, total: 30, windowMs: 10 * 60 * 1000 })

export async function POST(request: Request) {
  if (!adminConfigured) return Response.json({ error: "not_configured" }, { status: 503 })
  if (limited(clientIp(request))) return Response.json({ error: "rate_limited" }, { status: 429 })

  const parsed = await readJson(request, 4 * 1024)
  if (!parsed.ok) return parsed.response
  const password = typeof parsed.data.password === "string" ? parsed.data.password : ""
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
