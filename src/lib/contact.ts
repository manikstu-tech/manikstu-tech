import { CATEGORIES, ENQUIRY_TYPES } from "@/constants/contact"
import { EMAIL_MESSAGE, isEmail } from "@/lib/email"

export type ContactValues = {
  name: string
  email: string
  phone: string
  type: string
  category: string
  city: string
  state: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

// Runs in the browser for instant feedback and again on the server, which is the one that counts.
export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = v.name.trim()
  if (name.length < 2 || name.length > 100)
    errors.name = "Please enter your full name."
  if (!isEmail(v.email)) errors.email = EMAIL_MESSAGE
  if (v.phone.trim() && !/^\+?[0-9 ()-]{7,18}$/.test(v.phone.trim()))
    errors.phone = "Please enter a valid phone number."
  if (!ENQUIRY_TYPES.includes(v.type)) errors.type = "Please choose a type."
  if (!CATEGORIES[v.type]?.includes(v.category))
    errors.category = "Please choose a category."
  if (v.city.length > 80) errors.city = "That city name is too long."
  if (v.state.length > 80) errors.state = "That state name is too long."
  const message = v.message.trim()
  if (message.length < 10)
    errors.message = "Please tell us a little more, at least 10 characters."
  else if (message.length > 2000)
    errors.message = "Please keep your message under 2000 characters."
  return errors
}
