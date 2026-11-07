// Shared by the server and the admin screen: turns a page's default content into a flat list of editable fields, and applies saved
// edits back onto it. Content is plain data (objects, arrays, strings, numbers, booleans); anything else is left alone.
export type FieldKind = "text" | "long" | "image" | "video" | "number" | "bool"
export type Field = { path: string; kind: FieldKind; def: string | number | boolean }
export type Overrides = Record<string, string | number | boolean>

// Structural keys that code relies on (links between records, icon names, sorting). Editing them would break the page.
const LOCKED = new Set(["id", "slug", "icon", "type", "sort", "key", "wide", "position", "ids", "dropdownOnly"])
const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i
const VIDEO = /\.(mp4|webm|mov)(\?.*)?$/i
// Keys whose value is a web address, so a saved edit must not be able to smuggle in "javascript:" or "data:"
export const LINK_KEYS = /^(href|src|url|link|poster|image|photo|logo|video)$/i
export const SAFE_LINK = /^(\/(?!\/)|https:\/\/|mailto:|tel:|#)/

// A React element (the hero titles are JSX) is a plain object too, but must be passed through untouched, never copied or edited
const isPlain = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype && !("$$typeof" in v)

export function kindOf(value: unknown): FieldKind | null {
  if (typeof value === "boolean") return "bool"
  if (typeof value === "number") return "number"
  if (typeof value !== "string") return null
  // A bare file name ("ramesh.jpg") is joined to a folder in code; swapping it for a full address would break the page, so it is not editable
  const isUrl = /^(\/|https?:)/.test(value)
  if ((IMAGE.test(value) || VIDEO.test(value)) && !isUrl) return null
  if (IMAGE.test(value)) return "image"
  if (VIDEO.test(value)) return "video"
  return value.length > 90 || value.includes("\n") ? "long" : "text"
}

export function fieldsOf(node: unknown, path = ""): Field[] {
  if (Array.isArray(node)) return node.flatMap((item, i) => fieldsOf(item, path ? `${path}.${i}` : String(i)))
  if (isPlain(node)) return Object.entries(node).flatMap(([k, v]) => (LOCKED.has(k) ? [] : fieldsOf(v, path ? `${path}.${k}` : k)))
  const kind = kindOf(node)
  return kind ? [{ path, kind, def: node as Field["def"] }] : []
}

const clone = <T,>(v: T): T =>
  Array.isArray(v) ? (v.map(clone) as T) : isPlain(v) ? (Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clone(x)])) as T) : v

// Saved edits win over the defaults in the code. An edit for a field that no longer exists, or whose type changed, is ignored.
export function applyOverrides<T>(defaults: T, overrides?: Overrides): T {
  const out = clone(defaults)
  for (const [path, value] of Object.entries(overrides ?? {})) {
    const parts = path.split(".")
    let node: unknown = out
    for (const part of parts.slice(0, -1)) node = (node as Record<string, unknown> | undefined)?.[part]
    const last = parts[parts.length - 1]
    const holder = node as Record<string, unknown> | undefined
    if (holder && typeof holder === "object" && typeof holder[last] === typeof value && !LOCKED.has(last)) holder[last] = value
  }
  return out
}

// Used by the save route: every edit must name a real field, keep its type, and links must be safe
export function validOverrides(defaults: unknown, input: unknown): Overrides | null {
  if (!isPlain(input)) return null
  const known = new Map(fieldsOf(defaults).map((f) => [f.path, f]))
  const clean: Overrides = {}
  for (const [path, value] of Object.entries(input)) {
    const field = known.get(path)
    if (!field || typeof value !== typeof field.def) return null
    if (typeof value === "string") {
      if (value.length > 20000) return null
      const key = path.split(".").pop() ?? ""
      if ((LINK_KEYS.test(key) || field.kind === "image" || field.kind === "video") && value && !SAFE_LINK.test(value)) return null
    }
    if (value !== field.def) clean[path] = value as Overrides[string]
  }
  return clean
}
