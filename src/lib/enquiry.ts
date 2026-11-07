import { EMAIL_MESSAGE, isEmail } from "@/lib/email"

// The two enquiry forms (Investors page, Partners page) share one endpoint; `kind` is how a message is told apart.
export const ENQUIRY_KINDS = { investor: "Investor", partnership: "Partnership" } as const
export type EnquiryKind = keyof typeof ENQUIRY_KINDS

// The kinds of partner a partnership enquiry can come from (the Type dropdown on the partner form)
export const PARTNER_TYPES = [
  "Partner",
  "Franchise",
  "FPO (Farmer Producer Organisation)",
  "VLE (Village Level Entrepreneur)",
] as const

export type EnquiryValues = {
  // One of PARTNER_TYPES on a partnership enquiry; empty on an investor one
  type: string
  name: string
  email: string
  phone: string
  org: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

export const isEnquiryKind = (value: unknown): value is EnquiryKind =>
  typeof value === "string" && value in ENQUIRY_KINDS

// Runs in the browser for instant feedback and again on the server, which is the one that counts.
export function validateEnquiry(v: EnquiryValues, kind?: EnquiryKind): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (kind === "partnership" && !(PARTNER_TYPES as readonly string[]).includes(v.type))
    errors.type = "Please choose the type of partnership."
  const name = v.name.trim()
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your full name."
  if (!isEmail(v.email)) errors.email = EMAIL_MESSAGE
  if (!v.phone.trim()) errors.phone = "Please enter your phone number."
  else if (!/^\+?[0-9 ()-]{7,18}$/.test(v.phone.trim())) errors.phone = "Please enter a valid phone number."
  // Organisation is optional; when given it must look like a name
  const org = v.org.trim()
  if (org && (org.length < 2 || org.length > 120)) errors.org = "Please enter your organisation's full name, or leave it blank."
  const message = v.message.trim()
  if (message.length < 10) errors.message = "Please tell us a little more, at least 10 characters."
  else if (message.length > 2000) errors.message = "Please keep your message under 2000 characters."
  return errors
}
