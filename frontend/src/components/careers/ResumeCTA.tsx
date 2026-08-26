import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Lightbulb, Sprout, TrendingUp, Users } from "lucide-react";

export default function ResumeCTA() {
  const t = useTranslations("Careers");

  const pillars = [
    {
      icon: Sprout,
      title: t("resumePillar1Title"),
      subtitle: t("resumePillar1Sub"),
    },
    {
      icon: Lightbulb,
      title: t("resumePillar2Title"),
      subtitle: t("resumePillar2Sub"),
    },
    {
      icon: Users,
      title: t("resumePillar3Title"),
      subtitle: t("resumePillar3Sub"),
    },
    {
      icon: TrendingUp,
      title: t("resumePillar4Title"),
      subtitle: t("resumePillar4Sub"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF4EB] dark:bg-gray-900 pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 px-4 sm:px-6 md:px-8">
      {/* Top-left quarter mandala */}
      <Image
        src="/patterns/mandala-top-right.png"
        alt=""
        aria-hidden
        width={768}
        height={768}
        className="pointer-events-none select-none absolute left-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18] dark:opacity-[0.10] -scale-x-100"
      />

      {/* Right circular mandala watermark */}
      <Image
        src="/patterns/mandala-right.png"
        alt=""
        aria-hidden
        width={768}
        height={768}
        className="pointer-events-none select-none absolute -right-10 top-1/2 -translate-y-1/2 h-auto w-32 sm:w-40 md:w-52 opacity-[0.12] sm:opacity-[0.16] dark:opacity-[0.10]"
      />

      {/* Bottom village panoramic scene banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-3 sm:-bottom-5 md:-bottom-7 z-0 flex justify-between overflow-hidden select-none opacity-45 dark:opacity-25"
      >
        <Image
          src="/patterns/village-figures.png"
          alt=""
          width={1920}
          height={300}
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none -scale-x-100 object-contain object-left"
        />
        <Image
          src="/patterns/village-figures.png"
          alt=""
          width={1920}
          height={300}
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none object-contain object-right"
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center z-10">
        {/* Ornamental pill heading */}
        <div className="flex items-center justify-center gap-2">
          <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
            {t("resumePill")}
          </p>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
        </div>

        <h2 className="mx-auto mt-3 max-w-3xl font-heading text-xl font-bold leading-tight text-charcoal sm:text-2xl lg:text-3xl dark:text-white">
          {t("resumeTitle").split("Always")[0]}
          <span className="text-manikstu-green">
            {t("resumeTitle").split("Always")[1]?.trim()}
          </span>
        </h2>

        {/* Ornamental Divider with Framed Diamond */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
          <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
          <div aria-hidden className="relative flex items-center justify-center">
            <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
            <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          </div>
          <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
          <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
        </div>

        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-grey dark:text-gray-300 leading-relaxed">
          {t("resumeDesc")}
        </p>

        {/* Solid green CTA button */}
        <div className="mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-manikstu-leaf hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
          >
            {t("sendResume")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Feature Pillars with Dashed Rings */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group flex flex-col items-center text-center p-2 rounded-xl transition-transform hover:-translate-y-0.5"
              >
                {/* Circular badge with gold dashed ring */}
                <div className="relative mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-manikstu-green/20 dark:bg-gray-800">
                  <Icon className="h-5 w-5 text-manikstu-green transition-transform group-hover:scale-110" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[-4px] rounded-full border border-dashed border-manikstu-gold/70"
                  />
                </div>
                <h3 className="font-heading text-xs sm:text-sm font-bold text-charcoal dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-[11px] text-grey dark:text-gray-400">
                  {pillar.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}