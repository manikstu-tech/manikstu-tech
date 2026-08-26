import Link from "next/link";
import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function HelpPage() {
  const t = useTranslations("Help");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-manikstu-cream pt-24 pb-12">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("pill")}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-grey">
              {t("heroDesc")}
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("faqTitle")}</h2>
            <div className="mt-6 divide-y divide-light-grey">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-heading text-base font-bold text-charcoal">{faq.q}</h3>
                  <p className="mt-2 text-sm text-grey leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("stillNeedHelp")}</h2>
            <p className="mt-3 text-grey">{t("stillNeedHelpDesc")}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> {t("contactUs")}
              </Link>
              <a
                href="mailto:contact@manikstu.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" /> {t("emailUs")}
              </a>
              <a
                href="tel:+918270331856"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> {t("callUs")}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}