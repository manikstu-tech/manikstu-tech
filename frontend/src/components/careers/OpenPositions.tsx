import Image from "next/image";
import Link from "next/link";
import { Briefcase, ChevronRight, MapPin, Clock } from "lucide-react";

export interface JobOpening {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  description: string;
  postedDate?: string;
}

export default function OpenPositions({ jobs }: { jobs: JobOpening[] }) {
  return (
    <section id="open-positions" className="relative overflow-hidden bg-manikstu-cream py-16 sm:py-20 md:py-24">
      {/* Top tribal border */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-7 bg-repeat-x opacity-70"
        style={{
          backgroundImage: "url('/patterns/tribal-border.png')",
          backgroundSize: "auto 100%",
        }}
      />
      {/* Bottom tribal border (flipped) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
        style={{
          backgroundImage: "url('/patterns/tribal-border.png')",
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
        className="pointer-events-none select-none absolute left-0 top-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18]"
      />
      {/* Top-right mandala corner (mirrored) */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={1370}
        height={1155}
        className="pointer-events-none select-none absolute right-0 top-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              Current Openings
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Join Our{" "}
            <span className="text-manikstu-green">Growing Team</span>
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
            Explore career opportunities to drive technological innovation and
            sustainable livelihoods in rural heartlands.
          </p>
        </div>

        <div className="mt-12">
          {jobs.length === 0 ? (
            <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-manikstu-green/30 bg-white/95 p-10 text-center shadow-sm">
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10 ring-1 ring-manikstu-green/20">
                <Briefcase className="h-8 w-8 text-manikstu-green" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-dashed border-manikstu-gold/60"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal">
                No active openings at this exact moment
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-grey">
                We&apos;re always eager to meet driven minds passionate about rural
                transformation and agritech. Send us your resume to be considered
                for upcoming opportunities.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Contact Our Team <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative overflow-hidden rounded-2xl border border-light-grey bg-white/95 p-6 shadow-sm transition-all hover:border-manikstu-green/50 hover:shadow-md"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-manikstu-green/10 text-manikstu-green">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="md:col-span-6">
                      <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-manikstu-green transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm font-medium text-manikstu-green">{job.category}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-grey">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-manikstu-green" /> {job.location}
                        </span>
                        <span aria-hidden>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-manikstu-green" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-sm text-grey line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex justify-end md:col-span-1">
                      <Link
                        href={`/careers/${job.id}`}
                        aria-label={`View details for ${job.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-all hover:bg-manikstu-green hover:text-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
