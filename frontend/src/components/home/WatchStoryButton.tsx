"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

interface WatchStoryButtonProps {
  /** YouTube video id, e.g. "eurGt7tXTFw" */
  videoId: string;
  /** Top label ("Watch") — first line */
  topLabel: string;
  /** Bottom label ("Our Story") — second line */
  bottomLabel: string;
}

/**
 * "Watch Our Story" pill button on the home hero. Opens a centered popup
 * with the YouTube video embedded via iframe; closes on backdrop click,
 * the × button, or the Escape key.
 */
export default function WatchStoryButton({
  videoId,
  topLabel,
  bottomLabel,
}: WatchStoryButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${topLabel} ${bottomLabel}`}
        className="group absolute top-3 right-3 sm:top-auto sm:bottom-4 sm:right-4 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white/95 sm:bg-white/90 backdrop-blur-sm px-2.5 py-1.5 sm:px-4 sm:py-3 shadow-md sm:shadow-lg border border-manikstu-gold/20 sm:border-transparent z-10 text-left transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
      >
        <span className="relative flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center">
          {/* Expanding ring pulse */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-manikstu-green/70 animate-ping motion-reduce:animate-none"
          />
          {/* Solid green disc with the play icon; gently scales in and out */}
          <span
            aria-hidden
            className="relative flex h-full w-full items-center justify-center rounded-full bg-manikstu-green text-white shadow-md group-hover:scale-110 transition-transform animate-[watch-pulse_2s_ease-in-out_infinite] motion-reduce:animate-none"
          >
            <Play className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 fill-current" />
          </span>
        </span>
        <span>
          <span className="block text-[10px] sm:text-xs font-semibold leading-tight text-charcoal">
            {topLabel}
          </span>
          <span className="block text-[9px] sm:text-xs leading-tight text-grey">
            {bottomLabel}
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Manikstu story video"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* Video card */}
          <div className="relative z-10 w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md transition-colors hover:bg-white hover:text-manikstu-red focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Manikstu story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
