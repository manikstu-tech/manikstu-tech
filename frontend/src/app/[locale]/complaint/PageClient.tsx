"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitComplaint } from "@/lib/api";

const CATEGORIES = ["order", "product", "delivery", "payment", "service", "other"] as const;

const FIELD =
  "w-full rounded-lg border border-light-grey px-4 py-2.5 text-sm focus:border-manikstu-green focus:outline-none";
const LABEL = "mb-1.5 block text-sm font-semibold text-charcoal";

export default function ComplaintPage() {
  const t = useTranslations("Complaint");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    order_number: "",
    category: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitComplaint({
        name: form.name,
        phone: form.phone,
        // Optional fields are omitted rather than sent empty, so the backend
        // stores null instead of "".
        email: form.email || undefined,
        city: form.city || undefined,
        order_number: form.order_number || undefined,
        category: form.category || undefined,
        description: form.description,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" className="bg-manikstu-cream/40">
        <div className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-grey">{t("intro")}</p>

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-manikstu-gold/25 bg-white p-8 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-14 w-14 text-manikstu-green" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-charcoal">
                {t("successTitle")}
              </h2>
              <p className="mt-3 text-grey">{t("successDesc")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4 rounded-2xl border border-manikstu-gold/25 bg-white p-6 shadow-sm sm:p-8"
            >
              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-sm font-semibold text-manikstu-red"
                >
                  {t("error")}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={LABEL}>{t("name")}</label>
                  <input id="name" name="name" value={form.name} onChange={change} required className={FIELD} />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL}>{t("phone")}</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} required className={FIELD} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL}>{t("email")}</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={change} className={FIELD} />
                </div>
                <div>
                  <label htmlFor="city" className={LABEL}>{t("city")}</label>
                  <input id="city" name="city" value={form.city} onChange={change} className={FIELD} />
                </div>
              </div>

              <div>
                <label htmlFor="order_number" className={LABEL}>{t("orderNumber")}</label>
                <input id="order_number" name="order_number" value={form.order_number} onChange={change} className={FIELD} />
                <p className="mt-1 text-xs text-grey">{t("orderNumberHelp")}</p>
              </div>

              <div>
                <label htmlFor="category" className={LABEL}>{t("category")}</label>
                <select id="category" name="category" value={form.category} onChange={change} className={FIELD}>
                  <option value="">{t("categoryPlaceholder")}</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{t(`categories.${c}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className={LABEL}>{t("description")}</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={change}
                  required
                  className={FIELD}
                />
                <p className="mt-1 text-xs text-grey">{t("descriptionHelp")}</p>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "submitting" ? t("submitting") : t("submit")}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
