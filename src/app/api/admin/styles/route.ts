import { revalidateTag } from "next/cache"
import { isAdmin } from "@/lib/adminAuth"
import { readJson } from "@/lib/requestGuard"
import { getRouteStyles, saveStyles } from "@/lib/cms"
import { cleanStyles } from "@/lib/cmsStyles"

const ROUTE = /^\/[a-zA-Z0-9/_-]{0,120}$/

// The style edits saved for one page ({ "selector|property": value })
export async function GET(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const route = new URL(request.url).searchParams.get("route") ?? ""
  if (!ROUTE.test(route)) return Response.json({ error: "bad_request" }, { status: 400 })
  return Response.json({ entries: await getRouteStyles(route) })
}

// Saves a page's whole set of style edits. Anything not in the body is removed, so "reset" is just sending fewer entries.
export async function PUT(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "unauthorized" }, { status: 401 })
  const parsed = await readJson(request, 256 * 1024)
  if (!parsed.ok) return parsed.response
  const body = parsed.data as { route?: unknown; entries?: unknown }
  const clean = cleanStyles(body.route, body.entries)
  if (!clean || typeof body.route !== "string") return Response.json({ error: "invalid" }, { status: 422 })
  try {
    await saveStyles(body.route, clean)
  } catch (error) {
    console.error("CMS style save failed:", error)
    const notSet = error instanceof Error && error.message === "storage_not_configured"
    return Response.json({ error: notSet ? "storage_not_configured" : "save_failed" }, { status: notSet ? 503 : 500 })
  }
  revalidateTag("cms", { expire: 0 })
  return Response.json({ ok: true })
}
