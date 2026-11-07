import { HR_EMAIL } from "@/constants/careers"
import { resumeError, validateApplication, type ApplicationValues } from "@/lib/application"

// Delivery uses Resend (https://resend.com), like the contact form. Set these in the host's environment:
//   RESEND_API_KEY      required, without it the form reports that it is not set up
//   CAREERS_TO_EMAIL    optional, defaults to the HR address shown on the Careers page
//   CONTACT_FROM_EMAIL  optional, must be on a domain verified in Resend

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

// The file name can be faked, so check the first bytes too: PDF, DOCX (a zip) or the older DOC format
function looksLikeResume(bytes: Uint8Array) {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b)
  return starts(0x25, 0x50, 0x44, 0x46) || starts(0x50, 0x4b, 0x03, 0x04) || starts(0xd0, 0xcf, 0x11, 0xe0)
}

const text = (data: FormData, key: string) => {
  const value = data.get(key)
  return typeof value === "string" ? value : ""
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 })

  let data: FormData
  try {
    data = await request.formData()
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 })
  }

  // A real visitor never sees this field, so any value means a bot. Answer as if it worked.
  if (text(data, "website")) return Response.json({ ok: true })

  const values: ApplicationValues = {
    name: text(data, "name"),
    email: text(data, "email"),
    phone: text(data, "phone"),
    role: text(data, "role"),
    city: text(data, "city"),
    message: text(data, "message"),
  }
  const resume = data.get("resume")
  const file = resume instanceof File ? resume : null
  const errors = validateApplication(values)
  const fileProblem = resumeError(file)
  if (fileProblem) errors.resume = fileProblem
  const bytes = file && !fileProblem ? new Uint8Array(await file.arrayBuffer()) : null
  if (bytes && !looksLikeResume(bytes)) errors.resume = "Please attach a PDF or Word file."
  if (Object.keys(errors).length || !file || !bytes) {
    return Response.json({ error: "invalid", errors }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Careers form: RESEND_API_KEY is not set, application not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Role or area of interest: ${values.role || "not given"}`,
    `City: ${values.city || "not given"}`,
    "",
    values.message.trim() || "(no message)",
    "",
    `Resume attached: ${file.name}`,
  ]
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Manikstu website <onboarding@resend.dev>",
      to: [process.env.CAREERS_TO_EMAIL ?? HR_EMAIL],
      reply_to: values.email,
      subject: `[Careers] Application from ${values.name}${values.role ? ` (${values.role})` : ""}`,
      text: lines.join("\n"),
      attachments: [{ filename: file.name.replace(/[^\w.() -]/g, "_"), content: Buffer.from(bytes).toString("base64") }],
    }),
  })

  if (!response.ok) {
    console.error("Careers form: delivery failed", response.status, await response.text())
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
