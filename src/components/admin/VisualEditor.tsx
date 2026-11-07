"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Field } from "@/lib/cmsFields"
import { BRAND_VARS, sizeCss, validSelector } from "@/lib/cmsStyles"

type Value = Field["def"]
export type Styles = Record<string, string> // "selector|property" -> value, for the page being edited

type Mark = { path: string; field: Field; last: string } // an element that shows one of the page's data fields
type Picked = { el: HTMLElement; selector: string; node?: Text } // node: the exact piece of text chosen, when it is not a data field
type Item = { kind: "text" | "image" | "video"; el: HTMLElement; node?: Text } // one row of the "everything on the page" list

const norm = (s: string) => s.replace(/\s+/g, " ").trim()
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "IFRAME", "TEMPLATE", "HEAD"])
const SIMPLE = /^[A-Za-z][\w-]*$/
const isMediaEl = (el: Element) => el.tagName === "IMG" || el.tagName === "VIDEO"

// The address a picture really has: next/image serves /_next/image?url=<original>, so read the original back out
function srcOf(el: Element) {
  const raw = el.getAttribute("src") ?? el.querySelector("source")?.getAttribute("src") ?? ""
  if (raw.startsWith("/_next/image")) return new URL(raw, "http://x").searchParams.get("url") ?? raw
  return raw
}

// A CSS selector for one element, built from where it sits on the page. It uses a class when that is unique among its siblings (which
// survives layout changes better) and its position otherwise. Written to be accepted by validSelector on the server.
function selectorFor(el: Element, useClasses = true): string {
  const parts: string[] = []
  for (let cur: Element | null = el; cur && cur.tagName !== "HTML"; cur = cur.parentElement) {
    if (cur.id && SIMPLE.test(cur.id)) {
      parts.unshift(`#${cur.id}`)
      break
    }
    const tag = cur.tagName.toLowerCase()
    if (tag === "body") {
      parts.unshift("body")
      break
    }
    let part = tag
    const siblings = [...(cur.parentElement?.children ?? [])]
    const cls = useClasses ? [...cur.classList].find((c) => SIMPLE.test(c) && !c.startsWith("adm-")) : undefined
    if (cls && siblings.filter((s) => s.matches(`${tag}.${cls}`)).length === 1) part = `${tag}.${cls}`
    else {
      const same = siblings.filter((s) => s.tagName === cur!.tagName)
      if (same.length > 1) part += `:nth-of-type(${same.indexOf(cur) + 1})`
    }
    parts.unshift(part)
  }
  const selector = parts.join(" > ")
  return !useClasses || validSelector(selector) ? selector : selectorFor(el, false)
}

const toHex = (rgb: string) => {
  const m = rgb.match(/\d+/g)
  return m ? "#" + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("") : "#000000"
}

// Which text node of its element this is. A paragraph with a link inside has several, and each is edited on its own.
const textIndex = (node: Node) => [...(node.parentNode?.childNodes ?? [])].indexOf(node as ChildNode)
// New words keep the spaces that were around the old ones, so text beside a link or a line break still reads the same
const withSpaces = (old: string, value: string) => (old.match(/^\s*/)?.[0] ?? "") + value + (old.match(/\s*$/)?.[0] ?? "")

type PointDoc = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null
  caretRangeFromPoint?: (x: number, y: number) => Range | null
}
// The piece of text under the pointer, if the pointer really is on it (a few pixels of slack make small text easier to hit)
function textAt(doc: Document, x: number, y: number): Text | null {
  const d = doc as PointDoc
  const node = d.caretPositionFromPoint?.(x, y)?.offsetNode ?? d.caretRangeFromPoint?.(x, y)?.startContainer
  if (!node || node.nodeType !== Node.TEXT_NODE || !norm(node.nodeValue ?? "") || SKIP.has((node.parentElement?.tagName ?? "").toUpperCase())) return null
  const range = doc.createRange()
  range.selectNodeContents(node)
  const near = [...range.getClientRects()].some((r) => x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 8 && y <= r.bottom + 8)
  return near ? (node as Text) : null
}

const DESKTOP_WIDTH = 1280

