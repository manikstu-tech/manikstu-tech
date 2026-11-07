"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Keeps <html data-path> equal to the current page when visitors move around the site without a full reload. The first value is set
// by a small script in the head before the page paints (see the root layout); style edits from /admin are scoped to this attribute.
export function PathAttr() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.dataset.path = pathname
  }, [pathname])
  return null
}
