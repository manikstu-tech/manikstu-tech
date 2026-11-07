// One email check for every form, run in the browser and again on the server.
// It wants name@domain.tld: a sensible name part, a domain, and a top-level domain of at least two letters.
const SHAPE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/

export const EMAIL_MESSAGE = "Please enter a valid email address, like name@example.com."

export function isEmail(value: string) {
  const email = value.trim()
  if (email.length > 120 || !SHAPE.test(email)) return false
  const [name, domain] = email.split("@")
  // No dot at either end of the name, no two dots in a row, and no domain part that starts or ends with a hyphen
  return (
    !name.startsWith(".") &&
    !name.endsWith(".") &&
    !email.includes("..") &&
    domain.split(".").every((part) => !part.startsWith("-") && !part.endsWith("-"))
  )
}

// For checking the field when the visitor leaves it: nothing typed yet is not an error until they submit
export const emailError = (value: string) => (value.trim() && !isEmail(value) ? EMAIL_MESSAGE : undefined)
