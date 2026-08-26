import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeartHandshake, Leaf, Sprout, TrendingUp, type LucideIcon } from "lucide-react";

export interface CareerValue {
  icon: "impact" | "growth" | "culture" | "sustainability";
  title: string;
  description: string;
}

const iconMap: Record<CareerValue["icon"], LucideIcon> = {
  impact: Sprout,
  growth: TrendingUp,
  culture: HeartHandshake,
  sustainability: Leaf,
};

export default function WhyJoinUs({ values }: { values: CareerValue[] }) {
  const t = useTranslations("Careers");

  return (
    <section id="why-join-us" className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      {/* Top tribal floral border */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-7 bg-repeat-x opacity-60"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Left side mandala */}
      <Image
        src="/patterns/mandala-right.png"
        alt=""
        aria-hidden
        width={768}
        height={768}
        className="pointer-events-none select-none absolute -left-10 top-1/2 -translate-y-1/2 h-auto w-32 sm:w-40 md:w-52 opacity-[0.12] sm:opacity-[0.16] -scale-x-100"
      />
      {/* Right side mandala */}
      <Image
        src="/patterns/mandala-right.png"
        alt=""
        aria-hidden
        width={768}
        height={768}
        className="pointer-events-none select-none absolute -right-10 top-1/2 -translate-y-1/2 h-auto w-32 sm:w-40 md:w-52 opacity-[0.12] sm:opacity-[0.16]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("whyPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("whyTitle").split("Empower")[0]}
            <span className="text-manikstu-green">
              {t("whyTitle").split("Empower")[1]?.trim()}
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

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-grey leading-relaxed">
            {t("whyDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white/90 p-6 text-center transition-shadow hover:shadow-lg dark:bg-gray-800/90"
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

                  <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-charcoal dark:text-white group-hover:text-manikstu-green transition-colors duration-200">
                    {value.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-grey dark:text-gray-300">
                    {value.description}
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