import { EMAIL_MESSAGE, isEmail } from "@/lib/email"

// Job application from the Careers page. Runs in the browser for instant feedback
// and again on the server, which is the one that counts.

export type ApplicationValues = {
  name: string
  email: string
  phone: string
  role: string
  city: string
  message: string
}

export type ApplicationErrors = Partial<Record<keyof ApplicationValues | "resume", string>>

// Kept under the 4.5 MB request limit of serverless hosts such as Vercel, with room for the other fields
export const RESUME_MAX_BYTES = 4 * 1024 * 1024
export const RESUME_TYPES = [".pdf", ".doc", ".docx"]

export function validateApplication(v: ApplicationValues): ApplicationErrors {
  const errors: ApplicationErrors = {}
  const name = v.name.trim()
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your full name."
  if (!isEmail(v.email)) errors.email = EMAIL_MESSAGE
  if (!/^\+?[0-9 ()-]{7,18}$/.test(v.phone.trim())) errors.phone = "Please enter a valid phone number."
  if (v.role.length > 100) errors.role = "Please keep this under 100 characters."
  if (v.city.length > 80) errors.city = "That city name is too long."
  if (v.message.trim().length > 2000) errors.message = "Please keep this under 2000 characters."
  return errors
}

export function resumeError(file: { name: string; size: number } | null): string | undefined {
  if (!file || !file.size) return "Please attach your resume."
  const name = file.name.toLowerCase()
  if (!RESUME_TYPES.some((ext) => name.endsWith(ext))) return "Please attach a PDF or Word file."
  if (file.size > RESUME_MAX_BYTES) return "Please keep your resume under 4 MB."
}
