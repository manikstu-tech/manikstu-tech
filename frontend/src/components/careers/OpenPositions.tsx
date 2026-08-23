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
    <section id="open-positions" className="section-padding bg-manikstu-cream">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            Open Positions
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Join Our Growing Team
          </h2>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-manikstu-green/25 bg-white p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10">
              <Briefcase className="h-8 w-8 text-manikstu-green" />
            </div>
            <h3 className="text-lg font-semibold text-charcoal">
              No open positions at the moment
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-grey">
              We&apos;re always interested in meeting talented people who are
              passionate about rural development and sustainable agriculture.
              Check back soon or send us your resume.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
            >
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-light-grey bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="grid gap-4 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-manikstu-green/10">
                      <Briefcase className="h-6 w-6 text-manikstu-green" />
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="text-lg font-semibold text-charcoal">
                      {job.title}
                    </h3>
                    <p className="text-sm text-manikstu-green">{job.category}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-grey">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {job.type}
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
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
    </section>
  );
}
