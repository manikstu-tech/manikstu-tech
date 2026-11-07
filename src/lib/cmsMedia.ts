import fs from "node:fs/promises"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"
import { BUCKET, DEV_STORE, REMOTE } from "@/lib/cms"

// Pictures and videos uploaded from /admin. Production: a public Supabase Storage bucket (cms-media). Development without
// Supabase: public/uploads. SVG is not accepted, because an SVG file can carry scripts.
export const TYPES: Record<string, "image" | "video"> = {
  "image/png": "image",
  "image/jpeg": "image",
  "image/webp": "image",
  "image/avif": "image",
  "image/gif": "image",
  "video/mp4": "video",
  "video/webm": "video",
}
export const MAX_BYTES = { image: 10 * 1024 * 1024, video: 50 * 1024 * 1024 } // 50 MB is also Supabase's per-file limit on the free plan
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

const server = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const publicUrl = (file: string) => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file}`

export const safeName = (name: string) => {
  const dot = name.lastIndexOf(".")
  const base = (dot > 0 ? name.slice(0, dot) : name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "file"
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) : ""
  return `${Date.now()}-${base}${ext ? `.${ext}` : ""}`
}

export async function listMedia() {
  const kindOf = (name: string) => (/\.(mp4|webm)$/i.test(name) ? "video" : "image")
  if (REMOTE) {
    const { data } = await server().storage.from(BUCKET).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } })
    return (data ?? []).filter((f) => f.name && !f.name.startsWith(".")).map((f) => ({ name: f.name, url: publicUrl(f.name), kind: kindOf(f.name) }))
  }
  if (!DEV_STORE) return []
  try {
    const names = (await fs.readdir(UPLOAD_DIR)).sort().reverse()
    return names.map((name) => ({ name, url: `/uploads/${name}`, kind: kindOf(name) }))
  } catch {
    return []
  }
}

// Production uploads go straight from the browser to Storage with a one-time signed address, so a large video never has to pass
// through this server (hosts such as Vercel cap a request body at a few MB)
export async function startUpload(file: string) {
  if (REMOTE) {
    const { data, error } = await server().storage.from(BUCKET).createSignedUploadUrl(file)
    if (error || !data) throw new Error(error?.message ?? "no_signed_url")
    return { mode: "signed" as const, bucket: BUCKET, path: file, token: data.token, url: publicUrl(file) }
  }
  if (!DEV_STORE) throw new Error("storage_not_configured")
  return { mode: "dev" as const, bucket: "", path: file, url: `/uploads/${file}` }
}
