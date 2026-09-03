"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  readCart,
  subscribeCart,
  setQty,
  removeFromCart,
  clearCart,
  subscribeCartDrawer,
  closeCartDrawer,
  type CartMap,
} from "@/app/[locale]/products/cart";
import { FALLBACK_PRODUCTS } from "@/app/[locale]/products/data";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartMap>({});
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const router = useRouter();

  // Load products from API / fallback
  useEffect(() => {
    getProducts(1, 50)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Hydrate cart and subscribe to updates
  useEffect(() => {
    setCart(readCart());
    const unsubCart = subscribeCart(setCart);
    const unsubDrawer = subscribeCartDrawer(setIsOpen);
    return () => {
      unsubCart();
      unsubDrawer();
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCartDrawer();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen]);

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([idStr, qty]) => {
        const id = Number(idStr);
        const p = products.find((prod) => prod.id === id);
        if (!p) return null;
        return { product: p, qty };
      })
      .filter((l): l is { product: Product; qty: number } => l !== null);
  }, [cart, products]);

  const cartTotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + Number(l.product.price || 0) * l.qty, 0),
    [cartLines]
  );

  const cartCount = useMemo(
    () => cartLines.reduce((sum, l) => sum + l.qty, 0),
    [cartLines]
  );

  const handleCheckout = () => {
    closeCartDrawer();
    router.push("/products/checkout");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart"
          className="w-screen max-w-md bg-white shadow-2xl transition-transform dark:bg-charcoal flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-light-grey/80 px-6 py-4 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-bold text-charcoal dark:text-white">
                  Shopping Cart
                </h2>
                <p className="text-xs text-grey dark:text-gray-400">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCartDrawer}
              aria-label="Close cart"
              className="flex h-8 w-8 items-center justify-center rounded-full text-grey hover:bg-light-grey/50 hover:text-charcoal dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartLines.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green mb-4">
                  <ShoppingBag className="h-10 w-10 opacity-70" />
                </div>
                <h3 className="font-heading text-lg font-bold text-charcoal dark:text-white">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-grey dark:text-gray-400 max-w-xs">
                  Looks like you haven&apos;t added any products yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCartDrawer();
                    router.push("/products");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf shadow-sm"
                >
                  Browse Products <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-light-grey/60 dark:divide-gray-800">
                {cartLines.map(({ product, qty }) => {
                  const linePrice = Number(product.price || 0) * qty;
                  return (
                    <li key={product.id} className="py-4 flex gap-3.5 items-start">
                      {/* Product Thumbnail */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-light-grey/80 bg-white dark:border-gray-700 dark:bg-gray-800">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-manikstu-green/30" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeCartDrawer}
                          className="font-heading text-sm font-bold text-charcoal dark:text-white hover:text-manikstu-green transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        {product.size && (
                          <p className="text-xs text-grey dark:text-gray-400 mt-0.5">
                            {product.size}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-manikstu-green mt-1">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </p>

                        {/* Quantity controls */}
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1 rounded-full border border-light-grey/80 bg-white text-xs font-semibold text-charcoal dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-manikstu-green/10 hover:text-manikstu-green transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.25rem] text-center tabular-nums font-bold">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(product.id, qty + 1)}
                              aria-label="Increase quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-manikstu-green/10 hover:text-manikstu-green transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-charcoal dark:text-white">
                              ₹{linePrice.toLocaleString("en-IN")}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="text-grey hover:text-manikstu-red dark:text-gray-400 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartLines.length > 0 && (
            <div className="border-t border-light-grey/80 bg-light-grey/20 p-6 dark:border-gray-800 dark:bg-gray-900/50">
              {/* Delivery notice */}
              <div className="flex items-center gap-2 text-xs text-manikstu-green font-medium mb-3">
                <Truck className="h-4 w-4 shrink-0" />
                <span>Free delivery across Odisha & Pan India</span>
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-sm text-grey dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-heading text-xl font-bold text-charcoal dark:text-white">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2 active:scale-[0.98]"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-grey hover:text-manikstu-red transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    type="button"
                    onClick={closeCartDrawer}
                    className="font-medium text-manikstu-green hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Trust micro-banner */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-grey dark:text-gray-400 border-t border-light-grey/60 dark:border-gray-800 pt-3">
                <ShieldCheck className="h-3.5 w-3.5 text-manikstu-green" />
                <span>100% Genuine Ayurvedic & Farm Direct Products</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
