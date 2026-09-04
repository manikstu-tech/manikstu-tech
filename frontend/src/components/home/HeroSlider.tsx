"use client";

import { useEffect, useState } from "react";

interface HeroSliderProps {
  images: string[];
  alt?: string;
  intervalMs?: number;
}

/**
 * Autoplaying image slideshow used in the Home page hero card.
 * Cycles through `images` every `intervalMs` (default 4s), with a
 * subtle crossfade via the shared `.animate-gallery-fade` keyframe.
 * Skips autoplay when the user prefers reduced motion.
 */
export default function HeroSlider({
  images,
  alt = "",
  intervalMs = 4000,
}: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
      setNonce((n) => n + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, nonce]);

  const goTo = (idx: number) => {
    setActive(idx);
    setNonce((n) => n + 1);
  };

  if (images.length === 0) return null;

  const current = images[active];

  return (
    <>
      {/* Full-bleed main image with fade animation on each swap */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`${current}-${active}`}
        src={current}
        alt={alt}
        className="animate-gallery-fade absolute inset-0 h-full w-full object-cover"
      />

      {/* Slide indicator dots — clickable */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === active
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/85")
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
