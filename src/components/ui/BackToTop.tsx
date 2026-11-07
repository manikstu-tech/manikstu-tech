"use client"

import { useEffect, useState } from "react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      className={visible ? "backToTop show" : "backToTop"}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      inert={!visible}
    >
      ↑
    </button>
  )
}
