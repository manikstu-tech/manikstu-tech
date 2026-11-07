import { clientIp, rateLimiter, readJson } from "@/lib/requestGuard"
import { validateFpo, type FpoValues } from "@/lib/fpo"

// Delivery uses Resend (https://resend.com), like the contact and franchise forms. Set these in the host's environment:
//   RESEND_API_KEY       required, without it the form reports that it is not set up
//   FPO_TO_EMAIL         optional, where FPO enquiries go; falls back to PARTNERSHIP_TO_EMAIL, then CONTACT_TO_EMAIL
//   CONTACT_FROM_EMAIL   optional, must be on a domain verified in Resend
// Every message starts its subject with [FPO Connect], so one inbox can still filter them apart.

// Per visitor, and a cap for everyone together so made-up addresses cannot get around it
const limited = rateLimiter({ perVisitor: 5, total: 60, windowMs: 10 * 60 * 1000 })

const text = (value: unknown) => (typeof value === "string" ? value : "")

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 })

  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  // A real visitor never sees this field, so any value means a bot. Answer as if it worked.
  if (text(body.website)) return Response.json({ ok: true })

  const values: FpoValues = {
    fpo: text(body.fpo),
    district: text(body.district),
    contact: text(body.contact),
    phone: text(body.phone),
    members: text(body.members),
    explore: text(body.explore),
    message: text(body.message),
  }
  const errors = validateFpo(values)
  if (Object.keys(errors).length) return Response.json({ error: "invalid", errors }, { status: 422 })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("FPO form: RESEND_API_KEY is not set, message not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const to = process.env.FPO_TO_EMAIL ?? process.env.PARTNERSHIP_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? "contact@manikstu.com"
  const lines = [
    "FPO Connect enquiry",
    `FPO: ${values.fpo}`,
    `District: ${values.district}`,
    `Contact person: ${values.contact}`,
    `Mobile: ${values.phone}`,
    `Goat-rearing members: ${values.members || "not given"}`,
    `Wants to explore: ${values.explore || "not given"}`,
    "",
    values.message.trim() || "No message.",
  ]
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Manikstu website <onboarding@resend.dev>",
      to: [to],
      subject: `[FPO Connect] Enquiry from ${values.fpo}, ${values.district}`,
      text: lines.join("\n"),
    }),
  })

  if (!response.ok) {
    console.error("FPO form: delivery failed", response.status, await response.text())
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
