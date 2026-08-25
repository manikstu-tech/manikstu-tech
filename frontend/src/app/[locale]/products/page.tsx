"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import {
  ShoppingBag,
  ArrowRight,
  Sprout,
  Package,
  Leaf,
  Minus,
  Plus,
  X,
  ShoppingCart,
} from "lucide-react";
import { getProducts } from "@/lib/api";
import { FALLBACK_PRODUCTS, trustFeatures, type Product } from "./data";
import {
  readCart,
  writeCart,
  subscribeCart,
  addToCart as addToCartStore,
  setQty as setQtyStore,
  removeFromCart as removeFromCartStore,
  clearCart as clearCartStore,
  type CartMap,
} from "./cart";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartMap>({});

  useEffect(() => {
    getProducts(1, 50)
      .then((res) => {
        if (res.data?.length) setProducts(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hydrate cart from localStorage on mount, and subscribe to same/other-tab changes.
  useEffect(() => {
    setCart(readCart());
    const unsub = subscribeCart(setCart);
    return unsub;
  }, []);

  // If we arrive from the detail page with #cart, scroll it into view once it renders.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#cart") return;
    // Wait a tick so the cart card mounts after cart state hydrates
    const t = setTimeout(() => {
      const el = document.getElementById("cart");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(t);
  }, [cart]);

  const addToCart = (id: number) => setCart(addToCartStore(id));
  const decrement = (id: number) => {
    const cur = readCart();
    setCart(setQtyStore(id, (cur[id] ?? 0) - 1));
  };
  const removeFromCart = (id: number) => setCart(removeFromCartStore(id));

  const cartLines = Object.entries(cart)
    .map(([idStr, qty]) => {
      const p = products.find((prod) => prod.id === Number(idStr));
      if (!p) return null;
      return { product: p, qty };
    })
    .filter((l): l is { product: Product; qty: number } => l !== null);

  const cartTotal = cartLines.reduce(
    (sum, l) => sum + Number(l.product.price) * l.qty,
    0
  );
  const cartCount = cartLines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero>
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Our Products
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              Quality Inputs.
              <br />
              <span className="text-manikstu-green">
                Grown for Farmers.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              Specially curated feed, fodder, and farm essentials that support
              goat health, productivity, and everyday livelihoods across rural
              India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#products-grid"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Browse Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Enquire Now
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Sprout className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                Sourced with care, priced for rural households
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
              {/* Marketplace / packaged goods line-art illustration */}
              <svg
                aria-hidden="true"
                viewBox="0 0 480 360"
                className="pointer-events-none absolute inset-0 h-full w-full"
                fill="none"
                stroke="#4A8C3F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Ground line */}
                <path d="M40 300 H440" opacity="0.35" />
                {/* Shop stall / awning */}
                <path d="M120 165 L360 165 L340 200 L140 200 Z" fill="#4A8C3F" fillOpacity="0.10" />
                <path d="M150 200 L165 220 L170 200" opacity="0.5" />
                <path d="M195 200 L210 220 L215 200" opacity="0.5" />
                <path d="M240 200 L255 220 L260 200" opacity="0.5" />
                <path d="M285 200 L300 220 L305 200" opacity="0.5" />
                <path d="M330 200 L345 220 L350 200" opacity="0.5" />
                {/* Central shopping bag */}
                <path d="M200 235 L280 235 L295 300 L185 300 Z" fill="#C4952A" fillOpacity="0.18" />
                <path d="M215 235 V220 C215 205 265 205 265 220 V235" />
                {/* Package box left */}
                <rect x="90" y="250" width="70" height="50" fill="#4A8C3F" fillOpacity="0.12" />
                <path d="M90 265 H160" opacity="0.5" />
                <path d="M125 250 V300" opacity="0.5" />
                {/* Bottle / feed sack right */}
                <path d="M340 250 L385 250 L380 300 L345 300 Z" fill="#4A8C3F" fillOpacity="0.10" />
                <path d="M348 260 H377" opacity="0.5" />
                {/* Small leaves */}
                <path d="M70 130 C80 115 100 110 110 120 C100 135 80 140 70 130 Z" fill="#4A8C3F" fillOpacity="0.15" />
                <path d="M390 110 C400 95 420 90 430 100 C420 115 400 120 390 110 Z" fill="#C4952A" fillOpacity="0.2" />
                {/* Sun */}
                <circle cx="240" cy="85" r="20" fill="#C4952A" fillOpacity="0.35" stroke="none" />
                <circle cx="240" cy="85" r="20" opacity="0.4" />
              </svg>

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Package className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  Farm-first product range
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>
        </PageHero>

        <section
          id="products-grid"
          className="bg-white dark:bg-gray-900 px-4 pt-4 pb-14 sm:px-6 sm:pt-6 sm:pb-16 md:px-8 md:pt-8 md:pb-20"
        >
          <div className="mx-auto max-w-7xl">
            {/* Ornamental section heading */}
            <div className="text-center">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
                  Our Products
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 sm:w-14 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl dark:text-white">
                Explore Our{" "}
                <span className="text-manikstu-green">Product Range</span>
              </h2>

              {/* Ornamental Divider with Framed Diamond */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
              </div>

              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-grey dark:text-gray-300">
                Trusted by farmers, for healthier animals and better livelihoods.
              </p>
            </div>

            {loading && products === FALLBACK_PRODUCTS ? null : null}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-2xl border border-manikstu-gold/20 bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  <div className="flex items-start gap-3 p-4">
                    {/* Product image tile */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-manikstu-cream">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-manikstu-green/40" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {product.category && (
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-manikstu-green">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="font-heading text-base font-bold text-charcoal group-hover:text-manikstu-green transition-colors dark:text-white line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-grey dark:text-gray-300 leading-snug line-clamp-3">
                        {product.description}
                      </p>
                      {product.size && (
                        <span className="mt-2 inline-flex items-center rounded-md border border-light-grey bg-white px-2 py-0.5 text-[10px] font-semibold text-charcoal/80 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
                          {product.size}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price + Add to Cart row */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-light-grey/70 px-4 py-3 dark:border-gray-700">
                    <p className="font-heading text-lg font-bold text-manikstu-green">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-manikstu-green hover:text-manikstu-leaf transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-1 rounded"
                      >
                        View Details
                      </Link>
                    {cart[product.id] ? (
                      <div className="inline-flex items-center gap-1 rounded-full border border-manikstu-green bg-white text-xs font-semibold text-manikstu-green">
                        <button
                          type="button"
                          onClick={() => decrement(product.id)}
                          aria-label={`Remove one ${product.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-manikstu-green/10 focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.25rem] text-center tabular-nums">
                          {cart[product.id]}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(product.id)}
                          aria-label={`Add one more ${product.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-manikstu-green/10 focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-manikstu-green bg-white px-3 py-1.5 text-xs font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-1"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Cart card — appears below the listing when items are added */}
            {cartLines.length > 0 && (
              <div
                id="cart"
                aria-live="polite"
                className="mt-10 overflow-hidden rounded-2xl border border-manikstu-gold/30 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between gap-3 border-b border-light-grey/70 bg-manikstu-cream/50 px-5 py-3 dark:border-gray-700 dark:bg-gray-700/50">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-green text-white">
                      <ShoppingCart className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-bold text-charcoal dark:text-white">
                        Your Cart
                      </p>
                      <p className="text-[11px] text-grey dark:text-gray-300">
                        {cartCount} {cartCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCart(clearCartStore())}
                    className="text-xs font-semibold text-grey hover:text-manikstu-red transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <ul className="divide-y divide-light-grey/70 dark:divide-gray-700">
                  {cartLines.map(({ product, qty }) => {
                    const lineTotal = Number(product.price) * qty;
                    return (
                      <li
                        key={product.id}
                        className="flex items-center gap-3 px-5 py-3"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-manikstu-cream">
                          {product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ShoppingBag className="h-5 w-5 text-manikstu-green/40" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-charcoal dark:text-white line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-grey dark:text-gray-300">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                            {product.size ? ` · ${product.size}` : ""}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-1 rounded-full border border-light-grey text-xs font-semibold text-charcoal dark:border-gray-600 dark:text-gray-200">
                          <button
                            type="button"
                            onClick={() => decrement(product.id)}
                            aria-label={`Decrease ${product.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-manikstu-green/10"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.25rem] text-center tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(product.id)}
                            aria-label={`Increase ${product.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-manikstu-green/10"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="w-20 shrink-0 text-right text-sm font-bold text-manikstu-green tabular-nums">
                          ₹{lineTotal.toLocaleString("en-IN")}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name} from cart`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-grey hover:bg-manikstu-red/10 hover:text-manikstu-red transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col items-stretch gap-3 border-t border-light-grey/70 bg-manikstu-cream/40 px-5 py-4 dark:border-gray-700 dark:bg-gray-700/40 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-grey dark:text-gray-300">
                      Total to pay
                    </p>
                    <p className="font-heading text-2xl font-bold text-manikstu-green">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Trust bar */}
            <div className="mt-10 rounded-2xl border border-light-grey/70 px-5 py-6 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {trustFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10">
                        <Icon className="h-5 w-5 text-manikstu-green" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-charcoal dark:text-white">
                          {f.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-grey dark:text-gray-300 leading-snug">
                          {f.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
