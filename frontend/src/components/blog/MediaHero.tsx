import Link from "next/link";
import { ArrowRight, Newspaper, Radio, Camera } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

export default function MediaHero() {
  return (
    <PageHero>
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Media
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              News, Stories
              <br />
              <span className="text-manikstu-green">
                & Voices from the Field.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              Stay informed with our latest press coverage, events and stories
              from Manikstu&apos;s work across rural India — told through the
              people, farms and communities we serve.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Explore Latest <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#press"
                className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
              >
                Press Coverage
              </Link>
            </div>

            {/* Micro-statement */}
            <div className="mt-8 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-manikstu-green/10">
                <Newspaper className="h-3.5 w-3.5 text-manikstu-green" />
              </span>
              <p className="text-sm text-grey">
                Fresh stories every week from villages across India
              </p>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
              {/* Media / broadcast line-art illustration */}
              <svg
                aria-hidden="true"
                viewBox="0 0 480 360"
                className="pointer-events-none absolute inset-0 h-full w-full"
                fill="none"
                stroke="#4A8C3F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Ground line */}
                <path d="M40 300 H440" opacity="0.35" />
                {/* Central open newspaper */}
                <path d="M180 210 L240 195 L300 210 L300 290 L240 275 L180 290 Z" fill="#4A8C3F" fillOpacity="0.08" />
                <path d="M240 195 V275" />
                <path d="M195 225 H230" opacity="0.5" />
                <path d="M195 240 H230" opacity="0.5" />
                <path d="M195 255 H230" opacity="0.5" />
                <path d="M250 225 H285" opacity="0.5" />
                <path d="M250 240 H285" opacity="0.5" />
                <path d="M250 255 H285" opacity="0.5" />
                {/* Broadcast tower (right) */}
                <path d="M400 300 L390 200 L410 200 L400 300 Z" />
                <path d="M390 240 H410" opacity="0.5" />
                <path d="M395 220 H405" opacity="0.5" />
                {/* Signal waves from tower */}
                <path d="M370 190 Q400 165 430 190" opacity="0.5" strokeDasharray="4 6" />
                <path d="M355 175 Q400 140 445 175" opacity="0.35" strokeDasharray="4 6" />
                {/* Camera icon (left) */}
                <rect x="70" y="205" width="60" height="42" rx="4" fill="#4A8C3F" fillOpacity="0.10" />
                <circle cx="100" cy="226" r="12" />
                <circle cx="100" cy="226" r="5" fill="#C4952A" fillOpacity="0.6" stroke="none" />
                <rect x="115" y="200" width="10" height="6" rx="1" />
                {/* Small leaves */}
                <path d="M90 120 C100 105 120 100 130 110 C120 125 100 130 90 120 Z" fill="#4A8C3F" fillOpacity="0.15" />
                <path d="M370 100 C380 85 400 80 410 90 C400 105 380 110 370 100 Z" fill="#C4952A" fillOpacity="0.2" />
              </svg>

              {/* Corner accent */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm">
                <Radio className="h-4 w-4 text-manikstu-green" />
                <span className="text-xs font-semibold text-charcoal">
                  Stories that travel far
                </span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-4 -right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-manikstu-green shadow-md md:flex">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </div>
    </PageHero>
  );
}
