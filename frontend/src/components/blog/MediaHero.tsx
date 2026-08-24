import Image from "next/image";

export default function MediaHero() {
  return (
    <section className="relative overflow-hidden bg-manikstu-cream pt-10 pb-20 sm:pb-28 md:pt-14 md:pb-36 lg:pb-44">
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-manikstu-green sm:text-sm">
          Our Blog
        </p>
        <h1 className="mt-1 text-3xl font-bold text-charcoal font-heading md:text-5xl">
          Media
        </h1>
        <div className="mx-auto mt-3 h-0.5 w-24 bg-gradient-to-r from-transparent via-manikstu-green to-transparent" />
        <p className="mx-auto mt-3 max-w-2xl text-grey text-sm md:text-base">
          Stay informed with our latest news, press coverage, events, and
          stories from the field.
        </p>
      </div>

      {/* Media landscape artwork banner — full aspect ratio preserved across 100% width with 0 cropping */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 left-0 right-0 w-full select-none z-0 overflow-hidden leading-none">
        <Image
          src="/media-card.png"
          alt=""
          width={1800}
          height={400}
          priority
          className="w-full h-auto block m-0 p-0"
        />
      </div>
    </section>
  );
}
