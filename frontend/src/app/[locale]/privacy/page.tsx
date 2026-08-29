import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Manikstu Agro collects, uses, and protects your personal information. Read our complete privacy policy.",
};

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-manikstu-cream pt-24 pb-16">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
            <div className="flex items-center justify-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Legal
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mx-auto mt-3 font-heading text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Privacy{" "}
              <span className="text-manikstu-green">Policy</span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grey sm:text-base">
              How we collect, use and protect your personal information when
              you interact with Manikstu Agro.
            </p>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
            }}
          />
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-sm text-grey">{t("lastUpdated")}</div>
            <div className="mt-6 space-y-6 leading-relaxed text-grey">
            <p>
              {t("intro")}
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("collectTitle")}</h2>
            <p>{t("collectText")}</p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("useTitle")}</h2>
            <p>{t("useText")}</p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("securityTitle")}</h2>
            <p>{t("securityText")}</p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("thirdPartyTitle")}</h2>
            <p>{t("thirdPartyText")}</p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("changesTitle")}</h2>
            <p>{t("changesText")}</p>
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("contactTitle")}</h2>
            <p>{t("contactText")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
