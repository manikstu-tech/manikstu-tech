"use client"

import { useMemo, useSyncExternalStore } from "react"
import { toast } from "@/lib/toast"

export type CartLine = { slug: string; qty: number }

export const MAX_QTY = 10
const KEY = "manikstu-cart"
const listeners = new Set<() => void>()
const firstItemListeners = new Set<() => void>()

// The cart lives in this browser only (localStorage). The raw string is the snapshot so React sees a stable value.
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "[]"
  } catch {
    return "[]"
  }
}

const parse = (raw: string): CartLine[] => {
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.filter(
      (l): l is CartLine =>
        typeof l?.slug === "string" && Number.isInteger(l.qty) && l.qty >= 1 && l.qty <= MAX_QTY,
    )
  } catch {
    return []
  }
}

const write = (lines: CartLine[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines))
  } catch {
    return
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

export function addToCart(slug: string, qty = 1) {
  const lines = parse(read())
  const wasEmpty = !lines.length
  const line = lines.find((l) => l.slug === slug)
  if (line) line.qty = Math.min(MAX_QTY, line.qty + qty)
  else lines.push({ slug, qty: Math.min(MAX_QTY, qty) })
  write(lines)
  // The first product opens the mini cart; every later one gets a toast, so adding is never silent
  if (wasEmpty) firstItemListeners.forEach((listener) => listener())
  else toast.success("Added to your cart", { action: { label: "View cart", href: "/cart" }, duration: 4000 })
}

// Fires only when a visitor adds to an empty cart, not when a saved cart loads with the page
export function onFirstItem(listener: () => void) {
  firstItemListeners.add(listener)
  return () => {
    firstItemListeners.delete(listener)
  }
}

// A quantity below 1 removes the line
export function setQty(slug: string, qty: number) {
  const lines = parse(read()).filter((l) => l.slug !== slug)
  if (qty >= 1) lines.push({ slug, qty: Math.min(MAX_QTY, qty) })
  write(lines)
}

export const clearCart = () => write([])

export function useCart() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]")
  const lines = useMemo(() => parse(raw), [raw])
  return { lines, count: lines.reduce((sum, l) => sum + l.qty, 0) }
}
