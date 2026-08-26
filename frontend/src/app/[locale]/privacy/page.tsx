import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

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
      </main>
      <Footer />
    </>
  );
}