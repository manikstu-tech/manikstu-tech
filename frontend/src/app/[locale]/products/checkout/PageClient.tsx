"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Package, CheckCircle2, ShoppingBag } from "lucide-react";
import { getProductBySlug, placeOrder, InsufficientStockError, type OrderItemInput } from "@/lib/api";
import {
  readCart,
  subscribeCart,
  clearCart,
  limitToStock,
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

type CashfreeSdk = (opts: { mode: "sandbox" | "production" }) => {
  checkout: (opts: { paymentSessionId: string; redirectTarget: "_self" }) => Promise<unknown>;
};

const CASHFREE_MODE: "sandbox" | "production" =
  process.env.NEXT_PUBLIC_CASHFREE_MODE === "production" ? "production" : "sandbox";

function loadCashfree(): Promise<CashfreeSdk> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { Cashfree?: CashfreeSdk };
    if (w.Cashfree) return resolve(w.Cashfree);
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.async = true;
    s.onload = () => (w.Cashfree ? resolve(w.Cashfree) : reject(new Error("Cashfree SDK missing")));
    s.onerror = () => reject(new Error("Cashfree SDK failed to load"));
    document.head.appendChild(s);
  });
}

/** The order's payment window closed (its units were given back): the customer has to place the order again. */
class PaymentExpiredError extends Error {}

