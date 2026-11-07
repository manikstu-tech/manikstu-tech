"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Field } from "@/lib/cmsFields"
import { toast } from "@/lib/toast"
import { MediaPicker } from "@/components/admin/MediaPicker"
import { VisualEditor, type Styles } from "@/components/admin/VisualEditor"

// styleOnly: a page whose text is not editable yet, so only colour, size and hide edits are offered
type Doc = { key: string; title: string; group: string; preview: string; styleOnly?: boolean; scope?: "header" | "footer" }
type Value = Field["def"]
type Node = { name: string; path: string; kids: Node[]; field?: Field }

const SAVE_ERRORS: Record<string, string> = {
  unauthorized: "Your session ended. Reload the page and sign in again.",
  invalid: "One of the values is not allowed. Links must start with /, https://, mailto: or tel:.",
  storage_not_configured: "Saving is not set up yet. Add the Supabase keys to the site's settings.",
}

const humanize = (key: string) => {
  if (/^\d+$/.test(key)) return `Item ${Number(key) + 1}`
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// The flat field list becomes a tree following the page's own structure: sections, then items, then fields
function buildTree(fields: Field[]): Node[] {
  const root: Node = { name: "", path: "", kids: [] }
  for (const f of fields) {
    let cur = root
    const parts = f.path.split(".")
    parts.forEach((part, i) => {
      const path = parts.slice(0, i + 1).join(".")
      let next = cur.kids.find((k) => k.name === part)
      if (!next) cur.kids.push((next = { name: part, path, kids: [] }))
      cur = next
    })
    cur.field = f
  }
  return root.kids
}

const leaves = (n: Node): Field[] => (n.field ? [n.field] : n.kids.flatMap(leaves))
const TITLE_KEYS = /(^|\.)(title|name|heading|label|quote|text)$/

export function AdminApp({ docs, storage }: { docs: Doc[]; storage: "supabase" | "local" | "none" }) {
  const router = useRouter()
  const [docKey, setDocKey] = useState(docs[0].key)
  const doc = docs.find((d) => d.key === docKey) ?? docs[0]
  const [fields, setFields] = useState<Field[]>([])
  const [saved, setSaved] = useState<Record<string, Value>>({})
  const [values, setValues] = useState<Record<string, Value>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pane, setPane] = useState<"edit" | "preview">("edit")
  const [device, setDevice] = useState<"desktop" | "phone">("desktop")
  const [previewKey, setPreviewKey] = useState(0)
  // What the picture library is open for: which kind of file, and what to do with the one chosen
  const [picking, setPicking] = useState<{ kind: "image" | "video"; apply: (url: string) => void } | null>(null)
  // "visual": click the page itself. "form": the labelled fields, for text the page cannot show a click target for.
  const [mode, setMode] = useState<"visual" | "form">("visual")
  // The page list: a search box, groups that fold, and (on small screens) a drawer
  const [navQuery, setNavQuery] = useState("")
  const [navOpen, setNavOpen] = useState(true)
  const [openGroups, setOpenGroups] = useState<string[]>([docs[0].group])
  const search = useRef<HTMLInputElement>(null)
  // Colour, size and hide edits belong to the page being shown (its address), not to a content document
  const [route, setRoute] = useState("")
  const [styles, setStyles] = useState<Styles>({})
  const [savedStyles, setSavedStyles] = useState<Styles>({})

  // Only the newest request may fill the screen: a slow answer for a page I already left must not overwrite the current one
  const latestLoad = useRef(0)
  const load = useCallback(async (key: string, styleOnly?: boolean) => {
    const mine = ++latestLoad.current
    setLoading(true)
    if (styleOnly) {
      setFields([])
      setSaved({})
      setValues({})
      setLoading(false)
      return
    }
    const res = await fetch(`/api/admin/doc?key=${encodeURIComponent(key)}`)
    if (mine !== latestLoad.current) return
    if (!res.ok) {
      toast.error("Could not open that page", { description: res.status === 401 ? SAVE_ERRORS.unauthorized : "Please try again." })
      setLoading(false)
      return
    }
    const data = (await res.json()) as { fields: Field[]; overrides: Record<string, Value> }
    if (mine !== latestLoad.current) return
    const current = Object.fromEntries(data.fields.map((f) => [f.path, data.overrides[f.path] ?? f.def]))
    setFields(data.fields)
    setSaved(current)
    setValues(current)
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(docKey, doc.styleOnly)
  }, [docKey, doc.styleOnly, load])

  // The saved colour and size edits for whichever page the preview is showing
  useEffect(() => {
    if (!route) return
    let current = true
    fetch(`/api/admin/styles?route=${encodeURIComponent(route)}`)
      .then((res) => (res.ok ? res.json() : { entries: {} }))
      .then(({ entries }: { entries: Styles }) => {
        if (!current) return
        setSavedStyles(entries)
        setStyles(entries)
      })
    return () => {
      current = false
    }
  }, [route])

  const defaults = useMemo(() => Object.fromEntries(fields.map((f) => [f.path, f.def])), [fields])
  const changed = useMemo(() => new Set(Object.keys(values).filter((p) => values[p] !== saved[p])), [values, saved])
  const styleKeys = useMemo(() => [...new Set([...Object.keys(styles), ...Object.keys(savedStyles)])].filter((k) => styles[k] !== savedStyles[k]), [styles, savedStyles])
  const changes = changed.size + styleKeys.length
  const dirty = changes > 0
  const tree = useMemo(() => buildTree(fields), [fields])

  const setStyle = useCallback((selector: string, prop: string, value: string | null) => {
    setStyles((s) => {
      const next = { ...s }
      if (value === null) delete next[`${selector}|${prop}`]
      else next[`${selector}|${prop}`] = value
      return next
    })
  }, [])
  const clearStyles = useCallback((selector: string) => {
    setStyles((s) => Object.fromEntries(Object.entries(s).filter(([k]) => !k.startsWith(`${selector}|`))))
  }, [])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const narrow = () => window.matchMedia("(max-width: 1100px)").matches

  // Start with the drawer shut on a phone or tablet, and keep the current page's group open
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (narrow()) setNavOpen(false)
  }, [])
  useEffect(() => {
    setOpenGroups((open) => (open.includes(doc.group) ? open : [...open, doc.group]))
  }, [doc.group])

  // "/" jumps to the search box; Escape closes the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable
      if (e.key === "/" && !typing) {
        e.preventDefault()
        setNavOpen(true)
        requestAnimationFrame(() => search.current?.focus())
      } else if (e.key === "Escape" && narrow()) setNavOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function openDoc(key: string) {
    if (dirty) return void toast.error("Save or discard your changes first", { id: "adm-dirty" })
    setDocKey(key)
    setPane("edit")
    if (narrow()) setNavOpen(false)
  }

  async function save() {
    setSaving(true)
    // Only values that differ from the code's own text are stored, so resetting a field removes the edit
    const data = Object.fromEntries(fields.filter((f) => values[f.path] !== defaults[f.path]).map((f) => [f.path, values[f.path]]))
    const put = (url: string, body: unknown) =>
      fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    try {
      const results = await Promise.all([
        changed.size ? put("/api/admin/content", { key: doc.key, data }) : null,
        styleKeys.length ? put("/api/admin/styles", { route, entries: styles }) : null,
      ])
      const failed = results.find((res) => res && !res.ok)
      if (failed) {
        const body = await failed.json().catch(() => ({}))
        toast.error("Could not save", { description: SAVE_ERRORS[body.error] ?? "Nothing was changed. Please try again." })
      } else {
        setSaved(values)
        setSavedStyles(styles)
        setPreviewKey((k) => k + 1)
        toast.success("Saved", { description: "The page now shows your changes." })
      }
    } catch {
      toast.error("Could not save", { description: "Check your connection and try again." })
    }
    setSaving(false)
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.refresh()
  }

  const groups = [...new Set(docs.map((d) => d.group))]
  const set = (path: string, value: Value) => setValues((v) => ({ ...v, [path]: value }))

  // Plain functions, not components: a component defined inside another is rebuilt on every keystroke and the input loses focus
  function row(f: Field) {
    const id = `f-${f.path}`
    const value = values[f.path]
    const label = humanize(f.path.split(".").pop() ?? "")
    const edited = value !== defaults[f.path]
    return (
      <div key={f.path} className={`admField${changed.has(f.path) ? " changed" : ""}`}>
        <div className="admFieldHead">
          <label htmlFor={id}>{label}</label>
          {edited && (
            <button type="button" className="admLink" onClick={() => set(f.path, f.def)}>
              Reset to original
            </button>
          )}
        </div>
        {f.kind === "text" && <input id={id} value={String(value)} onChange={(e) => set(f.path, e.target.value)} />}
        {f.kind === "long" && (
          <textarea id={id} rows={Math.min(10, Math.max(3, Math.ceil(String(value).length / 56)))} value={String(value)} onChange={(e) => set(f.path, e.target.value)} />
        )}
        {f.kind === "number" && <input id={id} type="number" value={Number(value)} onChange={(e) => set(f.path, Number(e.target.value))} />}
        {f.kind === "bool" && (
          <label className="admCheck">
            <input id={id} type="checkbox" checked={!!value} onChange={(e) => set(f.path, e.target.checked)} /> On
          </label>
        )}
        {(f.kind === "image" || f.kind === "video") && (
          <div className="admMedia">
            <div className="admThumb">
              {f.kind === "image" ? <img src={String(value)} alt="" /> : <video src={String(value)} preload="metadata" muted />}
            </div>
            <div className="admMediaBody">
              <input id={id} value={String(value)} onChange={(e) => set(f.path, e.target.value)} aria-label={`${label} address`} />
              <button type="button" className="admBtn" onClick={() => setPicking({ kind: f.kind === "video" ? "video" : "image", apply: (url) => set(f.path, url) })}>
                Choose or upload {f.kind}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  function branch(node: Node, depth: number) {
    if (node.field) return row(node.field)
    const all = leaves(node)
    const isItem = /^\d+$/.test(node.name)
    const hint = isItem ? all.find((f) => TITLE_KEYS.test(f.path) && f.kind !== "image" && f.kind !== "video") ?? all.find((f) => f.kind === "text") : undefined
    const text = hint ? String(values[hint.path]).slice(0, 48) : ""
    const edits = all.some((f) => changed.has(f.path))
    return (
      <details key={node.path} className={depth === 0 ? "admBlock" : "admItem"} open={depth === 0 && node === tree[0]}>
        <summary>
          <span>
            {humanize(node.name)}
            {text && <em>{text}</em>}
          </span>
          <small>
            {edits && <i className="admDot" title="Unsaved changes" />}
            {all.length} {all.length === 1 ? "field" : "fields"}
          </small>
        </summary>
        <div className="admBody">
          {node.kids.map((kid) => branch(kid, depth + 1))}
        </div>
      </details>
    )
  }

  const saveBar = (
    <div className="admSave">
      <span aria-live="polite">{dirty ? `${changes} unsaved ${changes === 1 ? "change" : "changes"}` : "All changes saved"}</span>
      <button
        type="button"
        className="admBtn"
        disabled={!dirty || saving}
        onClick={() => {
          setValues(saved)
          setStyles(savedStyles)
          setPreviewKey((k) => k + 1) // reload the page so edits shown only in the preview disappear
        }}
      >
        Discard
      </button>
      <button type="button" className="admBtn primary" disabled={!dirty || saving} onClick={save}>
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  )

  return (
    <div className="admApp">
      <header className="admBar">
        <strong>Manikstu admin</strong>
        <button
          type="button"
          className="admBtn admNavToggle"
          aria-expanded={navOpen}
          aria-controls="adm-nav"
          onClick={() => {
            setNavOpen(!navOpen)
            if (!navOpen) requestAnimationFrame(() => search.current?.focus())
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          Pages
        </button>
        <span className="admCurrent">{doc.title}</span>
        <span className="admSpacer" />
        <div className="admMode" role="group" aria-label="How to edit">
          {(["visual", "form"] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === "visual" ? "Click on page" : "Form"}
            </button>
          ))}
        </div>
        <a className="admBtn" href={doc.preview} target="_blank" rel="noopener noreferrer">
          View page
        </a>
        <button type="button" className="admBtn" onClick={logout}>
          Sign out
        </button>
      </header>

      {storage === "none" && (
        <p className="admNotice" role="status">
          Saving is not set up on this site yet, so edits cannot be stored. Add the Supabase keys described in the README.
        </p>
      )}
      {storage === "local" && (
        <p className="admNotice" role="status">
          Development mode: edits are saved on this computer only (.data/cms.json). On the live site they go to Supabase.
        </p>
      )}

      <div className="admTabs" role="tablist" aria-label="View" hidden={mode === "visual"}>
        {(["edit", "preview"] as const).map((p) => (
          <button key={p} role="tab" type="button" aria-selected={pane === p} onClick={() => setPane(p)}>
            {p === "edit" ? "Edit" : "Preview"}
          </button>
        ))}
      </div>

      <div className="admCols" data-pane={pane} data-mode={mode} data-nav={navOpen ? "open" : "closed"}>
        <nav className="admNav" id="adm-nav" aria-label="Pages" hidden={!navOpen}>
          <div className="admSearch">
            <input
              ref={search}
              type="search"
              aria-label="Find a page"
              placeholder="Find a page   ( / )"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setNavQuery("")
              }}
            />
          </div>
          <div className="admGroups">
            {groups.map((g) => {
              const q = navQuery.trim().toLowerCase()
              const list = docs.filter((d) => d.group === g && (!q || d.title.toLowerCase().includes(q) || g.toLowerCase().includes(q)))
              if (!list.length) return null
              // While searching, every group with a match is open
              const open = !!q || openGroups.includes(g)
              return (
                <section key={g}>
                  <button
                    type="button"
                    className="admGroup"
                    aria-expanded={open}
                    onClick={() => setOpenGroups((o) => (o.includes(g) ? o.filter((x) => x !== g) : [...o, g]))}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                    <span>{g}</span>
                    <small>{list.length}</small>
                  </button>
                  {open && (
                    <ul>
                      {list.map((d) => (
                        <li key={d.key}>
                          <button type="button" title={d.title} aria-current={d.key === docKey ? "page" : undefined} onClick={() => openDoc(d.key)}>
                            <span>{d.title}</span>
                            {d.key === docKey && dirty && <i className="admDot" role="img" aria-label="Unsaved changes" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
            {navQuery.trim() && !docs.some((d) => d.title.toLowerCase().includes(navQuery.trim().toLowerCase()) || d.group.toLowerCase().includes(navQuery.trim().toLowerCase())) && (
              <p className="admHint">No page matches &quot;{navQuery.trim()}&quot;.</p>
            )}
          </div>
        </nav>
        {navOpen && <button type="button" className="admScrim" aria-label="Close the page list" onClick={() => setNavOpen(false)} />}

        {mode === "visual" && (
          <section className="admStage" aria-label={`Editing ${doc.title}`}>
            <div className="admDevices">
              {(["desktop", "phone"] as const).map((d) => (
                <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)}>
                  {d === "desktop" ? "Desktop" : "Phone"}
                </button>
              ))}
              <span className="admSpacer" />
            </div>
            <VisualEditor
              src={doc.preview}
              scope={doc.scope}
              device={device}
              frameKey={`${doc.key}-${previewKey}`}
              fields={fields}
              values={values}
              set={set}
              styles={styles}
              setStyle={setStyle}
              clearStyles={clearStyles}
              onRoute={setRoute}
              onPickMedia={(kind, apply) => setPicking({ kind, apply })}
            />
            {saveBar}
          </section>
        )}

        {mode === "form" && (
        <section className="admEdit" aria-label={`Editing ${doc.title}`}>
          <h1>{doc.title}</h1>
          {loading ? (
            <p className="admHint">Loading…</p>
          ) : fields.length === 0 ? (
            <p className="admHint">This page has no editable text yet.</p>
          ) : (
            tree.map((node) => branch(node, 0))
          )}
          {saveBar}
        </section>
        )}

        {mode === "form" && (
        <section className="admPreview" aria-label="Live preview">
          <div className="admDevices">
            {(["desktop", "phone"] as const).map((d) => (
              <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)}>
                {d === "desktop" ? "Desktop" : "Phone"}
              </button>
            ))}
          </div>
          <iframe key={`${doc.key}-${previewKey}`} className={device} src={doc.preview} title={`Live preview of ${doc.title}`} />
        </section>
        )}
      </div>

      {picking && (
        <MediaPicker
          kind={picking.kind}
          onClose={() => setPicking(null)}
          onPick={(url) => {
            picking.apply(url)
            setPicking(null)
          }}
        />
      )}
    </div>
  )
}
