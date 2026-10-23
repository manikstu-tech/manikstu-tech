"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  src: string | undefined | null;
  /** Shown when `src` is empty or fails to load (e.g. a deleted CMS upload). */
  fallbackSrc?: string;
};

/**
 * next/image with a graceful fallback. If the source is missing or 404s
 * (common when a CMS image was uploaded then deleted on the server), it
 * swaps to a branded placeholder instead of rendering a broken-image icon.
 */
export default function FallbackImage({ src, fallbackSrc = "/og-image.png", alt, ...rest }: Props) {
  const initial = src && String(src).trim() ? String(src) : fallbackSrc;
  const [current, setCurrent] = useState(initial);
  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
