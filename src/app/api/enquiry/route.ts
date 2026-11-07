import { ENQUIRY_KINDS, isEnquiryKind, validateEnquiry, type EnquiryValues } from "@/lib/enquiry"

// Delivery uses Resend (https://resend.com), like the contact form. Set these in the host's environment:
//   RESEND_API_KEY        required, without it the form reports that it is not set up
//   INVESTOR_TO_EMAIL     optional, where investor enquiries go; falls back to CONTACT_TO_EMAIL
//   PARTNERSHIP_TO_EMAIL  optional, where partnership enquiries go; falls back to CONTACT_TO_EMAIL
//   CONTACT_TO_EMAIL      optional, defaults to contact@manikstu.com
//   CONTACT_FROM_EMAIL    optional, must be on a domain verified in Resend
// Every message starts its subject with [Investor] or [Partnership], so one inbox can still filter them apart.

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

  // A real visitor never sees this field, so any value means a bot. Answer as if it worked.
  if (text(body.website)) return Response.json({ ok: true })

  if (!isEnquiryKind(body.kind)) return Response.json({ error: "bad_request" }, { status: 400 })
  const kind = body.kind

  const values: EnquiryValues = {
    type: kind === "partnership" ? text(body.type) : "",
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    org: text(body.org),
    message: text(body.message),
  }
  const errors = validateEnquiry(values, kind)
  if (Object.keys(errors).length) return Response.json({ error: "invalid", errors }, { status: 422 })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Enquiry form: RESEND_API_KEY is not set, message not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const label = ENQUIRY_KINDS[kind]
  const fallback = process.env.CONTACT_TO_EMAIL ?? "contact@manikstu.com"
  const to = (kind === "investor" ? process.env.INVESTOR_TO_EMAIL : process.env.PARTNERSHIP_TO_EMAIL) ?? fallback

  const lines = [
    `Enquiry type: ${label}`,
    ...(values.type ? [`Partnership type: ${values.type}`] : []),
    `Name: ${values.name}`,
    `Organisation: ${values.org || "not given"}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    "",
    values.message,
  ]
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Manikstu website <onboarding@resend.dev>",
      to: [to],
      reply_to: values.email,
      subject: `[${label}] ${values.type ? `${values.type.split(" (")[0]} enquiry` : "Enquiry"} from ${values.name}${values.org ? `, ${values.org}` : ""}`,
      text: lines.join("\n"),
    }),
  })

  if (!response.ok) {
    console.error("Enquiry form: delivery failed", response.status, await response.text())
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
