import { validateContact, type ContactValues } from "@/lib/contact"

// Delivery uses Resend (https://resend.com). Set these in the host's environment:
//   RESEND_API_KEY      required, without it the form reports that it is not set up
//   CONTACT_TO_EMAIL    optional, defaults to contact@manikstu.com
//   CONTACT_FROM_EMAIL  optional, must be on a domain verified in Resend

// shortcut: the rate limit lives in this server instance's memory, so it resets on restart and is not shared
// between serverless instances. Move it to a shared store (Redis, Upstash) if abuse shows up.
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
  if (limited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 })
  }

  // A real visitor never sees this field, so any value means a bot. Answer as if it worked.
  if (text(body.website)) return Response.json({ ok: true })

  const values: ContactValues = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    type: text(body.type),
    category: text(body.category),
    city: text(body.city),
    state: text(body.state),
    message: text(body.message),
  }
  const errors = validateContact(values)
  if (Object.keys(errors).length) {
    return Response.json({ error: "invalid", errors }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set, message not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const lines = [
    `Type: ${values.type}`,
    `Category: ${values.category}`,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "not given"}`,
    `City: ${values.city || "not given"}`,
    `State: ${values.state || "not given"}`,
    "",
    values.message,
  ]
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Manikstu website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "contact@manikstu.com"],
      reply_to: values.email,
      subject: `[${values.type}] ${values.category} from ${values.name}`,
      text: lines.join("\n"),
    }),
  })

  if (!response.ok) {
    console.error("Contact form: delivery failed", response.status, await response.text())
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
