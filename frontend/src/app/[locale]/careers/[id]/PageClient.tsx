"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { JobDetail } from "./page";

export default function JobPageClient({ job }: { job: JobDetail }) {
  const t = useTranslations("Careers");

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-16 md:px-8 bg-white">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
            >
              <ArrowLeft className="h-4 w-4" /> {t("backToCareers")}
            </Link>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              {job.category || t("openPosition")}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {job.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-grey">
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-manikstu-green" /> {job.location}
                </span>
              )}
              {job.type && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-manikstu-green" /> {job.type}
                </span>
              )}
            </div>

            {job.description && (
              <p className="mt-6 text-grey leading-relaxed">{job.description}</p>
            )}

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-manikstu-leaf"
            >
              {t("applyNow")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
