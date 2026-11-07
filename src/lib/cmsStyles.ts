// Edits made by clicking on the live page in /admin, stored as plain entries keyed "route|selector|property".
//   look:   colour, background colour and picture, size, weight, alignment, hide   -> turned into CSS rules by buildCss
//   words:  "text:N" (the Nth text node inside the element), "src" and "alt"        -> applied in the browser by FreeEdits
// Nothing the editor sends is ever used as raw CSS or markup: the route, the selector and every value are checked here first.
export const BRAND_VARS = ["forest", "ivory", "gold", "leaf", "charcoal", "sage"]
const COLOR = new RegExp(`^(#[0-9a-fA-F]{6}|var\\(--(${BRAND_VARS.join("|")})\\))$`)
// A picture or video address on this site or over https. No quotes, brackets, spaces or backslashes, so it cannot leave its context.
const ADDRESS = /^(\/(?!\/)|https:\/\/)[^\s()"'\\<>;{}]{1,500}$/

// property -> the check its value must pass
export const STYLE_PROPS: Record<string, (v: string) => boolean> = {
  color: (v) => COLOR.test(v),
  "background-color": (v) => COLOR.test(v),
  "background-image": (v) => ADDRESS.test(v),
  "font-size": (v) => /^\d{1,3}$/.test(v) && Number(v) >= 8 && Number(v) <= 200, // pixels on a large screen; shrinks on small ones
  "font-weight": (v) => ["400", "600", "700"].includes(v),
  "text-align": (v) => ["left", "center", "right"].includes(v),
  display: (v) => v === "none",
}

const noControlChars = (v: string) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v)
// Words are set as text, never as markup, so any characters are safe; they only need a sensible length
export const FREE_PROPS: Record<string, (v: string) => boolean> = {
  text: (v) => v.length <= 5000 && noControlChars(v),
  src: (v) => ADDRESS.test(v),
  alt: (v) => v.length <= 300 && noControlChars(v),
}
// "text:2" -> "text"; the number says which text node inside the element
const baseProp = (prop: string) => (/^text:\d{1,3}$/.test(prop) ? "text" : prop)
export const isFreeProp = (prop: string) => baseProp(prop) in FREE_PROPS

export const validValue = (prop: string, value: string) =>
  (STYLE_PROPS[prop] ?? FREE_PROPS[baseProp(prop)] ?? (() => false))(value)

const ROUTE = /^\/[a-zA-Z0-9/_-]{0,120}$/
// A chain of simple selectors joined by ">" or a space: tags, #id, .class, :nth-of-type(n) and :nth-child(n). No quotes, braces or commas.
const SELECTOR = /^[a-zA-Z0-9#._:()\->[\] ]{1,400}$/
const BAD = /[{};@\\<"'`,]|\/\*|url|expression|import/i

export const validSelector = (s: string) => SELECTOR.test(s) && !BAD.test(s)

export type StyleEntries = Record<string, string>

// Checks one page's edits (keys "selector|property") and returns them ready to store under "route|selector|property", or null if any is unsafe
export function cleanStyles(route: unknown, entries: unknown): StyleEntries | null {
  if (typeof route !== "string" || !ROUTE.test(route) || !entries || typeof entries !== "object" || Array.isArray(entries)) return null
  const out: StyleEntries = {}
  for (const [key, value] of Object.entries(entries)) {
    const cut = key.lastIndexOf("|")
    const selector = key.slice(0, cut)
    const prop = key.slice(cut + 1)
    if (cut < 1 || !validSelector(selector) || typeof value !== "string" || !validValue(prop, value)) return null
    out[`${route}|${key}`] = value
  }
  return out
}

// Exact size on a 1440px screen, shrinking with the screen down to 60% of it, so a big heading never overflows a phone
export const sizeCss = (px: number) => `clamp(${(px * 0.6).toFixed(1)}px,${((px / 1440) * 100).toFixed(2)}vw,${px}px)`

const rule = (prop: string, value: string) => {
  if (prop === "font-size") return `font-size:${sizeCss(Number(value))}`
  if (prop === "background-image") return `background-image:url("${value}");background-size:cover;background-position:center`
  return `${prop}:${value}`
}

// All saved look edits as one stylesheet. Each rule starts with html[data-path="/route"], set by a tiny script before the page paints.
// Elements whose words or picture are replaced in the browser are hidden until that is done (only when scripts run), so visitors never see
// the original flash by.
export function buildCss(all: Record<string, string | number | boolean>): string {
  const rules = new Map<string, string[]>()
  const add = (head: string, decl: string) => rules.set(head, [...(rules.get(head) ?? []), decl])
  for (const [key, value] of Object.entries(all)) {
    const [route, selector, prop] = key.split("|")
    if (!route || !selector || !prop || typeof value !== "string" || !ROUTE.test(route) || !validSelector(selector) || !validValue(prop, value)) continue
    if (isFreeProp(prop)) add(`html.cms-js[data-path="${route}"]:not([data-cms-ready]) ${selector}`, "visibility:hidden!important")
    else for (const decl of rule(prop, value).split(";")) add(`html[data-path="${route}"] ${selector}`, `${decl}!important`)
  }
  return [...rules].map(([head, decls]) => `${head}{${[...new Set(decls)].join(";")}}`).join("\n")
}

// The word and picture edits, grouped by page, for the browser to apply: { "/route": { "selector|text:0": "New words", ... } }
export function freeEdits(all: Record<string, string | number | boolean>): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {}
  for (const [key, value] of Object.entries(all)) {
    const [route, selector, prop] = key.split("|")
    if (!route || !selector || !prop || typeof value !== "string" || !ROUTE.test(route) || !validSelector(selector) || !isFreeProp(prop) || !validValue(prop, value)) continue
    ;(out[route] ??= {})[`${selector}|${prop}`] = value
  }
  return out
}
