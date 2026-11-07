"use client"

import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reducedMotion
}
