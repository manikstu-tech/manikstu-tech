import Image from "next/image";
import { Camera, MapPin } from "lucide-react";
import type { GalleryPhoto } from "@/app/blog/data";

export default function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section id="gallery" className="section-padding bg-white scroll-mt-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          {/* Ornamental pill heading */}
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              Gallery
            </p>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Moments from the{" "}
            <span className="text-manikstu-green">Field</span>
          </h2>

          {/* Ornamental divider */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
            Photos from villages, farms and community events across our
            programs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <figure
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-light-grey bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-manikstu-cream">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-manikstu-green shadow-sm">
                  <Camera className="h-3 w-3" />
                  Photo
                </span>
              </div>
              <figcaption className="px-4 py-4">
                <h3 className="text-sm font-semibold text-charcoal line-clamp-2">
                  {photo.title}
                </h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-grey">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-manikstu-green" />
                    {photo.location}
                  </span>
                  <span aria-hidden>•</span>
                  <span>{photo.date}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
