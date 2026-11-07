"use client"

import { useSyncExternalStore } from "react"
import type { Customer } from "@/lib/orders"
import { toast } from "@/lib/toast"

// Orders placed while the connection is down wait here, in this browser's IndexedDB, so they survive a reload or a closed tab.
// A queued order is only a request: it is NOT an order until the server accepts it, and it is not confirmed until it is paid.
//
//   queued            saved here, not yet sent
//   syncing           being sent (also what an interrupted send is left as, so it is sent again)
//   awaiting_payment  the server holds the order; the shopper still has to pay
//   conflict          the server refused it because a price changed or an item is gone
//   failed            the server refused it for good (for example, details it cannot accept)
// Paid orders leave the queue. The delivery details are deleted with them.

export type QueuedStatus = "queued" | "syncing" | "awaiting_payment" | "conflict" | "failed"
export type Conflict = { slug: string; reason: "unknown_product" | "out_of_stock" | "price_changed"; currentPrice?: number }
export type QueuedItem = { slug: string; qty: number; expectedPrice: number }

export type QueuedOrder = {
  clientOrderId: string
  items: QueuedItem[]
  customer: Customer
  status: QueuedStatus
  // Set once the server has the order
  serverOrderId?: string
  amount?: number
  conflicts?: Conflict[]
  message?: string
  createdAt: string
}

const DB = "manikstu"
const STORE = "orders"

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "clientOrderId" })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function run<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = work(db.transaction(STORE, mode).objectStore(STORE))
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } finally {
    db.close()
  }
}

const getAll = () => run("readonly", (s) => s.getAll() as IDBRequest<QueuedOrder[]>)
const put = (order: QueuedOrder) => run("readwrite", (s) => s.put(order))
const del = (id: string) => run("readwrite", (s) => s.delete(id))

// ---- what the page reads (useSyncExternalStore needs one stable value between changes) ----
let snapshot: QueuedOrder[] = []
let loaded = false
const listeners = new Set<() => void>()
const SERVER: QueuedOrder[] = []

async function refresh() {
  try {
    snapshot = (await getAll()).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  } catch {
    snapshot = []
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!loaded) {
    loaded = true
    void refresh()
  }
  return () => listeners.delete(listener)
}

export const useQueuedOrders = () => useSyncExternalStore(subscribe, () => snapshot, () => SERVER)

// ---- changing the queue ----
export async function enqueueOrder(order: Pick<QueuedOrder, "clientOrderId" | "items" | "customer">) {
  await put({ ...order, status: "queued", createdAt: new Date().toISOString() })
  await refresh()
}

export async function updateQueued(id: string, change: Partial<QueuedOrder>) {
  const current = (await getAll()).find((o) => o.clientOrderId === id)
  if (current) await put({ ...current, ...change })
  await refresh()
}

export async function removeQueued(id: string) {
  await del(id)
  await refresh()
}

// ---- sending ----
type SyncResult =
  | { clientOrderId: string | null; status: "created" | "existing"; order: { orderId: string; status: string; amount: number } }
  | { clientOrderId: string | null; status: "conflict"; conflicts: Conflict[] }
  | { clientOrderId: string | null; status: "invalid"; error: string; errors: Record<string, string> }
  | { clientOrderId: string | null; status: "failed"; error: string }

const BATCH = 20 // the most the server accepts in one request

async function syncNow() {
  const waiting = (await getAll()).filter((o) => o.status === "queued" || o.status === "syncing")
  if (!waiting.length) return
  for (const o of waiting) await put({ ...o, status: "syncing" })
  await refresh()

  let placed = 0
  for (let i = 0; i < waiting.length; i += BATCH) {
    const chunk = waiting.slice(i, i + BATCH)
    let results: SyncResult[]
    try {
      const res = await fetch("/api/orders/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: chunk.map(({ clientOrderId, items, customer }) => ({ clientOrderId, items, customer })) }),
      })
      if (!res.ok) throw new Error(String(res.status))
      results = (await res.json()).results
    } catch {
      // The connection dropped again, or the server is busy: put them back to be sent later (nothing is lost, and sending twice is safe)
      for (const o of chunk) await put({ ...o, status: "queued" })
      continue
    }
    for (const o of chunk) {
      const r = results.find((x) => x.clientOrderId === o.clientOrderId)
      if (!r) {
        await put({ ...o, status: "queued" })
      } else if (r.status === "created" || r.status === "existing") {
        if (r.order.status === "PAID") await del(o.clientOrderId)
        else {
          await put({ ...o, status: "awaiting_payment", serverOrderId: r.order.orderId, amount: r.order.amount, message: undefined })
          placed++
        }
      } else if (r.status === "conflict") {
        await put({ ...o, status: "conflict", conflicts: r.conflicts })
      } else if (r.status === "invalid" || (r.status === "failed" && r.error !== "server_error")) {
        const detail = r.status === "invalid" ? Object.values(r.errors)[0] : undefined
        await put({ ...o, status: "failed", message: detail ?? "The shop could not accept this order." })
      } else {
        await put({ ...o, status: "queued" }) // a server error: try again next time
      }
    }
  }
  await refresh()
  if (placed) toast.success(placed === 1 ? "Your saved order is ready to pay" : `${placed} saved orders are ready to pay`, { action: { label: "Pay now", href: "/cart" } })
}

// One send at a time, even across tabs (the server would cope with two, but one is quieter)
export async function syncQueue() {
  if (typeof navigator === "undefined" || !navigator.onLine) return
  const locks = navigator.locks
  if (locks) await locks.request("manikstu-order-sync", { ifAvailable: true }, (lock) => (lock ? syncNow() : undefined))
  else await syncNow()
}
