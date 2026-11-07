"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { toast, useToasts, type ToastItem } from "@/lib/toast"

const ICON = {
  success: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  error: <path d="M12 7v6m0 3.5v.01M10.3 3.9L2.8 17.2A2 2 0 004.5 20h15a2 2 0 001.7-2.8L13.7 3.9a2 2 0 00-3.4 0z" />,
  info: <path d="M12 11v5m0-8.5v.01M12 21a9 9 0 100-18 9 9 0 000 18z" />,
}

function Toast({ item }: { item: ToastItem }) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const left = useRef(item.duration)
  const started = useRef(0)

  const start = () => {
    clearTimeout(timer.current)
    started.current = Date.now()
    timer.current = setTimeout(() => toast.dismiss(item.id), left.current)
  }
  // Hovering or focusing a toast pauses its countdown, so nobody loses a message mid-read
  const pause = () => {
    clearTimeout(timer.current)
    left.current -= Date.now() - started.current
  }
  useEffect(() => {
    left.current = item.duration
    start()
    return () => clearTimeout(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <li
      className={`toast ${item.kind}`}
      // Errors interrupt a screen reader; the rest wait their turn
      role={item.kind === "error" ? "alert" : "status"}
      onMouseEnter={pause}
      onMouseLeave={start}
      onFocus={pause}
      onBlur={start}
    >
      <svg className="toastIcon" viewBox="0 0 24 24" aria-hidden="true">
        {ICON[item.kind]}
      </svg>
      <div className="toastBody">
        <p className="toastTitle">{item.title}</p>
        {item.description && <p className="toastText">{item.description}</p>}
        {item.action && (
          <Link className="toastAction" href={item.action.href} onClick={() => toast.dismiss(item.id)}>
            {item.action.label}
          </Link>
        )}
      </div>
      <button type="button" className="toastClose" aria-label="Dismiss message" onClick={() => toast.dismiss(item.id)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <span className="toastBar" style={{ animationDuration: `${item.duration}ms` }} aria-hidden="true" />
    </li>
  )
}

// One region for the whole site, mounted once in the root layout
export function Toaster() {
  const items = useToasts()
  return (
    <ol className="toastRegion" aria-label="Notifications">
      {items.map((item) => (
        <Toast key={item.id} item={item} />
      ))}
    </ol>
  )
}
