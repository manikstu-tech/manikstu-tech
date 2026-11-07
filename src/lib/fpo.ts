// The FPO Connect enquiry form's choices and checks. The page and the API route share them, so the two can never disagree.
export const MEMBER_OPTIONS = ["Below 100", "100 to 250", "251 to 500", "More than 500", "Not sure"]
export const EXPLORE_OPTIONS = [
  "Free vaccination camp and partnership",
  "Commission partnership",
  "Distribution partnership",
  "Manikstu Goat Care Centre",
  "Goat manure collection",
  "All opportunities",
]

export type FpoValues = {
  fpo: string
  district: string
  contact: string
  phone: string
  members: string
  explore: string
  message: string
}

export type FpoErrors = Partial<Record<keyof FpoValues, string>>

// Runs in the browser for instant feedback and again on the server, which is the one that counts.
export function validateFpo(v: FpoValues): FpoErrors {
  const errors: FpoErrors = {}
  const fpo = v.fpo.trim()
  if (fpo.length < 2 || fpo.length > 120) errors.fpo = "Please enter your FPO's name."
  const district = v.district.trim()
  if (district.length < 2 || district.length > 80) errors.district = "Please enter your district."
  const contact = v.contact.trim()
  if (contact.length < 2 || contact.length > 100) errors.contact = "Please enter the contact person's name."
  if (!/^\+?[0-9 ()-]{7,18}$/.test(v.phone.trim())) errors.phone = "Please enter a valid mobile number."
  // The two dropdowns are optional, but a value that is not one of the choices is not from the form
  if (v.members && !MEMBER_OPTIONS.includes(v.members)) errors.members = "Please choose one of the options."
  if (v.explore && !EXPLORE_OPTIONS.includes(v.explore)) errors.explore = "Please choose one of the options."
  if (v.message.length > 2000) errors.message = "Please keep your message under 2000 characters."
  return errors
}
