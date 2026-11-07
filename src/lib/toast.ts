"use client"

import { useSyncExternalStore } from "react"

export type ToastKind = "success" | "error" | "info"
export type ToastAction = { label: string; href: string }
export type ToastItem = { id: string; kind: ToastKind; title: string; description?: string; action?: ToastAction; duration: number }
type Options = { description?: string; action?: ToastAction; id?: string; duration?: number }

const MAX_VISIBLE = 3
// Errors stay longer: they need reading, and often acting on
const DURATION: Record<ToastKind, number> = { success: 5000, info: 5000, error: 8000 }
const listeners = new Set<() => void>()
let items: ToastItem[] = []
let seq = 0

const emit = () => listeners.forEach((listener) => listener())

function show(kind: ToastKind, title: string, { description, action, id, duration }: Options = {}) {
  const key = id ?? `t${++seq}`
  const next: ToastItem = { id: key, kind, title, description, action, duration: duration ?? DURATION[kind] }
  // The same id replaces the toast in place, so "You are offline" never stacks up
  items = [...items.filter((t) => t.id !== key), next].slice(-MAX_VISIBLE)
  emit()
  return key
}

// Use from any client component or event handler: toast.success("Saved"), toast.error("Could not save", { description })
export const toast = {
  success: (title: string, options?: Options) => show("success", title, options),
  error: (title: string, options?: Options) => show("error", title, options),
  info: (title: string, options?: Options) => show("info", title, options),
  // The two outcomes every form has, worded once so all forms answer the same way
  sent: (title: string) => show("success", title, { description: "Our team will get back to you soon." }),
  failed: () =>
    show("error", "We could not send that", { description: "Check your connection and try again. Your answers are still in the form." }),
  dismiss(id: string) {
    items = items.filter((t) => t.id !== id)
    emit()
  },
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const EMPTY: ToastItem[] = []

export const useToasts = () => useSyncExternalStore(subscribe, () => items, () => EMPTY)
