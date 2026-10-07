"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, PackageSearch } from "lucide-react";
import { trackOrder, type TrackedOrder } from "@/lib/api";

/** The lifecycle, in the order a customer travels it. */
const STEPS = ["pending", "confirmed", "ready_for_dispatch", "shipped", "delivered"] as const;

function TrackOrderForm() {
  const t = useTranslations("TrackOrder");
  const params = useSearchParams();

  // Arriving from the checkout success card, the order number is already known.
  const [orderNumber, setOrderNumber] = useState(params.get("order") ?? "");
  const [contact, setContact] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setOrder(null);
    try {
      const res = await trackOrder(orderNumber.trim(), contact.trim());
      setOrder(res.data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  // A finished order stops the stepper wherever it ended.
  const stepIndex = order ? STEPS.indexOf(order.status as (typeof STEPS)[number]) : -1;
  const isStopped = order ? order.status === "rejected" || order.status === "cancelled" : false;

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-manikstu-gold/25 bg-white p-6 shadow-sm">
            <div>
              <label htmlFor="orderNumber" className="mb-1.5 block text-sm font-semibold text-charcoal">
                {t("orderNumber")}
              </label>
              <input
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                className="w-full rounded-lg border border-light-grey px-4 py-2.5 text-sm focus:border-manikstu-green focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-charcoal">
                {t("contact")}
              </label>
              <input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full rounded-lg border border-light-grey px-4 py-2.5 text-sm focus:border-manikstu-green focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageSearch className="h-4 w-4" />}
              {status === "loading" ? t("searching") : t("submit")}
            </button>
          </form>

          {status === "error" && (
            <p role="alert" className="mt-6 rounded-lg border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-sm font-semibold text-manikstu-red">
              {t("notFound")}
            </p>
          )}

          {order && (
            <div className="mt-6 rounded-2xl border border-manikstu-gold/25 bg-white p-6 shadow-sm">
              <p className="font-heading text-lg font-bold text-charcoal">{order.order_number}</p>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-manikstu-green">
                {t("statusLabel")}
              </p>
              <p className="mt-1 font-semibold text-charcoal">{t(`status.${order.status}`)}</p>

              {!isStopped && (
                <ol className="mt-5 space-y-2">
                  {STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm">
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${i <= stepIndex ? "bg-manikstu-green" : "bg-light-grey"}`}
                      />
                      <span className={i <= stepIndex ? "font-semibold text-charcoal" : "text-grey"}>
                        {t(`status.${step}`)}
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              <dl className="mt-6 grid gap-3 border-t border-light-grey/70 pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-grey">{t("placedOn")}</dt>
                  <dd className="font-semibold text-charcoal">
                    {order.placed_at ? new Date(order.placed_at).toLocaleDateString() : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-grey">{t("total")}</dt>
                  <dd className="font-semibold text-charcoal">₹{order.total.toLocaleString("en-IN")}</dd>
                </div>
              </dl>

              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-manikstu-green">{t("items")}</p>
              <ul className="mt-2 space-y-1 text-sm text-grey">
                {order.items.map((item, i) => (
                  <li key={`${item.product_name}-${i}`}>
                    {item.product_name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
    </>
  );
}

/**
 * useSearchParams opts its subtree out of prerendering, so only the form waits
 * on the client — the page chrome and heading still render statically.
 */
export default function TrackOrderPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-manikstu-cream/40">
        <div className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
          <TrackOrderHeading />
          <Suspense fallback={null}>
            <TrackOrderForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

function TrackOrderHeading() {
  const t = useTranslations("TrackOrder");

  return (
    <>
      <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-grey">{t("intro")}</p>
    </>
  );
}
