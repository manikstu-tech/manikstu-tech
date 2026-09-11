"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PlayCircle, Clock, Calendar, X, ChevronDown, ChevronUp } from "lucide-react";
import type { VideoItem } from "@/lib/blog-data";

const INITIAL_COUNT = 4;

export default function VideosSection({ videos }: { videos: VideoItem[] }) {
  const t = useTranslations("Blog");
  // Currently playing YouTube video (id) shown in the popup, or null when closed.
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  // Show only the first row until "View all videos" is clicked.
  const [expanded, setExpanded] = useState(false);
  const hasMore = videos.length > INITIAL_COUNT;
  const visible = expanded ? videos : videos.slice(0, INITIAL_COUNT);

  // Close on Escape and lock body scroll while the popup is open.
  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeVideo]);

  return (
    <section
      id="videos"
      className="scroll-mt-6 relative overflow-hidden bg-manikstu-cream section-padding"
    >
      {/* Top tribal border (matches home page Our Network) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-7 bg-repeat-x opacity-70"
        style={{
          backgroundImage: "url('/patterns/tribal-border.png')",
          backgroundSize: "auto 100%",
        }}
      />
      {/* Bottom tribal border (flipped) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
        style={{
          backgroundImage: "url('/patterns/tribal-border.png')",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Top-left mandala corner */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={1370}
        height={1155}
        className="pointer-events-none select-none absolute left-0 top-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18]"
      />
      {/* Top-right mandala corner (mirrored) */}
      <Image
        src="/patterns/mandala-corner-top.png"
        alt=""
        aria-hidden
        width={1370}
        height={1155}
        className="pointer-events-none select-none absolute right-0 top-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("videosPill")}
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("videosTitle").split("Motion")[0]}
            <span className="text-manikstu-green">
              {t("videosTitle").split("Motion")[1]?.trim()}
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
            {t("videosDesc")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((video, i) =>
            video.isFile ? (
              // Uploaded video file, inline HTML5 player
              <figure
                key={video.id}
                style={{ animationDelay: `${(i % INITIAL_COUNT) * 60}ms` }}
                className="animate-gallery-fade group relative overflow-hidden rounded-xl border border-light-grey bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video w-full bg-charcoal">
                  <video
                    src={video.url}
                    controls
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                </div>
                {(video.title || video.date) && (
                  <figcaption className="px-4 py-4">
                    {video.title && (
                      <h3 className="text-sm font-semibold text-charcoal line-clamp-2">
                        {video.title}
                      </h3>
                    )}
                    {video.date && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-grey">
                        <Calendar className="h-3 w-3 text-manikstu-green" />
                        {video.date}
                      </div>
                    )}
                  </figcaption>
                )}
              </figure>
            ) : video.youtubeId ? (
              // YouTube video, opens in a popup player on click
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video)}
                style={{ animationDelay: `${(i % INITIAL_COUNT) * 60}ms` }}
                className="animate-gallery-fade group relative overflow-hidden rounded-xl border border-light-grey bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-manikstu-green"
              >
                <div className="relative aspect-video w-full bg-charcoal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                  {/* Dark overlay + YouTube-style play button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/25 transition-colors group-hover:bg-charcoal/40">
                    <span className="flex h-6 w-9 items-center justify-center rounded-md bg-[#FF0000] text-white shadow-lg transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-manikstu-green transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.date && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-grey">
                      <Calendar className="h-3 w-3 text-manikstu-green" />
                      {video.date}
                    </div>
                  )}
                </div>
              </button>
            ) : (
              <Link
                key={video.id}
                href={video.url}
                style={{ animationDelay: `${(i % INITIAL_COUNT) * 60}ms` }}
                className="animate-gallery-fade group relative overflow-hidden rounded-xl border border-light-grey bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-manikstu-green"
              >
                <div className="relative aspect-video w-full bg-charcoal/5">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                  {/* Dark overlay + play button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20 transition-colors group-hover:bg-charcoal/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-manikstu-green shadow-md transition-transform group-hover:scale-110">
                      <PlayCircle className="h-8 w-8" />
                    </span>
                  </div>
                  {/* Duration chip */}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-charcoal/80 px-2 py-1 text-[10px] font-semibold text-white">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-manikstu-green transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-xs text-grey line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-grey">
                    <Calendar className="h-3 w-3 text-manikstu-green" />
                    {video.date}
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        {/* View all / show less toggle */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green bg-white px-6 py-3 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
            >
              {expanded ? (
                <>Show less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>View all videos ({videos.length}) <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Popup player */}
      {activeVideo?.youtubeId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {activeVideo.title && (
              <p className="mt-3 text-center text-sm font-medium text-white/90 line-clamp-2">
                {activeVideo.title}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}