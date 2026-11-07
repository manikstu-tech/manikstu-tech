"use client"

import type { Customer } from "@/lib/orders"

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open(): void }
  }
}

// What the backend hands back when a payment is started
export type PayParams = { orderId: string; razorpayOrderId: string; amount: number; keyId: string }

export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Razorpay failed to load"))
    document.head.appendChild(script)
  })
}

type Outcome = {
  onPaid: () => void
  // Razorpay took the payment but the shop could not confirm it right now; the payment id is what the shopper quotes to us
  onUnconfirmed: (paymentId: string) => void
  onDismiss: () => void
}

// Opens Razorpay's payment window for an order the backend holds. Used for a fresh order and for one that was saved offline.
export async function payWithRazorpay(params: PayParams, customer: Customer, { onPaid, onUnconfirmed, onDismiss }: Outcome) {
  await loadRazorpay()
  const checkout = new window.Razorpay!({
    key: params.keyId,
    amount: params.amount,
    currency: "INR",
    order_id: params.razorpayOrderId,
    name: "Manikstu Agro Pvt. Ltd.",
    prefill: { name: customer.name, email: customer.email, contact: customer.phone },
    // Razorpay needs a colour value, so read the brand token instead of hard-coding it
    theme: { color: getComputedStyle(document.documentElement).getPropertyValue("--forest").trim() },
    modal: { ondismiss: onDismiss },
    handler: async (response: Record<string, string>) => {
      try {
        const verified = await fetch("/api/orders/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: params.orderId, ...response }),
        })
        if (!verified.ok) throw new Error()
        onPaid()
      } catch {
        onUnconfirmed(response.razorpay_payment_id)
      }
    },
  })
  checkout.open()
}
