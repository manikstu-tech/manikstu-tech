"use client"

import { useEffect } from "react"
import { toast } from "@/lib/toast"

// Registers the service worker (production only, so it never serves stale files while developing) and tells the visitor when
// the connection drops or comes back.
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined)
    }
    const off = () =>
      toast.info("You are offline", { id: "net", description: "Pages you opened earlier can still load.", duration: 600000 })
    const on = () => toast.success("Back online", { id: "net", duration: 3000 })
    if (!navigator.onLine) off()
    window.addEventListener("offline", off)
    window.addEventListener("online", on)
    return () => {
      window.removeEventListener("offline", off)
      window.removeEventListener("online", on)
    }
  }, [])
  return null
}
