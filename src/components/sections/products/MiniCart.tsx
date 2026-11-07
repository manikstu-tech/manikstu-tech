"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { CartStepper } from "@/components/ui/CartStepper"
import { PRODUCTS } from "@/constants/products"
import { productImage } from "@/constants/site"
import { clearCart, onFirstItem, setQty, useCart } from "@/lib/cart"

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`
const AUTO_MINIMIZE_MS = 5000

// A small cart fixed to the right of the screen while the order has items, so visitors can adjust it without leaving the product list
export function MiniCart() {
  const { lines, count } = useCart()
  const [minimized, setMinimized] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const focusIcon = useRef(false)

  // The first product shows the cart briefly; after that it opens only when the visitor asks
  useEffect(() => {
    const unsubscribe = onFirstItem(() => {
      setMinimized(false)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setMinimized(true), AUTO_MINIMIZE_MS)
    })
    return () => {
      unsubscribe()
      clearTimeout(timer.current)
    }
  }, [])

  // Never close the panel on someone who has started using it
  const keepOpen = () => clearTimeout(timer.current)

  const items = lines.flatMap(({ slug, qty }) => {
    const product = PRODUCTS.find((p) => p.slug === slug)
    return product ? [{ ...product, qty }] : []
  })
  if (!items.length) return null
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  if (minimized) {
    return (
      <button
        type="button"
        className="miniCartIcon"
        aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
        ref={(el) => {
          if (el && focusIcon.current) {
            focusIcon.current = false
            el.focus()
          }
        }}
        // Mouse only: on touch, opening before the tap ends could land the tap on Checkout
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setMinimized(false)
        }}
        onClick={() => setMinimized(false)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.6 12.4a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
        </svg>
        <span>{count}</span>
      </button>
    )
  }

  return (
    <aside
      className="miniCartPanel"
      aria-label="Your cart"
      onPointerEnter={keepOpen}
      onFocus={keepOpen}
    >
      <div className="miniHead">
        <div>
          <strong>Your Cart</strong>
          <small>
            {count} {count === 1 ? "item" : "items"}
          </small>
        </div>
        <div className="miniHeadActions">
          <button type="button" className="miniClear" onClick={clearCart}>
            Clear all
          </button>
          <button
            type="button"
            className="miniMinimize"
            aria-label="Minimize cart"
            title="Minimize"
            onClick={() => {
              focusIcon.current = true
              setMinimized(true)
            }}
          >
            −
          </button>
        </div>
      </div>
      <ul className="miniList">
        {items.map((item) => (
          <li key={item.slug}>
            <img src={productImage(item.image)} alt="" width="44" height="44" />
            <div>
              <strong>{item.name}</strong>
              <small>
                {rupees(item.price)} · {item.size}
              </small>
            </div>
            <CartStepper slug={item.slug} name={item.name} qty={item.qty} />
            <button
              type="button"
              className="miniRemove"
              aria-label={`Remove ${item.name}`}
              onClick={() => setQty(item.slug, 0)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="miniFoot">
        <div>
          <small>Total to pay</small>
          <strong>{rupees(total)}</strong>
        </div>
        <Link className="button" href="/cart">
          Proceed to Checkout <Arrow />
        </Link>
      </div>
    </aside>
  )
}
