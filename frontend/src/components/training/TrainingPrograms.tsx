import Image from "next/image";
import {
  Banknote,
  GraduationCap,
  Sparkles,
  Sprout,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface TrainingProgram {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

const programs: TrainingProgram[] = [
  {
    icon: GraduationCap,
    title: "Farmer Field Training",
    description:
      "Hands-on training at our model farms on scientific goat rearing, balanced feeding, breeding and herd health.",
    image: "/patterns/training-farmer-field.png",
  },
  {
    icon: Users,
    title: "FPO & SHG Capacity Building",
    description:
      "Strengthening Farmer Producer Organizations and self-help groups with governance, aggregation and collective marketing.",
  },
  {
    icon: Stethoscope,
    title: "Veterinary & Animal Health Awareness",
    description:
      "Community vet camps and awareness drives on vaccination, disease prevention and timely treatment.",
  },
  {
    icon: Sprout,
    title: "Sustainable & Regenerative Farming",
    description:
      "Fodder cultivation, water stewardship and low-emission practices for resilient rural livelihoods.",
  },
  {
    icon: Sparkles,
    title: "Women & Youth Empowerment",
    description:
      "Skill development and entrepreneurship pathways for women and rural youth in the livestock economy.",
  },
  {
    icon: Banknote,
    title: "Goat Bank & Livelihood Training",
    description:
      "Training on our Goat Bank model that builds assets, diversifies income and de-risks rural livelihoods.",
  },
];

export default function TrainingPrograms() {
  return (
    <section id="programs" className="relative section-padding bg-manikstu-cream overflow-hidden">
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
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              What We Do
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Programs That Build{" "}
            <span className="text-manikstu-green">Confidence &amp; Capability</span>
          </h2>

          {/* Ornamental divider */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            From the field to the federation, our training programs meet farmers
            where they are and grow with them.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="relative overflow-hidden rounded-xl border border-light-grey bg-white p-6 pb-24 transition-shadow hover:shadow-md"
              >
                {program.image && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-no-repeat bg-bottom opacity-80"
                    style={{
                      backgroundImage: `url('${program.image}')`,
                      backgroundSize: "100% auto",
                    }}
                  />
                )}
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-manikstu-green/10">
                    <Icon className="h-5 w-5 text-manikstu-green" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-charcoal">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey">
                    {program.description}
                  </p>
                  <div className="mt-4 h-0.5 w-8 rounded bg-manikstu-green/60" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
