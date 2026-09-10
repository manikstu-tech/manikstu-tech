"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Camera, MapPin, ChevronDown, ChevronUp, Maximize2, X, Calendar } from "lucide-react";
import type { GalleryPhoto } from "@/lib/blog-data";

const INITIAL_COUNT = 4;

export default function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  const t = useTranslations("Blog");
  const [expanded, setExpanded] = useState(false);
  // Photo shown full-size in the lightbox, or null when closed.
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);
  const hasMore = photos.length > INITIAL_COUNT;
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);

  // Close the lightbox on Escape and lock body scroll while open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="scroll-mt-6 section-padding bg-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("galleryPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("galleryTitle").split("Field")[0]}
            <span className="text-manikstu-green">
              {t("galleryTitle").split("Field")[1]?.trim()}
            </span>
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

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            {t("galleryDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightbox(photo)}
              style={{ animationDelay: `${(i % INITIAL_COUNT) * 60}ms` }}
              className="animate-gallery-fade group relative block w-full overflow-hidden rounded-2xl border border-manikstu-gold/20 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-manikstu-green/40 hover:shadow-[0_14px_32px_rgba(74,140,63,0.16)] focus:outline-none focus:ring-2 focus:ring-manikstu-green"
            >
              {/* Thumbnail (matches the video card size/shape) */}
              <div className="relative aspect-video w-full bg-manikstu-cream">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  loading="eager"
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* PHOTO badge */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-manikstu-green shadow-sm">
                  <Camera className="h-3 w-3" />
                  {t("photoBadge")}
                </span>
                {/* Hover expand icon */}
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>

              {/* Caption below — gentle cream tint + gold accent */}
              <div className="relative bg-gradient-to-b from-white to-[#FBF6EC] px-4 py-4">
                {/* thin gold divider between image and caption */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-manikstu-gold/40 to-transparent" />
                <h3 className="line-clamp-2 text-sm font-semibold text-charcoal transition-colors group-hover:text-manikstu-green">
                  {photo.title}
                </h3>
                {/* gold underline that grows on hover */}
                <span className="mt-2 block h-0.5 w-8 rounded-full bg-manikstu-gold transition-all duration-300 group-hover:w-14" />
                <div className="mt-2.5 flex items-center gap-3 text-xs text-grey">
                  {photo.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-manikstu-green" />
                      {photo.location}
                    </span>
                  )}
                  {photo.date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-manikstu-green" />
                      {photo.date}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Expand / collapse toggle */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
            >
              {expanded ? (
                <>
                  {t("showLess")} <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  {t("viewAllPhotos")} ({photos.length}){" "}
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative max-h-[80vh] w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
            {(lightbox.title || lightbox.date) && (
              <div className="mt-3 text-center">
                {lightbox.title && (
                  <p className="text-sm font-medium text-white/90">{lightbox.title}</p>
                )}
                {lightbox.date && (
                  <p className="mt-0.5 text-xs text-white/60">{lightbox.date}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}