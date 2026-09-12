"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { ProductImage } from "@/lib/admin/types";

export default function ProductGallery({ images, name, size }: { images: ProductImage[]; name: string; size: string | null }) {
  const usable = images.filter((img) => img.url);
  const [active, setActive] = useState(0);
  const current = usable[active];

  return (
    <div>
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[#FAF6EC]">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.url!} alt={name} className="h-full w-full object-contain" />
        ) : (
          <span className="flex flex-col items-center gap-2 text-sm text-grey">
            <ImageOff className="h-8 w-8" />
            No images
          </span>
        )}
        {current && size && (
          <span className="absolute bottom-3 left-3 rounded-lg border border-[#E8E2D6] bg-white px-2.5 py-1 text-xs font-bold text-manikstu-leaf">
            {size}
          </span>
        )}
      </div>
      {usable.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2.5">
          {usable.map((img, i) => (
            <button
              key={img.path}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-[#FAF6EC] ${i === active ? "border-manikstu-green" : "border-[#EDE9E1]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url!} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
