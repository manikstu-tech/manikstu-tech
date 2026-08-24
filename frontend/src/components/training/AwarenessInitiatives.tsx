import { HeartPulse, Megaphone, Radio, Wheat, type LucideIcon } from "lucide-react";

export interface AwarenessInitiative {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  imageScale?: string;
}

const initiatives: AwarenessInitiative[] = [
  {
    icon: Megaphone,
    title: "Community Awareness Drives",
    description:
      "Village-level campaigns on nutrition, hygiene and the value of improved livestock practices.",
    image: "/patterns/awareness-community-drives.png",
  },
  {
    icon: HeartPulse,
    title: "Veterinary Health Camps",
    description:
      "Periodic camps for vaccination, deworming and early diagnosis in partnership with local vets.",
    image: "/patterns/awareness-vet-camps.png",
  },
  {
    icon: Wheat,
    title: "Demo Plots & Field Days",
    description:
      "Live demonstrations of fodder, feeding and housing models farmers can adapt on their own land.",
    image: "/patterns/awareness-demo-plots.png",
  },
  {
    icon: Radio,
    title: "Rural Radio & IVRS Advisories",
    description:
      "Timely, localized advisories on weather, disease outbreaks and best practices in native dialects.",
    image: "/patterns/awareness-radio-ivrs.png",
  },
];

export default function AwarenessInitiatives() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              Awareness Initiatives
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Reaching Every{" "}
            <span className="text-manikstu-green">Village &amp; Household</span>
          </h2>

          {/* Ornamental divider */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            Awareness is the foundation of adoption. We meet communities through
            the channels they already trust.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-manikstu-cream/30 p-5 pb-20 transition-shadow hover:shadow-lg"
              >
                {/* Inner dashed border */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
                />

                {/* Bottom tribal art */}
                {item.image && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-no-repeat opacity-90"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                      backgroundSize: item.imageScale ?? "cover",
                      backgroundPosition: "center bottom",
                    }}
                  />
                )}

                <div className="relative text-center">
                  {/* Icon with dashed decorative ring */}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                    <Icon className="h-6 w-6 text-manikstu-green" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-saura-red/50"
                    />
                  </div>

                  <h3 className="mt-6 font-heading text-base font-bold leading-snug text-charcoal">
                    {item.title}
                  </h3>

                  {/* Line-diamond-line ornament */}
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                    <span aria-hidden className="h-px w-6 bg-manikstu-gold" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-grey">
                    {item.description}
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
