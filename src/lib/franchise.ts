// The franchise interest form's choices and checks. The page and the API route share them, so the two can never disagree.
export const LAND_OPTIONS = ["I own suitable land", "I can lease or arrange land", "I do not have land yet"]
export const FUNDING_OPTIONS = [
  "I can fund the full investment",
  "I would need a loan",
  "Part own funds, part loan",
  "Not sure yet",
]
export const TIMELINE_OPTIONS = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring for now"]

export type FranchiseValues = {
  name: string
  phone: string
  district: string
  state: string
  land: string
  area: string
  funding: string
  experience: string
  timeline: string
}

export type FranchiseErrors = Partial<Record<keyof FranchiseValues, string>>

// Runs in the browser for instant feedback and again on the server, which is the one that counts.
export function validateFranchise(v: FranchiseValues): FranchiseErrors {
  const errors: FranchiseErrors = {}
  const name = v.name.trim()
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your full name."
  if (!/^\+?[0-9 ()-]{7,18}$/.test(v.phone.trim())) errors.phone = "Please enter a valid mobile number."
  const district = v.district.trim()
  if (district.length < 2 || district.length > 80) errors.district = "Please enter your district."
  const state = v.state.trim()
  if (state.length < 2 || state.length > 80) errors.state = "Please choose your state."
  if (!LAND_OPTIONS.includes(v.land)) errors.land = "Please tell us about your land."
  if (v.area.length > 40) errors.area = "Please keep this short, for example 2 acres."
  if (!FUNDING_OPTIONS.includes(v.funding)) errors.funding = "Please tell us how you plan to fund it."
  if (v.experience.length > 600) errors.experience = "Please keep this under 600 characters."
  if (!TIMELINE_OPTIONS.includes(v.timeline)) errors.timeline = "Please choose when you would like to start."
  return errors
}
