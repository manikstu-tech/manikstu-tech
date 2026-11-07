"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Most items shown before a "Show all" button; the rest of the list loads as the visitor scrolls
const CAP = 50

export function ProgressiveGrid<T>({
  items,
  step,
  className,
  children,
}: {
  items: T[]
  // How many more items each scroll adds
  step: number
  className: string
  // Return an <li key=...> for each item
  children: (item: T) => ReactNode
}) {
  const [shown, setShown] = useState(step)
  const [all, setAll] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const limit = all ? items.length : Math.min(items.length, CAP)
  const visible = Math.min(shown, limit)
  const more = visible < limit

  useEffect(() => {
    const node = end.current
    if (!node || !more) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setShown((n) => n + step), {
      rootMargin: "400px",
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [more, visible, step])

  return (
    <>
      <ul className={className}>{items.slice(0, visible).map(children)}</ul>
      {more && <div className="resMore" ref={end} aria-hidden="true" />}
      {!all && !more && items.length > CAP && (
        <button
          type="button"
          className="resShowAll"
          onClick={() => {
            setAll(true)
            setShown(items.length)
          }}
        >
          Show all {items.length}
        </button>
      )}
    </>
  )
}
