import Link from "next/link";
import { ArrowUp, Leaf } from "lucide-react";

export default function ResumeCTA() {
  return (
    <section className="relative overflow-hidden bg-manikstu-green py-16 text-white md:py-20">
      {/* Subtle leaf line-art — top left */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 text-white opacity-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M100 180 C60 140 40 100 60 60 C80 20 140 20 160 60 C180 100 140 140 100 180 Z" />
        <path d="M100 180 V60" />
        <path d="M100 120 C80 110 70 95 75 80" />
        <path d="M100 100 C120 90 130 75 125 60" />
      </svg>

      {/* Subtle leaf line-art — bottom right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rotate-180 text-white opacity-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M100 180 C60 140 40 100 60 60 C80 20 140 20 160 60 C180 100 140 140 100 180 Z" />
        <path d="M100 180 V60" />
        <path d="M100 120 C80 110 70 95 75 80" />
        <path d="M100 100 C120 90 130 75 125 60" />
      </svg>

      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-gold">
          Don&apos;t See the Right Role?
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
          We&apos;re Always Looking for Passionate People
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          If you believe in our mission of empowering rural India and don&apos;t
          see a role that fits, we&apos;d still love to hear from you.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-cream focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-manikstu-green"
        >
          Send Us Your Resume <ArrowUp className="h-4 w-4" />
        </Link>

        {/* Small cultural divider */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-white/30" />
          <Leaf className="h-4 w-4 text-manikstu-gold" />
          <span className="h-px w-12 bg-white/30" />
        </div>
      </div>
    </section>
  );
}
