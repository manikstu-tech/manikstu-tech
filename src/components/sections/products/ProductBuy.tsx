"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CartStepper } from "@/components/ui/CartStepper"
import { addToCart, useCart } from "@/lib/cart"

export function ProductBuy({ slug, name, inStock }: { slug: string; name: string; inStock: boolean }) {
  const router = useRouter()
  const { lines } = useCart()
  const qty = lines.find((l) => l.slug === slug)?.qty ?? 0

  return (
    <>
      <div className="pdActions">
        {qty ? (
          <CartStepper slug={slug} name={name} qty={qty} />
        ) : (
          <button type="button" className="button" disabled={!inStock} onClick={() => addToCart(slug)}>
            <svg className="pdBtnIcon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 7h12l1 13H5L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            Add to Cart
          </button>
        )}
        <button
          type="button"
          className="pdBuy"
          disabled={!inStock}
          onClick={() => {
            if (!qty) addToCart(slug)
            router.push("/cart")
          }}
        >
          Buy Now <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="pdAdded" aria-live="polite">
        {qty > 0 && (
          <>
            In your cart. <Link href="/cart">View cart</Link>
          </>
        )}
      </p>
    </>
  )
}
