import fs from "node:fs/promises"
import path from "node:path"
import { applyOverrides, type Overrides } from "@/lib/cmsFields"
import { buildCss, freeEdits, type StyleEntries } from "@/lib/cmsStyles"

// Page content = the defaults written in the code + the edits saved from /admin. Edits are stored one document per page:
//   Supabase (production): table cms_content (key text primary key, data jsonb), see docs/cms-supabase.sql
//   a local file (.data/cms.json): only while developing without Supabase, so the admin works with no setup
// Only the edits are stored, never a copy of the page, so changing a default in the code still reaches every field nobody edited.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
export const REMOTE = !!(SUPABASE_URL && SERVICE_KEY)
export const DEV_STORE = !REMOTE && process.env.NODE_ENV !== "production"
export const BUCKET = "cms-media"
const FILE = path.join(process.cwd(), ".data", "cms.json")
const headers = { apikey: SERVICE_KEY ?? "", Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" }

type All = Record<string, Overrides>
let fileLock: Promise<void> = Promise.resolve()

async function readAll(): Promise<All> {
  if (REMOTE) {
    try {
      // Tagged so the save route can refresh every page at once; otherwise re-read at most every 5 minutes
      const res = await fetch(`${SUPABASE_URL}/rest/v1/cms_content?select=key,data`, {
        headers,
        next: { tags: ["cms"], revalidate: 300 },
      })
      if (!res.ok) throw new Error(String(res.status))
      const rows = (await res.json()) as { key: string; data: Overrides }[]
      return Object.fromEntries(rows.map((r) => [r.key, r.data]))
    } catch (error) {
      console.error("CMS read failed, showing the defaults:", error)
      return {}
    }
  }
  if (DEV_STORE) {
    try {
      return JSON.parse(await fs.readFile(FILE, "utf8")) as All
    } catch {
      return {}
    }
  }
  return {}
}

export async function getContent<T>(key: string, defaults: T): Promise<T> {
  return applyOverrides(defaults, (await readAll())[key])
}

export const getOverrides = async (key: string) => (await readAll())[key] ?? {}

export async function saveOverrides(key: string, data: Overrides) {
  if (REMOTE) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/cms_content?on_conflict=key`, {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ key, data, updated_at: new Date().toISOString() }),
    })
    if (!res.ok) throw new Error(`save failed ${res.status}`)
    return
  }
  if (!DEV_STORE) throw new Error("storage_not_configured")
  // The whole file is read and rewritten, so two saves at once (words and styles) must take turns or one would erase the other
  const turn = fileLock.then(async () => {
    const all = await readAll()
    all[key] = data
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(all, null, 2))
  })
  fileLock = turn.catch(() => undefined)
  await turn
}

// ---- Style edits from the visual editor (colour, size, hide...), kept in one document called "styles" ----
// Entries are keyed "route|selector|property"; see src/lib/cmsStyles.ts for what is allowed.
export const getStylesCss = async () => buildCss((await readAll()).styles ?? {})

// One page's edits, keyed "selector|property"
export async function getRouteStyles(route: string) {
  const prefix = `${route}|`
  return Object.fromEntries(
    Object.entries((await readAll()).styles ?? {})
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [key.slice(prefix.length), value]),
  )
}

// Replaces everything saved for this route with `next`
export async function saveStyles(route: string, next: StyleEntries) {
  const kept = Object.entries((await readAll()).styles ?? {}).filter(([key]) => !key.startsWith(`${route}|`))
  await saveOverrides("styles", { ...Object.fromEntries(kept), ...next })
}

// Word and picture edits for every page, applied in the browser after the page loads (see FreeEdits)
export const getFreeEdits = async () => freeEdits((await readAll()).styles ?? {})
