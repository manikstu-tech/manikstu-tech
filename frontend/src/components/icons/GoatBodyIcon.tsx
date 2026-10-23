import type { SVGProps } from "react";

/**
 * Full-body goat icon (side profile), rendered from a transparent PNG so it
 * drops in wherever a lucide-style icon is used. Accepts the same className
 * for sizing; `object-contain` keeps its portrait aspect ratio inside a
 * square icon box.
 */
export default function GoatBodyIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/goat-body-icon.png"
      alt=""
      aria-hidden
      className={`object-contain scale-125 ${className ?? ""}`}
    />
  );
}
