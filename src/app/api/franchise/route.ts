import { clientIp, rateLimiter, readJson } from "@/lib/requestGuard"
import { validateFranchise, type FranchiseValues } from "@/lib/franchise"

// Delivery uses Resend (https://resend.com), like the contact and enquiry forms. Set these in the host's environment:
//   RESEND_API_KEY       required, without it the form reports that it is not set up
//   FRANCHISE_TO_EMAIL   optional, where franchise interest goes; falls back to PARTNERSHIP_TO_EMAIL, then CONTACT_TO_EMAIL
//   CONTACT_FROM_EMAIL   optional, must be on a domain verified in Resend
// Every message starts its subject with [Franchise], so one inbox can still filter them apart.

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

  const values: FranchiseValues = {
    name: text(body.name),
    phone: text(body.phone),
    district: text(body.district),
    state: text(body.state),
    land: text(body.land),
    area: text(body.area),
    funding: text(body.funding),
    experience: text(body.experience),
    timeline: text(body.timeline),
  }
  const errors = validateFranchise(values)
  if (Object.keys(errors).length) return Response.json({ error: "invalid", errors }, { status: 422 })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Franchise form: RESEND_API_KEY is not set, message not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const to =
    process.env.FRANCHISE_TO_EMAIL ?? process.env.PARTNERSHIP_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? "contact@manikstu.com"
  const lines = [
    "Franchise interest",
    `Name: ${values.name}`,
    `Mobile: ${values.phone}`,
    `District and state: ${values.district}, ${values.state}`,
    `Land: ${values.land}${values.area.trim() ? ` (${values.area.trim()})` : ""}`,
    `Funding: ${values.funding}`,
    `Preferred start: ${values.timeline}`,
    "",
    `Experience: ${values.experience.trim() || "not given"}`,
  ]
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Manikstu website <onboarding@resend.dev>",
      to: [to],
      subject: `[Franchise] Interest from ${values.name}, ${values.district}, ${values.state}`,
      text: lines.join("\n"),
    }),
  })

  if (!response.ok) {
    console.error("Franchise form: delivery failed", response.status, await response.text())
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
