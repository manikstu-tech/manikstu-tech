import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <>
      <Header />
      <main id="main-content" className="section-padding bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            {t("title")}
          </h1>
          <div className="mt-2 text-sm text-grey">{t("lastUpdated")}</div>
          <div className="mt-8 space-y-6 leading-relaxed text-grey">
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
      </main>
      <Footer />
    </>
  );
}