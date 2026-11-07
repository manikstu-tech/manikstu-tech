import { cmsDoc } from "@/constants/cms"
import { isAdmin } from "@/lib/adminAuth"
import { getOverrides } from "@/lib/cms"
import { fieldsOf } from "@/lib/cmsFields"

// One page's editable fields (with the defaults from the code) and the edits saved so far
export async function GET(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const doc = cmsDoc(new URL(request.url).searchParams.get("key") ?? "")
  if (!doc) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ fields: fieldsOf(doc.defaults), overrides: await getOverrides(doc.key) })
}
