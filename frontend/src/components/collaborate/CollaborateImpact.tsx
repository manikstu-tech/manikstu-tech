import Image from "next/image";
import { Building2, MapPin, Shield, Users, type LucideIcon } from "lucide-react";

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

const fallbackStats: Stat[] = [
  {
    value: "50+",
    label: "Partner Organizations",
    icon: Building2,
  },
  {
    value: "700+",
    label: "Villages Reached",
    icon: MapPin,
  },
  {
    value: "10,000+",
    label: "Farmers Engaged",
    icon: Users,
  },
  {
    value: "3+",
    label: "States Covered",
    icon: Shield,
  },
];

export default function CollaborateImpact({ stats: propStats }: { stats?: Stat[] }) {
  const stats = propStats?.length ? propStats : fallbackStats;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#23581D] via-manikstu-green to-[#1F4E1A] py-12 text-white md:py-16">
      {/* Top tribal floral border — white line art */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert -scale-y-100"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Left & Right Mandala line art — white */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert">
        <Image
          src="/patterns/mandala-left.png"
          alt=""
          width={320}
          height={576}
          className="h-auto w-32 sm:w-44 md:w-52 max-h-[90%] object-contain object-left"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert">
        <Image
          src="/patterns/mandala-right.png"
          alt=""
          width={320}
          height={576}
          className="h-auto w-32 sm:w-44 md:w-52 max-h-[90%] object-contain object-right"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          {/* Top Pill / Badge */}
          <div className="flex items-center justify-center gap-2.5">
            <span aria-hidden className="h-px w-8 sm:w-12 bg-manikstu-gold/80" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-gold">
              Our Network
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-8 sm:w-12 bg-manikstu-gold/80" />
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Collaboration That <span className="text-manikstu-gold">Reaches</span> Across
            <br className="hidden sm:inline" /> the Heartland
          </h2>

          {/* Ornamental Divider with Framed Diamond */}
          <div className="mt-3.5 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-12 sm:w-16 bg-manikstu-gold/70" />
            <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
            <div aria-hidden className="relative flex items-center justify-center">
              <span className="h-3 w-3 rotate-45 border border-manikstu-gold bg-transparent" />
              <span className="absolute h-1 w-1 rotate-45 bg-manikstu-gold" />
            </div>
            <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
            <span aria-hidden className="h-px w-12 sm:w-16 bg-manikstu-gold/70" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/[0.08] px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/[0.14] hover:shadow-lg"
              >
                {/* White line art icon container */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/60">
                  <Icon className="h-5 w-5 stroke-[1.75]" />
                </div>
                <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl group-hover:text-manikstu-gold transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-white/90">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom tribal floral border — white line art */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert"
        style={{
          backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
          backgroundSize: "auto 100%",
        }}
      />
    </section>
  );
}
