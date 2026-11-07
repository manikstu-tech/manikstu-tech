"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MiniCart } from "@/components/sections/products/MiniCart"
import { PRODUCTS } from "@/constants/products"
import { CartStepper } from "@/components/ui/CartStepper"
import { productImage } from "@/constants/site"
import { addToCart, useCart } from "@/lib/cart"

const FILTERS = ["All", "Health", "Nutrition"] as const
type Filter = (typeof FILTERS)[number]

const count = (filter: Filter) =>
  filter === "All"
    ? PRODUCTS.length
    : PRODUCTS.filter(({ category }) => category === filter).length

export function ProductGrid() {
  const [filter, setFilter] = useState<Filter>("All")
  const { lines } = useCart()
  const router = useRouter()
  const inCart = (slug: string) => lines.find((l) => l.slug === slug)?.qty ?? 0
  const shown = PRODUCTS.filter(
    ({ category }) => filter === "All" || category === filter,
  )

  return (
    <>
      <div className="catalogBar">
        <div className="catalogTabs" role="group" aria-label="Filter products">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name} <span>{count(name)}</span>
            </button>
          ))}
        </div>
        <div className="catalogEnd">
          <p aria-live="polite">
            Showing {shown.length} {shown.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
      <MiniCart />
      <div className="catalogGrid" key={filter}>
        {shown.map((product) => (
          <article className="catalogCard" key={product.slug}>
            <a
              className="catalogTile"
              href={`/products/${product.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={productImage(product.image)}
                alt=""
                width="480"
                height="384"
                loading="lazy"
              />
              {!product.inStock && (
                <span className="catalogStock">Out of stock</span>
              )}
            </a>
            <div className="catalogBody">
              <p className="catalogCategory">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="catalogTagline">{product.tagline}</p>
              <div className="catalogMeta">
                <span>{product.size}</span>
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
              </div>
              <a
                className="catalogLink"
                href={`/products/${product.slug}`}
                aria-label={`View details of ${product.name}`}
              >
                View details <span aria-hidden="true">→</span>
              </a>
              <div className="catalogBuy">
                {inCart(product.slug) ? (
                  <CartStepper slug={product.slug} name={product.name} qty={inCart(product.slug)} />
                ) : (
                  <button
                    type="button"
                    className="catalogAdd"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.slug)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  type="button"
                  className="catalogNow"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product.slug)
                    router.push("/cart")
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
