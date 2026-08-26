"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Package, CheckCircle2, ShoppingBag } from "lucide-react";
import { getProducts } from "@/lib/api";
import { FALLBACK_PRODUCTS, type Product } from "../data";
import { readCart, subscribeCart, clearCart, type CartMap } from "../cart";

type Address = {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [cart, setCart] = useState<CartMap>({});
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    getProducts(1, 50)
      .then((res) => {
        if (res.data?.length) setProducts(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCart(readCart());
    const unsub = subscribeCart(setCart);
    return unsub;
  }, []);

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

  const update = (key: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAddress((a) => ({ ...a, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  return (
    <>
      <Header />
      <main id="main-content" className="bg-manikstu-cream/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
          >
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>

          <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-grey">
            Enter your delivery address to place the order.
          </p>

          {placed ? (
            <div className="mt-10 rounded-2xl border border-light-grey bg-white p-8 text-center shadow-sm md:p-12">
              <CheckCircle2 className="mx-auto h-14 w-14 text-manikstu-green" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">
                Order placed successfully!
              </h2>
              <p className="mx-auto mt-2 max-w-md text-grey">
                Thank you, {address.fullName || "friend"}. Our team will contact
                you on {address.phone || "your phone"} to confirm delivery to{" "}
                {address.city || "your address"}.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
              >
                Continue shopping
              </Link>
            </div>
          ) : cartCount === 0 ? (
            <div className="mt-10 rounded-2xl border border-light-grey bg-white p-8 text-center shadow-sm md:p-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-grey/50" />
              <h2 className="mt-4 font-heading text-xl font-bold text-charcoal">
                Your cart is empty
              </h2>
              <p className="mt-2 text-grey">
                Add some products before checking out.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              {/* Address form */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-light-grey bg-white p-6 shadow-sm md:p-8"
              >
                <h2 className="font-heading text-xl font-bold text-charcoal">
                  Delivery Address
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={update("fullName")}
                      className={inputCls}
                      placeholder="Your full name"
                    />
                  </Field>
                  <Field label="Phone Number" required>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={update("phone")}
                      className={inputCls}
                      placeholder="10-digit mobile number"
                    />
                  </Field>
                  <Field label="Email" className="sm:col-span-2">
                    <input
                      type="email"
                      value={address.email}
                      onChange={update("email")}
                      className={inputCls}
                      placeholder="you@example.com (optional)"
                    />
                  </Field>
                  <Field label="Address" required className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={address.line1}
                      onChange={update("line1")}
                      className={inputCls}
                      placeholder="House / street / village"
                    />
                  </Field>
                  <Field label="Landmark / Area" className="sm:col-span-2">
                    <input
                      type="text"
                      value={address.line2}
                      onChange={update("line2")}
                      className={inputCls}
                      placeholder="Nearby landmark (optional)"
                    />
                  </Field>
                  <Field label="City / Village" required>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={update("city")}
                      className={inputCls}
                      placeholder="City or village"
                    />
                  </Field>
                  <Field label="State" required>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={update("state")}
                      className={inputCls}
                      placeholder="State"
                    />
                  </Field>
                  <Field label="PIN Code" required>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={address.pincode}
                      onChange={update("pincode")}
                      className={inputCls}
                      placeholder="6-digit PIN code"
                    />
                  </Field>
                  <Field label="Order Notes" className="sm:col-span-2">
                    <textarea
                      rows={3}
                      value={address.notes}
                      onChange={update("notes")}
                      className={inputCls}
                      placeholder="Any delivery instructions (optional)"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
                >
                  Proceed to Pay
                </button>
              </form>

              {/* Order summary */}
              <aside className="h-fit rounded-2xl border border-light-grey bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-heading text-xl font-bold text-charcoal">
                  Order Summary
                </h2>
                <ul className="mt-5 space-y-4">
                  {cartLines.map(({ product, qty }) => (
                    <li key={product.id} className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-manikstu-cream">
                        <Package className="h-5 w-5 text-manikstu-green" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-charcoal">
                          {product.name}
                        </p>
                        <p className="text-xs text-grey">
                          Qty {qty}
                          {product.size ? ` · ${product.size}` : ""}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">
                        ₹{(Number(product.price) * qty).toLocaleString("en-IN")}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2 border-t border-light-grey/70 pt-4 text-sm">
                  <div className="flex justify-between text-grey">
                    <span>Items ({cartCount})</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-grey">
                    <span>Delivery</span>
                    <span className="text-manikstu-green">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-light-grey/70 pt-3 font-heading text-lg font-bold text-charcoal">
                    <span>Total</span>
                    <span className="text-manikstu-green">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-light-grey bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-grey/60 focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20";

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="text-manikstu-red"> *</span>}
      </span>
      {children}
    </label>
  );
}