// Asks our backend for a payment session. The amount comes from the saved order, never from the browser.
async function startPayment(orderNumber: string): Promise<string> {
  const res = await fetch(`/api/backend/orders/${encodeURIComponent(orderNumber)}/pay`, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const json = await res.json().catch(() => null);
  const sessionId = json?.data?.payment_session_id;
  if (json?.code === "payment_expired") {
    throw new PaymentExpiredError(json.message ?? "This payment has expired. Please place the order again.");
  }
  if (!res.ok || typeof sessionId !== "string") {
    throw new Error(json?.message ?? "Could not start the payment.");
  }
  return sessionId;
}

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const [cart, setCart] = useState<CartMap>({});
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [placed, setPlaced] = useState(false);
  // Shown on the success card: without it the customer has no way to track.
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  // Set when stock ran short: the cart has been corrected and the customer reviews it before placing again.
  const [stockNotice, setStockNotice] = useState<string | null>(null);

  const applyShortage = (slug: string, name: string, stock: number) => {
    setCart(limitToStock(slug, stock));
    setStockNotice(stock <= 0 ? t("itemOutOfStock", { name }) : t("itemLowStock", { name, count: stock }));
  };

  const [payMethod, setPayMethod] = useState<"online" | "cod">("online");
  // Set once the order exists, so a failed payment is retried on the SAME order, not a new one.
  const [pendingOrder, setPendingOrder] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (paying) return;
    setFailed(false);
    setStockNotice(null);
    setPayError(null);
    setPaying(true);
    try {
      let number = pendingOrder;

      if (!number) {
        // Resolve cart slugs to backend product IDs; never place a partial order. The same lookup carries live
        // stock, so a shortage is caught here and the cart corrected before anything is sent (the server checks again).
        const items: OrderItemInput[] = [];
        for (const l of cartLines) {
          const res = await getProductBySlug(l.slug).catch(() => null);
          const data = (res as { data?: { id?: unknown; stock?: unknown; stockStatus?: unknown } } | null)?.data;
          const productId = Number(data?.id);
          if (!Number.isFinite(productId) || productId <= 0) throw new Error(`unresolvable:${l.slug}`);
          const stock = typeof data?.stock === "number" ? data.stock : undefined;
          if (data?.stockStatus === "out" || (stock !== undefined && l.qty > stock)) {
            applyShortage(l.slug, l.name, data?.stockStatus === "out" ? 0 : stock ?? 0);
            return;
          }
          items.push({ productId, quantity: l.qty });
        }
        const placedOrder = await placeOrder({
          items,
          customer_name: address.fullName,
          phone: address.phone,
          email: address.email,
          address_line1: address.line1,
          address_line2: address.line2 || undefined,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          notes: address.notes || undefined,
          // An online order is held until paid and reaches the team only then; a pay-later one goes at once.
          payment_method: payMethod,
        });
        number = placedOrder?.data?.order_number ?? null;
        if (!number) throw new Error("missing order number");

        if (payMethod === "cod") {
          // Existing behaviour: the team confirms by phone.
          setOrderNumber(number);
          setPlaced(true);
          clearCart();
          return;
        }
        setPendingOrder(number);
      }

      try {
        const sessionId = await startPayment(number);
        const cashfree = (await loadCashfree())({ mode: CASHFREE_MODE });
        // The cart is cleared on the status page, once the payment is confirmed.
        await cashfree.checkout({ paymentSessionId: sessionId, redirectTarget: "_self" });
      } catch (err) {
        // An expired order cannot be paid any more: the next press places a fresh one.
        if (err instanceof PaymentExpiredError) setPendingOrder(null);
        setPayError(err instanceof Error ? err.message : "Could not start the payment.");
      }
    } catch (err) {
      // Someone bought the last units between the check above and the order: same correction.
      if (err instanceof InsufficientStockError) {
        applyShortage(err.product.slug, err.product.name, err.product.stock);
        return;
      }
      setFailed(true);
    } finally {
      setPaying(false);
    }
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
          <p className="mt-2 text-charcoal">
            {t("enterDeliveryAddress")}
          </p>

          {placed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                <CheckCircle2 className="mx-auto h-14 w-14 text-manikstu-green" />
                <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">
                  {t("orderPlacedSuccess")}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-charcoal">
                  {t("orderThankYou", { name: address.fullName || t("friend"), phone: address.phone || t("yourPhone"), city: address.city || t("yourAddress") })}
                </p>
                {orderNumber && (
                  <div className="mt-4 rounded-xl border border-manikstu-gold/30 bg-manikstu-cream/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-manikstu-green">
                      {t("orderNumberLabel")}
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-charcoal">{orderNumber}</p>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal">{t("orderNumberHelp")}</p>
                    <Link
                      href={`/products/track?order=${encodeURIComponent(orderNumber)}`}
                      className="mt-3 inline-block text-sm font-semibold text-manikstu-green underline hover:text-manikstu-leaf"
                    >
                      {t("trackThisOrder")}
                    </Link>
                  </div>
                )}
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
              <ShoppingBag className="mx-auto h-12 w-12 text-charcoal/50" />
              <h2 className="mt-4 font-heading text-xl font-bold text-charcoal">
                {t("cartEmpty")}
              </h2>
              <p className="mt-2 text-charcoal">
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
                  <Field label={t("email")} required className="sm:col-span-2">
                    <input
                      type="email"
                      required
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

               

                                <fieldset className="mt-6">
                  <legend className="mb-2 text-sm font-semibold text-charcoal">Payment method</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-light-grey p-3 text-sm">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={payMethod === "online"}
                        disabled={!!pendingOrder}
                        onChange={() => setPayMethod("online")}
                      />
                      Pay online (UPI, card, netbanking)
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-light-grey p-3 text-sm">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={payMethod === "cod"}
                        disabled={!!pendingOrder}
                        onChange={() => setPayMethod("cod")}
                      />
                      Pay later (our team will call you)
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={paying}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf disabled:opacity-60"
                >
                  {paying
                    ? "Please wait..."
                    : pendingOrder
                      ? "Retry payment"
                      : payMethod === "online"
                        ? `Pay ₹${cartTotal.toLocaleString("en-IN")}`
                        : t("placeOrder")}
                </button>
                {stockNotice && (
                  <p role="alert" className="mt-3 rounded-xl border border-manikstu-red/30 bg-manikstu-red/5 px-4 py-3 text-center text-sm font-medium text-manikstu-red">
                    {stockNotice}
                  </p>
                )}
                {payError && (
                  <p className="mt-3 text-center text-sm font-medium text-manikstu-red">{payError}</p>
                )}
                {failed && (
                  <p className="mt-3 text-center text-sm font-medium text-manikstu-red">
                    {t("orderFailed")}
                  </p>
                )}
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
                        <p className="text-xs text-charcoal">
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
                  <div className="flex justify-between text-charcoal">
                    <span>{t("items")} ({cartCount})</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-charcoal">
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
  "w-full rounded-lg border border-light-grey bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/60 focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20";

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
