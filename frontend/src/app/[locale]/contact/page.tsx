"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    type: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", city: "", state: "", type: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          background={null}
        >
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("pill")}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-lg text-grey">
              {t("heroDesc")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-light-grey bg-manikstu-cream/50 p-4">
              <Phone className="h-5 w-5 text-manikstu-green" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{t("callUs")}</p>
                <p className="text-sm text-grey">+91 8270331856</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-light-grey bg-manikstu-cream/50 p-4">
              <Mail className="h-5 w-5 text-manikstu-green" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{t("emailUs")}</p>
                <p className="text-sm text-grey">contact@manikstu.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-light-grey bg-manikstu-cream/50 p-4">
              <MapPin className="h-5 w-5 text-manikstu-green" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{t("visitUs")}</p>
                <p className="text-sm text-grey">Bhubaneswar, Odisha, India</p>
              </div>
            </div>
          </div>
        </PageHero>

        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10">
                    <Send className="h-7 w-7 text-manikstu-green" />
                  </div>
                  <h2 className="mt-6 font-heading text-2xl font-bold text-charcoal">
                    {t("successTitle")}
                  </h2>
                  <p className="mt-3 text-grey">
                    {t("successDesc")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors"
                  >
                    {t("sendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal">
                        {t("fullName")}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                        {t("email")}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
                        {t("phone")}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-charcoal">
                        {t("enquiryType")}
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      >
                        <option value="">{t("selectType")}</option>
                        <option value="general">{t("general")}</option>
                        <option value="partnership">{t("partnership")}</option>
                        <option value="training">{t("training")}</option>
                        <option value="careers">{t("careers")}</option>
                        <option value="support">{t("support")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-charcoal">
                        {t("city")}
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-charcoal">
                        {t("state")}
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={form.state}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-manikstu-red">
                      {tCommon("error")}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? tCommon("sending") : t("sendMessage")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}