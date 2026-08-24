import Image from "next/image";

export default function MediaHero() {
  return (
    <section className="relative overflow-hidden bg-manikstu-cream pt-10 pb-16 sm:pb-20 md:pt-12 md:pb-28 lg:pb-32">
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4">
        {/* Top ornamental label with gold lines and diamonds */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span aria-hidden className="h-px w-8 sm:w-16 bg-manikstu-gold/60" />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold flex-shrink-0" />
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
            OUR BLOG
          </p>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold flex-shrink-0" />
          <span aria-hidden className="h-px w-8 sm:w-16 bg-manikstu-gold/60" />
        </div>

        {/* Two-tone main heading */}
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-charcoal">
          Latest <span className="text-manikstu-green">Media & Stories</span>
        </h1>

        {/* Center ornamental diamond divider */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span aria-hidden className="h-px w-10 sm:w-16 bg-manikstu-gold/60" />
          <span aria-hidden className="flex items-center justify-center h-3 w-3 rotate-45 border border-manikstu-gold bg-manikstu-cream">
            <span className="h-1 w-1 bg-manikstu-gold" />
          </span>
          <span aria-hidden className="h-px w-10 sm:w-16 bg-manikstu-gold/60" />
        </div>

        {/* Subtext */}
        <p className="mt-3 max-w-2xl mx-auto text-grey text-sm sm:text-base leading-relaxed">
          Stay informed with our latest news, press coverage, events, and
          stories from the field.
        </p>
      </div>

      {/* Media landscape artwork banner */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 left-0 right-0 w-full select-none z-0 overflow-hidden leading-none">
        <Image
          src="/media-card.png"
          alt=""
          width={1800}
          height={400}
          priority
          className="w-full h-auto block m-0 p-0 opacity-60"
        />
      </div>
    </section>
  );
}
