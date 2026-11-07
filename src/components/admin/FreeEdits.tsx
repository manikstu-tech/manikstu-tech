"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Applies the words and pictures changed from /admin on any element of any page: { "selector|text:0": "New words", "selector|src": "/uploads/x.png" }.
// Until it has run, the stylesheet from the layout keeps those elements hidden (only when scripts run), so the original never flashes.
//
// React must finish taking over a part of the page before its text is changed: changing server-rendered text first makes React throw
// the part away and redraw it. React marks every element it has taken over with a hidden "__reactFiber" property, so each edit waits
// until its element has that mark, and is retried every moment until then. After that it watches for a few seconds and re-applies
// anything React redraws.
const WATCH_MS = 8000
const GIVE_UP_HIDING_MS = 4000

type Edits = Record<string, Record<string, string>>

const hydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"))

// Returns how many edits are still waiting for React
function apply(mine: Record<string, string>) {
  let waiting = 0
  for (const [key, value] of Object.entries(mine)) {
    const cut = key.lastIndexOf("|")
    const prop = key.slice(cut + 1)
    let el: Element | null = null
    try {
      el = document.querySelector(key.slice(0, cut))
    } catch {
      continue
    }
    if (!el) continue
    if (!hydrated(el)) {
      waiting++
      continue
    }
    if (prop.startsWith("text:")) {
      const node = el.childNodes[Number(prop.slice(5))]
      if (node?.nodeType !== Node.TEXT_NODE) continue
      const old = node.nodeValue ?? ""
      // Keep the spaces around the words, so text beside a link or a line break still reads the same
      const next = (old.match(/^\s*/)?.[0] ?? "") + value + (old.match(/\s*$/)?.[0] ?? "")
      if (old !== next) node.nodeValue = next
    } else if (prop === "src") {
      if (el.getAttribute("src") !== value) {
        el.setAttribute("src", value)
        el.removeAttribute("srcset")
        if (el.tagName === "VIDEO") (el as HTMLVideoElement).load()
      }
    } else if (prop === "alt" && el.getAttribute("alt") !== value) el.setAttribute("alt", value)
  }
  return waiting
}

export function FreeEdits({ edits }: { edits: Edits }) {
  const pathname = usePathname()
  useEffect(() => {
    const root = document.documentElement
    const mine = edits[pathname] ?? {}
    root.removeAttribute("data-cms-ready")
    if (!Object.keys(mine).length) {
      root.dataset.cmsReady = "1"
      return
    }
    const started = Date.now()
    let timer: ReturnType<typeof setTimeout> | undefined
    const run = () => {
      const waiting = apply(mine)
      // Show the page once every edit is in (or after a few seconds, so nothing stays hidden if an element never appears)
      if (!waiting || Date.now() - started > GIVE_UP_HIDING_MS) root.dataset.cmsReady = "1"
      if (waiting && Date.now() - started < WATCH_MS) timer = setTimeout(run, 120)
    }
    run()
    const watch = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(run, 60)
    })
    watch.observe(document.body, { childList: true, characterData: true, subtree: true })
    const stop = setTimeout(() => watch.disconnect(), WATCH_MS)
    return () => {
      clearTimeout(timer)
      clearTimeout(stop)
      watch.disconnect()
    }
  }, [pathname, edits])
  return null
}
