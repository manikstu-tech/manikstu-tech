import fs from "node:fs/promises"
import path from "node:path"
import { isAdmin } from "@/lib/adminAuth"
import { DEV_STORE } from "@/lib/cms"
import { MAX_BYTES, UPLOAD_DIR } from "@/lib/cmsMedia"

// Step 2 of an upload while developing without Supabase: the file is saved in public/uploads. Never available in production.
export async function PUT(request: Request) {
  if (!DEV_STORE || !(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const name = path.basename(new URL(request.url).searchParams.get("path") ?? "")
  if (!/^\d+-[a-z0-9-]+\.[a-z0-9]+$/.test(name)) return Response.json({ error: "bad_request" }, { status: 400 })
  const bytes = Buffer.from(await request.arrayBuffer())
  if (!bytes.length || bytes.length > MAX_BYTES.video) return Response.json({ error: "too_large" }, { status: 422 })
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes)
  return Response.json({ ok: true })
}
