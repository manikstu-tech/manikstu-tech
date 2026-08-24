import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Radio, Sparkles } from "lucide-react";

export default function MediaHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top-right mandala corner artwork */}
      <Image
        src="/patterns/mandala-top-right-corner.png"
        alt=""
        aria-hidden
        width={504}
        height={560}
        className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.10] sm:opacity-[0.14] dark:opacity-[0.18]"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-6 sm:pt-12 sm:pb-8 md:pt-14 md:pb-10 lg:pt-16 lg:pb-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Media &amp; Stories
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              Amplifying Voices.
              <br />
              <span className="text-manikstu-green">
                Sharing Rural Impact.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              Stay informed with our latest news, press coverage, field stories,
              and groundbreaking milestones transforming rural livestock
              livelihoods across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#stories"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Explore Stories <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/get-in-touch"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Press Inquiries
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Sparkles className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                Authentic voices and real transformations from the heartland
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
              {/* Media landscape artwork backdrop */}
              <Image
                src="/media-card.png"
                alt="Rural landscape"
                fill
                priority
                className="object-cover object-bottom opacity-75"
              />

              {/* Gradient overlay for depth and contrast */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
                <Newspaper className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  Grassroots Coverage
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Radio className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
