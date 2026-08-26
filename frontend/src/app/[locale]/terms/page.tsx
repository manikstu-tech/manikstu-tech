import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero — matches Help Center design */}
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
              Terms &amp;{" "}
              <span className="text-manikstu-green">Conditions</span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grey sm:text-base">
              The rules that govern your use of our website and services.
              Please read them carefully.
            </p>
          </div>

          {/* Bottom tribal border — decorative line art, faded in from the left */}
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
              <p>{t("intro")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("acceptanceTitle")}</h2>
              <p>{t("acceptanceText")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("ipTitle")}</h2>
              <p>{t("ipText")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("liabilityTitle")}</h2>
              <p>{t("liabilityText")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("accuracyTitle")}</h2>
              <p>{t("accuracyText")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("linksTitle")}</h2>
              <p>{t("linksText")}</p>
              <h2 className="font-heading text-xl font-bold text-charcoal">{t("governingTitle")}</h2>
              <p>{t("governingText")}</p>
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
