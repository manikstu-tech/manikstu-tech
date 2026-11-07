import { isAdmin } from "@/lib/adminAuth"
import { listMedia } from "@/lib/cmsMedia"

export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  return Response.json({ files: await listMedia() })
}
