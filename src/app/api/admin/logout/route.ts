import { cookies } from "next/headers"
import { COOKIE } from "@/lib/adminAuth"

export async function POST() {
  ;(await cookies()).delete(COOKIE)
  return Response.json({ ok: true })
}
