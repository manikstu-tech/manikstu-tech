import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

// One shared admin password (ADMIN_PASSWORD). While developing, "admin" works so the panel needs no setup; in production
// nothing works until the variable is set. The session is a cookie holding an expiry time and its HMAC, so there is no session store.
const DEV = process.env.NODE_ENV !== "production"
const PASSWORD = process.env.ADMIN_PASSWORD ?? (DEV ? "admin" : "")
const SECRET = process.env.ADMIN_SECRET ?? PASSWORD
export const COOKIE = "mk_admin"
export const SESSION_HOURS = 8
export const adminConfigured = !!PASSWORD

const sign = (value: string) => createHmac("sha256", SECRET).update(value).digest("hex")
const digest = (value: string) => createHash("sha256").update(value).digest()

export const passwordMatches = (input: string) => !!PASSWORD && timingSafeEqual(digest(input), digest(PASSWORD))

export const newToken = () => {
  const expires = String(Date.now() + SESSION_HOURS * 3600_000)
  return `${expires}.${sign(expires)}`
}

function valid(token?: string) {
  if (!token || !PASSWORD) return false
  const [expires, sig] = token.split(".")
  if (!expires || !sig || Number(expires) < Date.now()) return false
  const a = Buffer.from(sig)
  const b = Buffer.from(sign(expires))
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function isAdmin() {
  return valid((await cookies()).get(COOKIE)?.value)
}
