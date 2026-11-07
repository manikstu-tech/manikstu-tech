"use client"

import { MAX_QTY, setQty } from "@/lib/cart"

// Replaces the Add to Cart button once the product is in the cart; going below 1 removes it
export function CartStepper({ slug, name, qty }: { slug: string; name: string; qty: number }) {
  return (
    <div className="cartStepper" role="group" aria-label={`${name} quantity`}>
      <button type="button" aria-label={`Fewer ${name}`} onClick={() => setQty(slug, qty - 1)}>
        −
      </button>
      <span aria-live="polite">{qty}</span>
      <button
        type="button"
        aria-label={`More ${name}`}
        disabled={qty >= MAX_QTY}
        onClick={() => setQty(slug, qty + 1)}
      >
        +
      </button>
    </div>
  )
}
