"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Package, CheckCircle2, ShoppingBag } from "lucide-react";
import {
  readCart,
  subscribeCart,
  clearCart,
  cartLines as cartLinesOf,
  cartCount as cartCountOf,
  cartTotal as cartTotalOf,
  type CartMap,
} from "../cart";

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
  const t = useTranslations("Checkout");
  const [cart, setCart] = useState<CartMap>({});
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    setCart(readCart());
    const unsub = subscribeCart(setCart);
    return unsub;
  }, []);

  const cartLines = cartLinesOf(cart);
  const cartTotal = cartTotalOf(cart);
  const cartCount = cartCountOf(cart);

  const update = (key: keyof Address) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAddress((a) => ({ ...a, [key]: e.target.value }));

  const updatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setAddress((a) => ({ ...a, phone: digits }));
  };

  const updatePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setAddress((a) => ({ ...a, pincode: digits }));
  };

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
            <ArrowLeft className="h-4 w-4" /> {t("backToProducts")}
          </Link>

          <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            {t("checkout")}
          </h1>
          <p className="mt-2 text-grey">
            {t("enterDeliveryAddress")}
          </p>

          {placed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                <CheckCircle2 className="mx-auto h-14 w-14 text-manikstu-green" />
                <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">
                  {t("orderPlacedSuccess")}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-grey">
                  {t("orderThankYou", { name: address.fullName || t("friend"), phone: address.phone || t("yourPhone"), city: address.city || t("yourAddress") })}
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
                >
                  {t("continueShopping")}
                </Link>
              </div>
            </div>
          )}

          {cartCount === 0 && !placed ? (
            <div className="mt-10 rounded-2xl border border-light-grey bg-white p-8 text-center shadow-sm md:p-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-grey/50" />
              <h2 className="mt-4 font-heading text-xl font-bold text-charcoal">
                {t("cartEmpty")}
              </h2>
              <p className="mt-2 text-grey">
                {t("addProductsBefore")}
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
              >
                {t("browseProducts")}
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
                  {t("deliveryAddress")}
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label={t("fullName")} required>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={update("fullName")}
                      className={inputCls}
                      placeholder={t("fullNamePlaceholder")}
                    />
                  </Field>
                  <Field label={t("phone")} required>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={address.phone}
                      onChange={updatePhone}
                      className={inputCls}
                      placeholder={t("phonePlaceholder")}
                    />
                  </Field>
                  <Field label={t("email")} className="sm:col-span-2">
                    <input
                      type="email"
                      value={address.email}
                      onChange={update("email")}
                      className={inputCls}
                      placeholder={t("emailPlaceholder")}
                    />
                  </Field>
                  <Field label={t("address")} required className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={address.line1}
                      onChange={update("line1")}
                      className={inputCls}
                      placeholder={t("addressPlaceholder")}
                    />
                  </Field>
                  <Field label={t("landmarkArea")} className="sm:col-span-2">
                    <input
                      type="text"
                      value={address.line2}
                      onChange={update("line2")}
                      className={inputCls}
                      placeholder={t("landmarkPlaceholder")}
                    />
                  </Field>
                  <Field label={t("cityVillage")} required>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={update("city")}
                      className={inputCls}
                      placeholder={t("cityPlaceholder")}
                    />
                  </Field>
                  <Field label={t("state")} required>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={update("state")}
                      className={inputCls}
                      placeholder={t("statePlaceholder")}
                    />
                  </Field>
                  <Field label={t("pinCode")} required>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={address.pincode}
                      onChange={updatePincode}
                      className={inputCls}
                      placeholder={t("pinPlaceholder")}
                    />
                  </Field>
                  <Field label={t("orderNotes")} className="sm:col-span-2">
                    <textarea
                      rows={3}
                      value={address.notes}
                      onChange={update("notes")}
                      className={inputCls}
                      placeholder={t("notesPlaceholder")}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
                >
                  {t("proceedToPay")}
                </button>
              </form>

              {/* Order summary */}
              <aside className="h-fit rounded-2xl border border-light-grey bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-heading text-xl font-bold text-charcoal">
                  {t("orderSummary")}
                </h2>
                <ul className="mt-5 space-y-4">
                  {cartLines.map((line) => (
                    <li key={line.slug} className="flex items-center gap-3">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-manikstu-cream">
                        {line.image ? (
                          <Image
                            src={line.image}
                            alt={line.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-manikstu-green" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-charcoal">
                          {line.name}
                        </p>
                        <p className="text-xs text-grey">
                          Qty {line.qty}
                          {line.size ? ` · ${line.size}` : ""}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-charcoal">
                        ₹{(line.price * line.qty).toLocaleString("en-IN")}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2 border-t border-light-grey/70 pt-4 text-sm">
                  <div className="flex justify-between text-grey">
                    <span>{t("items")} ({cartCount})</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-grey">
                    <span>{t("delivery")}</span>
                    <span className="text-manikstu-green">{t("free")}</span>
                  </div>
                  <div className="flex justify-between border-t border-light-grey/70 pt-3 font-body text-lg font-bold text-charcoal">
                    <span>{t("total")}</span>
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
