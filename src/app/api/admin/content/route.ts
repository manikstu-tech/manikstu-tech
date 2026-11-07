import { revalidateTag } from "next/cache"
import { cmsDoc } from "@/constants/cms"
import { isAdmin } from "@/lib/adminAuth"
import { readJson } from "@/lib/requestGuard"
import { saveOverrides } from "@/lib/cms"
import { validOverrides } from "@/lib/cmsFields"

// Saves the edits for one page. The body is the whole set of edits, so a field set back to its default simply drops out.
export async function PUT(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const parsed = await readJson(request, 1024 * 1024)
  if (!parsed.ok) return parsed.response
  const body = parsed.data as { key?: unknown; data?: unknown }
  const doc = typeof body?.key === "string" ? cmsDoc(body.key) : undefined
  if (!doc) return Response.json({ error: "not_found" }, { status: 404 })
  const data = validOverrides(doc.defaults, body.data)
  if (!data) return Response.json({ error: "invalid" }, { status: 422 })
  try {
    await saveOverrides(doc.key, data)
  } catch (error) {
    console.error("CMS save failed:", error)
    const notSet = error instanceof Error && error.message === "storage_not_configured"
    return Response.json({ error: notSet ? "storage_not_configured" : "save_failed" }, { status: notSet ? 503 : 500 })
  }
  // Every page reads its content through this tag; expire: 0 means the next visit already shows the edit
  revalidateTag("cms", { expire: 0 })
  return Response.json({ ok: true })
}
