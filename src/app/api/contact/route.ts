import { clientIp, rateLimiter, readJson } from "@/lib/requestGuard"
import { validateContact, type ContactValues } from "@/lib/contact"

// Delivery uses Resend (https://resend.com). Set these in the host's environment:
//   RESEND_API_KEY      required, without it the form reports that it is not set up
//   CONTACT_TO_EMAIL    optional, defaults to contact@manikstu.com
//   CONTACT_FROM_EMAIL  optional, must be on a domain verified in Resend

// Per visitor, and a cap for everyone together so made-up addresses cannot get around it
const limited = rateLimiter({ perVisitor: 5, total: 60, windowMs: 10 * 60 * 1000 })

const text = (value: unknown) => (typeof value === "string" ? value : "")

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (limited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 })
  }

  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

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
