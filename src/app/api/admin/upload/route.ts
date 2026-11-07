import { isAdmin } from "@/lib/adminAuth"
import { readJson } from "@/lib/requestGuard"
import { MAX_BYTES, TYPES, safeName, startUpload } from "@/lib/cmsMedia"

// Step 1 of an upload: check the file's type and size, then say where to send it
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const parsed = await readJson(request, 4 * 1024)
  if (!parsed.ok) return parsed.response
  const body = parsed.data as { name?: unknown; type?: unknown; size?: unknown }
  const kind = typeof body.type === "string" ? TYPES[body.type] : undefined
  if (typeof body.name !== "string" || !kind) return Response.json({ error: "type_not_allowed" }, { status: 422 })
  if (typeof body.size !== "number" || body.size <= 0 || body.size > MAX_BYTES[kind]) {
    return Response.json({ error: "too_large", maxMb: MAX_BYTES[kind] / 1024 / 1024 }, { status: 422 })
  }
  try {
    return Response.json(await startUpload(safeName(body.name)))
  } catch (error) {
    console.error("CMS upload failed:", error)
    return Response.json({ error: "upload_unavailable" }, { status: 503 })
  }
}
