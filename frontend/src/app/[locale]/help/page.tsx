import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function HelpPage() {
  const t = useTranslations("Help");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-manikstu-cream pt-24 pb-16">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
            {/* Pill eyebrow — centered */}
            <div className="flex items-center justify-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                {t("pill")}
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mx-auto mt-3 font-heading text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              How Can We{" "}
              <span className="text-manikstu-green">Help?</span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grey sm:text-base">
              {t("heroDesc")}
            </p>
          </div>

          {/* Bottom tribal border — decorative line art, faded in from the left */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
            }}
          />
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-charcoal">{t("faqTitle")}</h2>
            <div className="mt-6 divide-y divide-light-grey">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-heading text-base font-bold text-charcoal">{faq.q}</h3>
                  <p className="mt-2 text-sm text-grey leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help — Our Reach design language */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#23581D] via-manikstu-green to-[#1F4E1A] py-5 text-white md:py-6">
          {/* Top tribal floral border — white line art */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert -scale-y-100"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />

          {/* Left & Right Mandala line art — white */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert"
          >
            <Image
              src="/patterns/mandala-left.png"
              alt=""
              width={320}
              height={576}
              className="h-auto w-20 sm:w-28 md:w-32 max-h-[90%] object-contain object-left"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none opacity-15 brightness-0 invert"
          >
            <Image
              src="/patterns/mandala-right.png"
              alt=""
              width={320}
              height={576}
              className="h-auto w-20 sm:w-28 md:w-32 max-h-[90%] object-contain object-right"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="text-center">
              {/* Pill eyebrow */}
              <div className="flex items-center justify-center gap-2.5">
                <span aria-hidden className="h-px w-8 sm:w-12 bg-manikstu-gold/80" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-gold">
                  {t("stillNeedHelp")}
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-8 sm:w-12 bg-manikstu-gold/80" />
              </div>

              {/* Heading */}
              <h2 className="mx-auto mt-2 max-w-3xl font-heading text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                Our Team Is{" "}
                <span className="text-manikstu-gold">Here to Help</span>
              </h2>

              {/* Framed diamond divider */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-12 sm:w-16 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-3 w-3 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1 w-1 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-12 sm:w-16 bg-manikstu-gold/70" />
              </div>

              <p className="mx-auto mt-2 max-w-2xl text-xs text-white/85 sm:text-sm">
                {t("stillNeedHelpDesc")}
              </p>
            </div>

            {/* Contact cards grid (same treatment as stat cards) */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: t("contactUs"),
                  value: "Send a message",
                  href: "/contact",
                  isExternal: false,
                },
                {
                  icon: Mail,
                  label: t("emailUs"),
                  value: "contact@manikstu.com",
                  href: "mailto:contact@manikstu.com",
                  isExternal: true,
                },
                {
                  icon: Phone,
                  label: t("callUs"),
                  value: "+91 8270331856",
                  href: "tel:+918270331856",
                  isExternal: true,
                },
              ].map(({ icon: Icon, label, value, href, isExternal }) => {
                const cls =
                  "group relative flex flex-col items-center justify-center rounded-lg border border-white/20 bg-white/[0.08] px-3 py-2.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.14] hover:shadow-lg";
                const inner = (
                  <>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/30 bg-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/60">
                      <Icon className="h-3.5 w-3.5 stroke-[1.75]" />
                    </div>
                    <p className="mt-1.5 font-heading text-sm font-bold text-white group-hover:text-manikstu-gold transition-colors duration-300 md:text-base">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-white/85">
                      {value}
                    </p>
                  </>
                );
                return isExternal ? (
                  <a key={label} href={href} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link key={label} href={href} className={cls}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom tribal floral border — white line art */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-5 sm:h-6 bg-repeat-x opacity-60 brightness-0 invert"
            style={{
              backgroundImage: "url('/patterns/tribal-floral-border-seamless.png')",
              backgroundSize: "auto 100%",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}