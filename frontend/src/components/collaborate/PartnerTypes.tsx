import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Banknote,
  Building2,
  HeartHandshake,
  Landmark,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface PartnerType {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function PartnerTypes({ partners: propPartners }: { partners?: PartnerType[] }) {
  const t = useTranslations("Collaborate");

  const fallbackPartners: PartnerType[] = [
    {
      icon: Users,
      title: t("partner1Title"),
      description: t("partner1Desc"),
    },
    {
      icon: Building2,
      title: t("partner2Title"),
      description: t("partner2Desc"),
    },
    {
      icon: HeartHandshake,
      title: t("partner3Title"),
      description: t("partner3Desc"),
    },
    {
      icon: Landmark,
      title: t("partner4Title"),
      description: t("partner4Desc"),
    },
    {
      icon: Truck,
      title: t("partner5Title"),
      description: t("partner5Desc"),
    },
    {
      icon: Banknote,
      title: t("partner6Title"),
      description: t("partner6Desc"),
    },
  ];

  const partners = propPartners?.length ? propPartners : fallbackPartners;
  return (
    <section className="relative section-padding bg-manikstu-cream overflow-hidden">
      {/* Top tribal-floral border */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-8 bg-repeat-x -scale-y-100"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />
      {/* Top-left mandala corner */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={1370}
        height={1155}
        className="pointer-events-none select-none absolute left-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18]"
      />
      {/* Top-right mandala corner (mirrored) */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={1370}
        height={1155}
        className="pointer-events-none select-none absolute right-0 top-0 h-auto w-48 sm:w-64 md:w-80 lg:w-96 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
      />
      {/* Bottom-left tree + goat silhouette */}
      <Image
        src="/patterns/training-bottom-left.png"
        alt=""
        aria-hidden
        width={1536}
        height={1024}
        className="pointer-events-none select-none absolute left-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-20 sm:opacity-25"
      />
      {/* Bottom-right woman + hut + tree silhouette */}
      <Image
        src="/patterns/training-bottom-right.png"
        alt=""
        aria-hidden
        width={1802}
        height={900}
        className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-28 sm:w-36 md:w-48 lg:w-64 opacity-20 sm:opacity-25"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              {t("partnerPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("partnerTitle")}
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

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            {t("partnerDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/30 p-6 transition-shadow hover:shadow-lg"
              >
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                />

                <div className="relative text-center">
                  {/* Icon with dashed decorative ring */}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Icon className="h-6 w-6 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="mt-6 font-heading text-lg italic font-bold leading-snug text-manikstu-leaf">
                    {partner.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-grey">
                    {partner.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}