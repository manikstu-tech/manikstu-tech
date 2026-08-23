"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const trackLeft = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - track.offsetLeft - trackLeft);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      });
      setActive(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(testimonials.length - 1, active + 1));

  return (
    <div className="relative mt-8">
      {/* Track */}
      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="snap-start shrink-0 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
          >
            <div className="h-full rounded-xl bg-manikstu-cream p-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-manikstu-gold text-manikstu-gold"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-grey italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-white text-sm font-semibold`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">— {t.name}</p>
                  <p className="text-xs text-grey">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-manikstu-green/30 text-manikstu-green hover:bg-manikstu-green hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-manikstu-green transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-manikstu-green"
                  : "w-2 bg-manikstu-green/30 hover:bg-manikstu-green/50"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={active === testimonials.length - 1}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-manikstu-green/30 text-manikstu-green hover:bg-manikstu-green hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-manikstu-green transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