const EDIT_CSS = `
.adm-hover{outline:2px dashed var(--gold)!important;outline-offset:2px;cursor:pointer!important}
.adm-sel{outline:3px solid var(--forest)!important;outline-offset:2px;box-shadow:0 0 0 5px var(--gold)!important}
.adm-typing{outline:3px solid var(--gold)!important;cursor:text!important}
.adm-show [data-adm-text],.adm-show [data-adm-media]{outline:1px dashed var(--gold);outline-offset:1px}
.adm-show [data-adm-media]{outline-color:var(--leaf);outline-width:2px}
`

export function VisualEditor(props: {
  src: string
  scope?: "header" | "footer"
  device: "desktop" | "phone"
  frameKey: string
  fields: Field[]
  values: Record<string, Value>
  set: (path: string, value: Value) => void
  styles: Styles
  setStyle: (selector: string, prop: string, value: string | null) => void
  clearStyles: (selector: string) => void
  onRoute: (route: string) => void
  onPickMedia: (kind: "image" | "video", apply: (url: string) => void) => void
}) {
  const { src, scope, device, frameKey, fields, values, set, styles, setStyle, clearStyles, onRoute, onPickMedia } = props
  const frame = useRef<HTMLIFrameElement>(null)
  const marks = useRef(new Map<Element, Mark>())
  const scroll = useRef(0)
  const [picked, setPicked] = useState<Picked | null>(null)
  const [loaded, setLoaded] = useState(0)
  const [outline, setOutline] = useState<Item[]>([])
  const [tab, setTab] = useState<"element" | "all">("element")
  const [showAll, setShowAll] = useState(false)
  const [query, setQuery] = useState("")
  // The page is shown at a real 1280px desktop width and scaled down to fit, so the site's desktop layout appears, not the tablet one
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => setScale(device === "phone" ? 1 : Math.min(1, el.clientWidth / DESKTOP_WIDTH))
    measure()
    const watch = new ResizeObserver(measure)
    watch.observe(el)
    return () => watch.disconnect()
  }, [device])
  // Always the latest props, for the listeners attached once per page load
  const latest = useRef({ fields, values, set, setStyle })
  useEffect(() => void (latest.current = { fields, values, set, setStyle }))

  // Find which element on the page shows which data field (by text for words, by address for pictures and videos), and list everything
  // on the page that can be edited: every piece of text and every picture or video, in page order
  const scan = useCallback((doc: Document) => {
    marks.current.clear()
    doc.querySelectorAll("[data-adm-text],[data-adm-media]").forEach((n) => (n.removeAttribute("data-adm-text"), n.removeAttribute("data-adm-media")))
    const taken = new Set<Element>()
    const { fields: fs, values: vs } = latest.current
    // A page's own text is matched outside the shared header and footer, so "Contact us" in the menu is never taken for a page field
    const inScope = (el: Element) => (scope === "header" ? !!el.closest("header.header") : scope === "footer" ? !!el.closest("footer") : !el.closest("header.header, footer"))
    const all = [...doc.body.querySelectorAll("*")].filter((el) => !SKIP.has(el.tagName.toUpperCase()) && inScope(el))
    const leaves = all.filter((el) => (el.children.length === 0 || [...el.children].every((c) => c.tagName === "BR")) && norm(el.textContent ?? ""))
    const media = all.filter(isMediaEl)
    for (const f of fs) {
      const value = String(vs[f.path])
      const pool = f.kind === "image" || f.kind === "video" ? media : f.kind === "text" || f.kind === "long" ? leaves : []
      // The same words can appear twice (two "Learn more"): fields and elements are matched in page order, so the 1st goes with the 1st
      const el = pool.find((e) => !taken.has(e) && (pool === media ? srcOf(e) === value : norm(e.textContent ?? "") === norm(value)))
      if (el) {
        taken.add(el)
        marks.current.set(el, { path: f.path, field: f, last: value })
      }
    }
    const items: Item[] = []
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT)
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const parent = (n.nodeType === Node.TEXT_NODE ? n.parentElement : (n as HTMLElement)) as HTMLElement | null
      if (!parent || SKIP.has(parent.tagName.toUpperCase()) || parent.closest("[contenteditable]")) continue
      if (n.nodeType === Node.TEXT_NODE) {
        if (!norm(n.nodeValue ?? "")) continue
        parent.setAttribute("data-adm-text", "")
        items.push({ kind: "text", el: parent, node: marks.current.has(parent) ? undefined : (n as Text) })
      } else if (isMediaEl(n as Element)) {
        ;(n as HTMLElement).setAttribute("data-adm-media", "")
        items.push({ kind: (n as Element).tagName === "VIDEO" ? "video" : "image", el: n as HTMLElement })
      }
    }
    // A field's text is one element; keep one row for it, not one per text node
    setOutline(items.filter((it, i) => !(it.kind === "text" && !it.node && items.findIndex((o) => o.el === it.el && !o.node && o.kind === "text") !== i)))
  }, [scope])

  // The page can finish loading before its fields arrive (just after choosing another page), so match again once both are there
  useEffect(() => {
    const doc = frame.current?.contentDocument
    if (doc?.body && doc.readyState === "complete") scan(doc)
  }, [fields, loaded, scan])

  // Keep the page in step with edits made in the side panel or the form
  useEffect(() => {
    for (const [el, mark] of marks.current) {
      const value = String(values[mark.path])
      if (value === mark.last) continue
      mark.last = value
      if (mark.field.kind === "image" || mark.field.kind === "video") {
        el.setAttribute("src", value)
        el.removeAttribute("srcset")
        if (el.tagName === "VIDEO") (el as HTMLVideoElement).load()
      } else if (el.getAttribute("contenteditable") == null) el.textContent = value
    }
  }, [values, loaded])

  useEffect(() => {
    frame.current?.contentDocument?.documentElement.classList.toggle("adm-show", showAll)
  }, [showAll, loaded])

  function select(el: HTMLElement, node?: Text, bringIntoView = false) {
    const doc = el.ownerDocument
    doc.querySelectorAll(".adm-sel").forEach((n) => n.classList.remove("adm-sel"))
    el.classList.remove("adm-hover")
    el.classList.add("adm-sel")
    if (bringIntoView) el.scrollIntoView({ block: "center", behavior: "smooth" })
    setPicked({ el, selector: selectorFor(el), node: marks.current.has(el) ? undefined : node })
    setTab("element")
  }

  function attach(doc: Document) {
    const style = doc.createElement("style")
    style.textContent = EDIT_CSS
    doc.head.appendChild(style)
    scan(doc)
    let hover: Element | null = null
    // What a click or hover means: the words under the pointer first, then a picture, then whatever box is there. Words win, so text
    // on top of a picture is chosen, while a click on the bare picture picks the picture.
    const pickAt = (event: MouseEvent): { el: HTMLElement; node?: Text } => {
      const text = textAt(doc, event.clientX, event.clientY)
      if (text?.parentElement) return { el: text.parentElement, node: text }
      const stack = doc.elementsFromPoint(event.clientX, event.clientY) as HTMLElement[]
      return { el: stack.find(isMediaEl) ?? (event.target as HTMLElement) }
    }
    doc.addEventListener("mouseover", (e) => {
      hover?.classList.remove("adm-hover")
      hover = pickAt(e).el
      if (hover && hover.tagName !== "BODY" && hover.tagName !== "HTML") hover.classList.add("adm-hover")
    })
    doc.addEventListener("mouseout", () => hover?.classList.remove("adm-hover"))
    doc.addEventListener(
      "click",
      (e) => {
        const hit = pickAt(e)
        // In the editor a link or button only selects; it never navigates or submits
        e.preventDefault()
        e.stopPropagation()
        if (hit.el.getAttribute("contenteditable") != null) return
        if (hit.el.tagName === "BODY" || hit.el.tagName === "HTML") return setPicked(null)
        select(hit.el, hit.node)
      },
      true,
    )
    // Double-click words to type straight into the page. Text mixed with other elements is typed in the panel instead.
    doc.addEventListener(
      "dblclick",
      (e) => {
        const { el, node } = pickAt(e)
        const mark = marks.current.get(el)
        if (!mark && !node) return
        if (mark && mark.field.kind !== "text" && mark.field.kind !== "long") return
        if (el.children.length) return void window.parent.document.getElementById("adm-text")?.focus()
        const index = node ? textIndex(node) : 0
        const selector = selectorFor(el)
        el.setAttribute("contenteditable", "plaintext-only")
        el.classList.add("adm-typing")
        el.focus()
        const done = () => {
          el.removeAttribute("contenteditable")
          el.classList.remove("adm-typing")
          const text = (el.textContent ?? "").trim()
          if (mark) {
            mark.last = text
            latest.current.set(mark.path, text)
          } else latest.current.setStyle(selector, `text:${index}`, text)
        }
        el.addEventListener("blur", done, { once: true })
        el.addEventListener("keydown", (k) => {
          const key = (k as KeyboardEvent).key
          if (key === "Escape" || (key === "Enter" && !(mark && mark.field.kind === "long"))) {
            k.preventDefault()
            el.blur()
          }
        })
      },
      true,
    )
    doc.addEventListener("scroll", () => (scroll.current = doc.documentElement.scrollTop || doc.body.scrollTop), { passive: true })
  }

  const onLoad = () => {
    const win = frame.current?.contentWindow
    const doc = frame.current?.contentDocument
    if (!win || !doc) return
    attach(doc)
    onRoute(win.location.pathname)
    setPicked(null)
    setLoaded((n) => n + 1)
    win.scrollTo(0, scroll.current)
  }

  // ---- side panel ----
  const mark = picked ? marks.current.get(picked.el) : undefined
  const isMedia = !!picked && isMediaEl(picked.el)
  const sel = picked?.selector ?? ""
  const style = (prop: string) => styles[`${sel}|${prop}`]
  const textNo = picked?.node ? textIndex(picked.node) : -1
  const freeText = picked?.node ? norm(picked.node.nodeValue ?? "") : ""

  const apply = (prop: string, value: string | null) => {
    if (!picked) return
    const css = prop === "font-size" && value ? sizeCss(Number(value)) : prop === "background-image" && value ? `url("${value}")` : value
    if (css) picked.el.style.setProperty(prop, css, "important")
    else picked.el.style.removeProperty(prop)
    if (prop === "background-image") {
      picked.el.style.setProperty("background-size", value ? "cover" : "", "important")
      picked.el.style.setProperty("background-position", value ? "center" : "", "important")
    }
    setStyle(sel, prop, value)
  }

  const editFreeText = (text: string) => {
    if (!picked?.node) return
    picked.node.nodeValue = withSpaces(picked.node.nodeValue ?? "", text)
    setStyle(sel, `text:${textNo}`, text)
  }
  const replaceFreeMedia = () => {
    if (!picked) return
    const el = picked.el
    const selector = sel
    onPickMedia(el.tagName === "VIDEO" ? "video" : "image", (url) => {
      el.setAttribute("src", url)
      el.removeAttribute("srcset")
      if (el.tagName === "VIDEO") (el as HTMLVideoElement).load()
      setStyle(selector, "src", url)
    })
  }

  const computed = picked ? picked.el.ownerDocument.defaultView?.getComputedStyle(picked.el) : undefined
  const sizeNow = style("font-size") ?? (computed ? String(Math.round(parseFloat(computed.fontSize))) : "")

  const colorControl = (prop: string, label: string) => {
    const current = style(prop)
    const custom = current && current.startsWith("#") ? current : computed ? toHex(prop === "color" ? computed.color : computed.backgroundColor) : "#000000"
    return (
      <div className="admStyleRow">
        <span id={`adm-${prop}`}>{label}</span>
        <div className="admSwatches" role="group" aria-labelledby={`adm-${prop}`}>
          {BRAND_VARS.map((name) => (
            <button
              key={name}
              type="button"
              className="admSwatch"
              style={{ background: `var(--${name})` }}
              aria-label={name}
              aria-pressed={current === `var(--${name})`}
              onClick={() => apply(prop, `var(--${name})`)}
            />
          ))}
          <input type="color" aria-label={`${label}, any colour`} value={custom} onChange={(e) => apply(prop, e.target.value)} />
          {current && (
            <button type="button" className="admLink" onClick={() => apply(prop, null)}>
              Default
            </button>
          )}
        </div>
      </div>
    )
  }

  const field = mark?.field
  const value = mark ? String(values[mark.path]) : ""
  const hasText = !!picked && !isMedia && norm(picked.el.textContent ?? "") !== ""

  const label = (it: Item) =>
    it.kind === "text"
      ? norm(it.node?.nodeValue ?? it.el.textContent ?? "").slice(0, 80)
      : it.el.getAttribute("alt") || srcOf(it.el).split("/").pop()?.split("?")[0] || (it.kind === "video" ? "Video" : "Picture")
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return outline.filter((it) => !q || label(it).toLowerCase().includes(q)).slice(0, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outline, query, styles])
  const here = picked ? outline.findIndex((it) => it.el === picked.el && (!it.node || it.node === picked.node)) : -1
  const step = (delta: number) => {
    const it = outline[here < 0 ? (delta > 0 ? 0 : outline.length - 1) : here + delta]
    if (it) select(it.el, it.node, true)
  }

  return (
    <div className="admVisual">
      <div className="admCanvas" ref={box}>
        <iframe
          key={frameKey}
          ref={frame}
          className={device}
          style={device === "desktop" ? { width: DESKTOP_WIDTH, height: `${100 / scale}%`, transform: `scale(${scale})` } : undefined}
          src={src}
          title="The page. Click any text or picture to edit it."
          onLoad={onLoad}
        />
      </div>
      <aside className="admInspector" aria-label="Edit the page">
        <div className="admTabs2" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "element"} onClick={() => setTab("element")}>
            This one
          </button>
          <button type="button" role="tab" aria-selected={tab === "all"} onClick={() => setTab("all")}>
            Everything on the page{outline.length ? ` (${outline.length})` : ""}
          </button>
        </div>
        <label className="admCheck">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Show everything I can edit
        </label>

        {tab === "all" ? (
          <>
            <div className="admField">
              <label htmlFor="adm-find">Find words or a picture</label>
              <input id="adm-find" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search" />
            </div>
            {shown.length === 0 ? (
              <p className="admHint">{outline.length ? "Nothing matches." : "Loading the page…"}</p>
            ) : (
              <ul className="admOutline">
                {shown.map((it, i) => (
                  <li key={i}>
                    <button type="button" aria-current={picked?.el === it.el && (!it.node || it.node === picked.node) ? "true" : undefined} onClick={() => select(it.el, it.node, true)}>
                      <b>{it.kind === "text" ? "Words" : it.kind === "video" ? "Video" : "Picture"}</b>
                      <span>{label(it)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : !picked ? (
          <p className="admHint">
            Click any words or picture on the page. Small text is fine: the click only has to be close. Double-click words to type straight
            into the page. Or open &quot;Everything on the page&quot; to pick from a list.
          </p>
        ) : (
          <>
            <div className="admInspectHead">
              <strong>
                {isMedia ? (picked.el.tagName === "VIDEO" ? "Video" : "Picture") : picked.node || mark ? "Words" : hasText ? "Text box" : "Box"}
                <em>{picked.el.tagName.toLowerCase()}</em>
              </strong>
              <div className="admInline">
                <button type="button" className="admBtn" onClick={() => step(-1)} disabled={!outline.length}>
                  Previous
                </button>
                <button type="button" className="admBtn" onClick={() => step(1)} disabled={!outline.length}>
                  Next
                </button>
              </div>
              <button
                type="button"
                className="admBtn"
                onClick={() => {
                  const parent = picked.el.parentElement
                  if (parent && parent.tagName !== "BODY") select(parent)
                }}
              >
                Select the box around it
              </button>
            </div>

            {field && (field.kind === "text" || field.kind === "long") && (
              <div className="admField">
                <label htmlFor="adm-text">Words</label>
                <textarea id="adm-text" rows={field.kind === "long" ? 6 : 3} value={value} onChange={(e) => set(field.path, e.target.value)} />
              </div>
            )}
            {field && (field.kind === "image" || field.kind === "video") && (
              <div className="admField">
                <span className="admLabel">{field.kind === "video" ? "Video" : "Picture"}</span>
                <button type="button" className="admBtn primary" onClick={() => onPickMedia(field.kind === "video" ? "video" : "image", (url) => set(field.path, url))}>
                  Replace {field.kind}
                </button>
                <input aria-label="Address" value={value} onChange={(e) => set(field.path, e.target.value)} />
              </div>
            )}
            {!field && picked.node && (
              <div className="admField">
                <label htmlFor="adm-text">Words</label>
                <textarea id="adm-text" rows={Math.min(8, Math.max(3, Math.ceil(freeText.length / 38)))} value={freeText} onChange={(e) => editFreeText(e.target.value)} />
                {style(`text:${textNo}`) !== undefined && (
                  <button
                    type="button"
                    className="admLink"
                    onClick={() => {
                      setStyle(sel, `text:${textNo}`, null)
                      window.parent.document.querySelector<HTMLButtonElement>(".admSave .admBtn:not(.primary)")?.focus()
                    }}
                  >
                    Go back to the original words (applies when you save)
                  </button>
                )}
              </div>
            )}
            {!field && isMedia && (
              <div className="admField">
                <span className="admLabel">{picked.el.tagName === "VIDEO" ? "Video" : "Picture"}</span>
                <button type="button" className="admBtn primary" onClick={replaceFreeMedia}>
                  Replace {picked.el.tagName === "VIDEO" ? "video" : "image"}
                </button>
                {picked.el.tagName === "IMG" && (
                  <>
                    <label htmlFor="adm-alt">Description for people who cannot see it</label>
                    <input
                      id="adm-alt"
                      value={picked.el.getAttribute("alt") ?? ""}
                      onChange={(e) => {
                        picked.el.setAttribute("alt", e.target.value)
                        setStyle(sel, "alt", e.target.value)
                      }}
                    />
                  </>
                )}
                {style("src") !== undefined && (
                  <button type="button" className="admLink" onClick={() => setStyle(sel, "src", null)}>
                    Go back to the original (applies when you save)
                  </button>
                )}
              </div>
            )}

            {hasText && (
              <>
                {colorControl("color", "Text colour")}
                <div className="admStyleRow">
                  <label htmlFor="adm-size">Size (px)</label>
                  <div className="admInline">
                    <input
                      id="adm-size"
                      type="number"
                      min={8}
                      max={200}
                      value={sizeNow}
                      onChange={(e) => {
                        const n = Math.round(Number(e.target.value))
                        if (n >= 8 && n <= 200) apply("font-size", String(n))
                      }}
                    />
                    {style("font-size") && (
                      <button type="button" className="admLink" onClick={() => apply("font-size", null)}>
                        Default
                      </button>
                    )}
                  </div>
                </div>
                <div className="admStyleRow">
                  <label htmlFor="adm-weight">Weight</label>
                  <select id="adm-weight" value={style("font-weight") ?? ""} onChange={(e) => apply("font-weight", e.target.value || null)}>
                    <option value="">Default</option>
                    <option value="400">Normal</option>
                    <option value="600">Semi-bold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>
                <div className="admStyleRow">
                  <span id="adm-align">Alignment</span>
                  <div className="admInline" role="group" aria-labelledby="adm-align">
                    {(["left", "center", "right"] as const).map((a) => (
                      <button key={a} type="button" className="admBtn" aria-pressed={style("text-align") === a} onClick={() => apply("text-align", style("text-align") === a ? null : a)}>
                        {a[0].toUpperCase() + a.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            {!isMedia && colorControl("background-color", "Background colour")}
            {!isMedia && (
              <div className="admStyleRow">
                <span>Background picture</span>
                <div className="admInline">
                  <button type="button" className="admBtn" onClick={() => onPickMedia("image", (url) => apply("background-image", url))}>
                    {style("background-image") ? "Change picture" : "Add a picture"}
                  </button>
                  {style("background-image") && (
                    <button type="button" className="admLink" onClick={() => apply("background-image", null)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
            <label className="admCheck">
              <input type="checkbox" checked={style("display") === "none"} onChange={(e) => apply("display", e.target.checked ? "none" : null)} /> Hide this on the live page
            </label>
            {Object.keys(styles).some((k) => k.startsWith(`${sel}|`)) && (
              <button
                type="button"
                className="admLink"
                onClick={() => {
                  picked.el.removeAttribute("style")
                  clearStyles(sel)
                }}
              >
                Reset everything on this element
              </button>
            )}
          </>
        )}
      </aside>
    </div>
  )
}
