import { EMAIL_MESSAGE, isEmail } from "@/lib/email"

export type Customer = {
  name: string
  phone: string
  email: string
  address: string
  landmark: string
  city: string
  district: string
  state: string
  pincode: string
  notes: string
}

export type CustomerErrors = Partial<Record<keyof Customer, string>>

// Shared by the checkout form (instant feedback) and the API route (the check that counts)
export function validateCustomer(c: Customer): CustomerErrors {
  const errors: CustomerErrors = {}
  const len = (v: string) => v.trim().length
  if (len(c.name) < 2 || len(c.name) > 60) errors.name = "Enter your full name."
  if (!/^[6-9]\d{9}$/.test(c.phone.replace(/[\s-]/g, ""))) errors.phone = "Enter a 10-digit mobile number."
  if (!isEmail(c.email)) errors.email = EMAIL_MESSAGE
  if (len(c.address) < 8 || len(c.address) > 200) errors.address = "Enter your full delivery address."
  if (len(c.landmark) > 100) errors.landmark = "Keep the landmark under 100 characters."
  if (len(c.city) < 2 || len(c.city) > 60) errors.city = "Enter your city or village."
  if (len(c.district) < 2 || len(c.district) > 60) errors.district = "Enter your district."
  if (len(c.state) < 2 || len(c.state) > 60) errors.state = "Enter your state."
  if (!/^[1-9]\d{5}$/.test(c.pincode.trim())) errors.pincode = "Enter a 6-digit PIN code."
  if (len(c.notes) > 500) errors.notes = "Keep the order notes under 500 characters."
  return errors
}
