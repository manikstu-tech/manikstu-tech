"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { ArticleDetail } from "./page";

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr.includes("T") ? dateStr.split("T")[0] : dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function ArticlePageClient({ article }: { article: ArticleDetail }) {
  const t = useTranslations("Blog");

  return (
    <>
      <Header />
      <main id="main-content">
        <article className="px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-16 md:px-8 bg-white">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
            >
              <ArrowLeft className="h-4 w-4" /> {t("backToMedia")}
            </Link>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green sm:text-sm">
              {article.category?.name || (article._source === "press" ? "Press" : "Featured")}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {formatDate(article.published_at) && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-grey">
                <Calendar className="h-4 w-4 text-manikstu-green" />
                {formatDate(article.published_at)}
              </p>
            )}

            {article.featured_image && (
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-manikstu-cream">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  width={1024}
                  height={576}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {article.content && (
              <div
                className="mt-8 text-grey leading-relaxed [&_a]:text-manikstu-green [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-manikstu-gold/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-charcoal [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-charcoal [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
