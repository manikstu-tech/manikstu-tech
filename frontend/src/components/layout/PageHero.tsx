import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  /**
   * Absolute-positioned decorative background rendered before the content
   * container. Pass `null` to disable. If omitted, defaults to the standard
   * top-right mandala corner used across all page heroes.
   */
  background?: ReactNode | null;
  /**
   * Optional element(s) rendered inside the <section> AFTER the grid — e.g.
   * a bottom SauraBorder overlay.
   */
  afterGrid?: ReactNode;
  /**
   * The two hero columns. Left = copy, Right = visual panel. Any additional
   * className overrides on the outer <section>.
   */
  children: ReactNode;
  className?: string;
};

/**
 * Master hero layout used by every top-level page (Home, About, Media,
 * Collaborate, Training, Careers). Enforces identical section height,
 * padding, gap and vertical alignment across the entire site.
 *
 * Do NOT re-implement these outer tokens per page. Any future adjustment to
 * hero sizing / spacing should happen here.
 */
export default function PageHero({
  background,
  afterGrid,
  children,
  className,
}: PageHeroProps) {
  const defaultBackground = (
    <Image
      src="/patterns/mandala-top-right-corner.png"
      alt=""
      aria-hidden
      width={504}
      height={560}
      className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.10] sm:opacity-[0.14] dark:opacity-[0.18]"
    />
  );

  return (
    <section
      className={`relative overflow-hidden bg-white ${className ?? ""}`.trim()}
    >
      {background === undefined ? defaultBackground : background}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {children}
        </div>
      </div>
      {afterGrid}
    </section>
  );
}
