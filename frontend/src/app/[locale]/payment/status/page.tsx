"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { clearCart } from "../../products/cart";

type View = "checking" | "paid" | "pending" | "failed";

function StatusInner() {
  const params = useSearchParams();
  const order = params.get("order");
  const [view, setView] = useState<View>("checking");

  useEffect(() => {
    if (!order) {
      setView("failed");
      return;
    }
    let cancelled = false;

    // The webhook can arrive a few seconds after the redirect, so ask a few times.
    const check = async (attempt: number) => {
      try {
        const res = await fetch(`/api/backend/orders/${encodeURIComponent(order)}/payment-status`, {
          method: "POST",
          headers: { Accept: "application/json" },
        });
        const json = await res.json().catch(() => null);
        const status = json?.data?.payment_status;
        const cf = json?.data?.cashfree_status;
        if (cancelled) return;

        if (status === "paid") {
          clearCart();
          setView("paid");
          return;
        }
               if (cf === "EXPIRED" || cf === "TERMINATED" || cf === "AMOUNT_MISMATCH" || cf === "ATTEMPT_FAILED") {
          setView("failed");
          return;
        }
        if (attempt < 5) {
          setTimeout(() => check(attempt + 1), 3000);
        } else {
          setView("pending");
        }
      } catch {
        if (!cancelled) setView("pending");
      }
    };

    check(1);
    return () => {
      cancelled = true;
    };
  }, [order]);

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
      {view === "checking" && (
        <>
          <Clock className="mx-auto h-14 w-14 text-grey" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">Checking your payment...</h1>
          <p className="mt-2 text-grey">Please do not close this page.</p>
        </>
      )}
      {view === "paid" && (
        <>
          <CheckCircle2 className="mx-auto h-14 w-14 text-manikstu-green" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">Payment received</h1>
          <p className="mt-2 text-grey">Thank you! Your order {order} is confirmed.</p>
          <Link
            href={`/products/track?order=${encodeURIComponent(order ?? "")}`}
            className="mt-4 inline-block text-sm font-semibold text-manikstu-green underline"
          >
            Track this order
          </Link>
        </>
      )}
      {view === "pending" && (
        <>
          <Clock className="mx-auto h-14 w-14 text-manikstu-gold" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">Payment not confirmed yet</h1>
          <p className="mt-2 text-grey">
            If money was deducted, it will be confirmed shortly. Keep your order number: {order}.
          </p>
        </>
      )}
      {view === "failed" && (
        <>
          <XCircle className="mx-auto h-14 w-14 text-manikstu-red" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">Payment was not completed</h1>
          <p className="mt-2 text-grey">No money was taken, or it will be refunded. You can try again.</p>
          <Link
            href="/products/checkout"
            className="mt-6 inline-flex rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white"
          >
            Back to checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-manikstu-cream/40 px-4 py-16">
        <Suspense fallback={null}>
          <StatusInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}