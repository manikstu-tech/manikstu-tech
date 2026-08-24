import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Clock, Calendar } from "lucide-react";
import type { VideoItem } from "@/app/blog/data";

export default function VideosSection({ videos }: { videos: VideoItem[] }) {
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
              Videos
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Stories in{" "}
            <span className="text-manikstu-green">Motion</span>
          </h2>

          {/* Ornamental divider */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            Short films and field interviews that let farmers speak for
            themselves.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={video.url}
              className="group relative overflow-hidden rounded-xl border border-light-grey bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-manikstu-green"
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
          ))}
        </div>
      </div>
    </section>
  );
}
