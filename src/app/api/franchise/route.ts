import { validateFranchise, type FranchiseValues } from "@/lib/franchise"

// Delivery uses Resend (https://resend.com), like the contact and enquiry forms. Set these in the host's environment:
//   RESEND_API_KEY       required, without it the form reports that it is not set up
//   FRANCHISE_TO_EMAIL   optional, where franchise interest goes; falls back to PARTNERSHIP_TO_EMAIL, then CONTACT_TO_EMAIL
//   CONTACT_FROM_EMAIL   optional, must be on a domain verified in Resend
// Every message starts its subject with [Franchise], so one inbox can still filter them apart.

// shortcut: the rate limit lives in this server instance's memory, as in the contact route
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const text = (value: unknown) => (typeof value === "string" ? value : "")

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 })
  }
  // Valid JSON that is not an object (null, a number, a string) is not a form either
  if (typeof body !== "object" || body === null || Array.isArray(body)) return Response.json({ error: "bad_request" }, { status: 400 })

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
