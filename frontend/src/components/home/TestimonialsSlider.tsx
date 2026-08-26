"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const AUTOPLAY_MS = 3000;

function useVisibleCount() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const update = () => setN(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("Common");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, testimonials.length - visible);
  const safeActive = Math.min(active, maxIndex);

  const goTo = useCallback(
    (idx: number) => {
      setActive(Math.max(0, Math.min(idx, maxIndex)));
    },
    [maxIndex]
  );

  const prev = () => goTo(safeActive - 1);
  const next = () =>
    setActive((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, maxIndex]);

  const cardBasisPct = 100 / visible;
  const translatePct = safeActive * cardBasisPct;

  return (
    <div
      className="relative mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Viewport */}
      <div className="overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${translatePct}%)` }}
        >
          {testimonials.map((tItem) => (
            <div
              key={tItem.name}
              className="shrink-0 px-3"
              style={{ flexBasis: `${cardBasisPct}%` }}
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
                <p className="mt-4 text-sm text-grey italic">
                  &ldquo;{tItem.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${tItem.color} text-white text-sm font-semibold`}
                  >
                    {tItem.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      — {tItem.name}
                    </p>
                    <p className="text-xs text-grey">{tItem.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={safeActive === 0}
          aria-label={t("prevTestimonial")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-manikstu-green/30 text-manikstu-green hover:bg-manikstu-green hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-manikstu-green transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t("goToTestimonial").replace("{number}", String(i + 1))}`}
              className={`h-2 rounded-full transition-all ${
                i === safeActive
                  ? "w-6 bg-manikstu-green"
                  : "w-2 bg-manikstu-green/30 hover:bg-manikstu-green/50"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={safeActive === maxIndex}
          aria-label={t("nextTestimonial")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-manikstu-green/30 text-manikstu-green hover:bg-manikstu-green hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-manikstu-green transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
