"use client"

import { useEffect } from "react"

// The service worker shows the offline page at the address the visitor asked for, so reloading goes back to that page once
// the connection returns. Reloads on its own when the browser reports it is back online.
export function OfflineActions() {
  useEffect(() => {
    const back = () => location.reload()
    window.addEventListener("online", back)
    return () => window.removeEventListener("online", back)
  }, [])
  return (
    <>
      <button type="button" className="ajBtn gold" onClick={() => location.reload()}>
        Try again
      </button>
      <a className="ajBtn outline" href="/">
        Go to home
      </a>
    </>
  )
}
