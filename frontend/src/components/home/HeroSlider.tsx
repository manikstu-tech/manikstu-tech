"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface HeroSliderProps {
  images: string[];
  alt?: string;
  intervalMs?: number;
  firstSlideOverlay?: ReactNode;
}

export default function HeroSlider({
  images,
  alt = "",
  intervalMs = 4000,
  firstSlideOverlay,
}: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [nonce, setNonce] = useState(0);

  // Auto slide
  useEffect(() => {
    if (images.length <= 1) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, nonce]);

  // Preload other slides so there is no flash
  useEffect(() => {
    images.slice(1).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  const goTo = (idx: number) => {
    setActive(idx);
    setNonce((n) => n + 1); // restart timer
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`${images[active]}-${active}`}
        src={images[active]}
        alt={alt}
        className="animate-gallery-fade absolute inset-0 h-full w-full object-cover"
      />

      {/* Watch Our Story only on slide 1 */}
      {active === 0 && firstSlideOverlay}

      {/* Dots */}
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
                (i === active ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/85")
              }
            />
          ))}
        </div>
      )}
    </>
  );
}