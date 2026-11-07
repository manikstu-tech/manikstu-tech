"use client"

import { useEffect, useState } from "react"
import { enqueueOrder, removeQueued, syncQueue, useQueuedOrders, type QueuedOrder } from "@/lib/orderQueue"
import { payWithRazorpay, type PayParams } from "@/lib/razorpayCheckout"
import { toast } from "@/lib/toast"
import type { CatalogItem } from "./CartCheckout"

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`

const STATE: Record<QueuedOrder["status"], string> = {
  queued: "Waiting for a connection",
  syncing: "Placing your order",
  awaiting_payment: "Ready to pay",
  conflict: "Needs your attention",
  failed: "Could not be placed",
}

// Orders saved while the connection was down. Saved is not placed, and placed is not confirmed: each state says which one it is.
export function SavedOrders({ catalog }: { catalog: CatalogItem[] }) {
  const orders = useQueuedOrders()
  const [busy, setBusy] = useState<string | null>(null)

  // Send what is waiting now, and again whenever the connection returns
  useEffect(() => {
    void syncQueue()
    const onOnline = () => void syncQueue()
    window.addEventListener("online", onOnline)
    return () => window.removeEventListener("online", onOnline)
  }, [])

  if (!orders.length) return null

  const nameOf = (slug: string) => catalog.find((p) => p.slug === slug)?.name ?? slug

  const pay = async (order: QueuedOrder) => {
    setBusy(order.clientOrderId)
    try {
      const res = await fetch(`/api/orders/${order.clientOrderId}/payment`, { method: "POST" })
      const data = await res.json().catch(() => ({}))
      if (res.status === 409 && data.error === "already_paid") {
        await removeQueued(order.clientOrderId)
        toast.success("This order is already paid")
        return setBusy(null)
      }
      if (!res.ok) {
        toast.error("We could not start the payment. Please try again in a moment.")
        return setBusy(null)
      }
      const params = data as PayParams
      const ref = params.orderId.slice(0, 8).toUpperCase()
      await payWithRazorpay(params, order.customer, {
        onPaid: async () => {
          await removeQueued(order.clientOrderId)
          toast.success("Payment received", { description: `Order ${ref}` })
          setBusy(null)
        },
        onUnconfirmed: (paymentId) => {
          toast.error(`We received your payment but could not confirm it. Please contact us with payment id ${paymentId}.`, { duration: 12000 })
          setBusy(null)
        },
        onDismiss: () => setBusy(null),
      })
    } catch {
      toast.error("We could not start the payment. Please check your connection and try again.")
      setBusy(null)
    }
  }

  // Take the server's new prices: the saved order is replaced by one that expects them, and is sent again
  const acceptNewPrices = async (order: QueuedOrder) => {
    const current = new Map((order.conflicts ?? []).flatMap((c) => (c.currentPrice !== undefined ? [[c.slug, c.currentPrice] as const] : [])))
    await removeQueued(order.clientOrderId)
    await enqueueOrder({
      clientOrderId: crypto.randomUUID(),
      customer: order.customer,
      items: order.items.map((i) => ({ ...i, expectedPrice: current.get(i.slug) ?? i.expectedPrice })),
    })
    void syncQueue()
  }

  const conflictText = (c: NonNullable<QueuedOrder["conflicts"]>[number]) =>
    c.reason === "price_changed"
      ? `${nameOf(c.slug)} is now ${rupees(c.currentPrice ?? 0)}.`
      : c.reason === "out_of_stock"
        ? `${nameOf(c.slug)} is out of stock.`
        : `${nameOf(c.slug)} is no longer sold.`

  return (
    <section className="savedOrders" aria-labelledby="saved-orders">
      <h2 id="saved-orders">Saved orders</h2>
      <ul>
        {orders.map((order) => {
          const total = order.amount ?? order.items.reduce((sum, i) => sum + i.expectedPrice * i.qty, 0)
          const onlyPrices = !!order.conflicts?.length && order.conflicts.every((c) => c.reason === "price_changed")
          return (
            <li key={order.clientOrderId} data-state={order.status}>
              <div className="savedHead">
                <strong>{rupees(total)}</strong>
                <span className="savedState">{STATE[order.status]}</span>
              </div>
              <p className="savedItems">{order.items.map((i) => `${nameOf(i.slug)} × ${i.qty}`).join(", ")}</p>
              <div role="status" aria-live="polite">
                {order.status === "queued" && <p>We will place it as soon as you are online. You do not need to do anything.</p>}
                {order.status === "syncing" && <p>Sending it to the shop now.</p>}
                {order.status === "awaiting_payment" && <p>The shop has your order. It is confirmed once you pay.</p>}
                {order.status === "failed" && <p>{order.message}</p>}
                {order.status === "conflict" && (
                  <>
                    <p>Prices or stock changed while you were away:</p>
                    <ul>{order.conflicts?.map((c) => <li key={`${c.slug}${c.reason}`}>{conflictText(c)}</li>)}</ul>
                  </>
                )}
              </div>
              <div className="savedActions">
                {order.status === "queued" && (
                  <button type="button" className="button" onClick={() => void syncQueue()} disabled={typeof navigator !== "undefined" && !navigator.onLine}>
                    Try now
                  </button>
                )}
                {order.status === "awaiting_payment" && (
                  <button type="button" className="button" onClick={() => void pay(order)} disabled={busy === order.clientOrderId}>
                    {busy === order.clientOrderId ? "Please wait..." : `Pay ${rupees(total)}`}
                  </button>
                )}
                {order.status === "conflict" && onlyPrices && (
                  <button type="button" className="button" onClick={() => void acceptNewPrices(order)}>
                    Accept the new prices
                  </button>
                )}
                {order.status !== "syncing" && (
                  <button type="button" className="cartRemove" onClick={() => void removeQueued(order.clientOrderId)}>
                    {order.status === "queued" ? "Cancel this order" : order.status === "awaiting_payment" ? "Remove from this device" : "Remove"}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
