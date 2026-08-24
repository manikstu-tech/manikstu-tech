"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MediaHero from "@/components/blog/MediaHero";
import GallerySection from "@/components/blog/GallerySection";
import VideosSection from "@/components/blog/VideosSection";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import {
  articles,
  galleryPhotos,
  videos,
  type Category,
} from "./data";

export default function BlogPage() {
  const [filter, setFilter] = useState<"All" | Category>("All");

  const filtered =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  const featured = articles.find((a) => a.featured);

  return (
    <>
      <Header />
      <main id="main-content">
        <MediaHero />

        {/* Gallery — first section down */}
        <GallerySection photos={galleryPhotos} />

        {/* Videos — second section */}
        <VideosSection videos={videos} />

        {/* Articles — third section */}
        <section
          id="articles"
          className="section-padding bg-white scroll-mt-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold"
                />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  Articles
                </p>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold"
                />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                Latest{" "}
                <span className="text-manikstu-green">
                  Press &amp; News
                </span>
              </h2>

              {/* Ornamental divider */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold"
                />
                <span aria-hidden className="h-px w-16 bg-manikstu-gold/60" />
              </div>

              <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed">
                In-depth reads, event recaps and press coverage — filter by
                category or browse the featured piece.
              </p>
            </div>

            {/* Category filter */}
            <div className="mt-10 mb-8">
              <CategoryFilter active={filter} onFilter={setFilter} />
            </div>

            {/* Featured article — only on "All" */}
            {filter === "All" && featured && (
              <div className="mb-10">
                <FeaturedArticle article={featured} />
              </div>
            )}

            {/* Article grid */}
            <ArticleGrid
              articles={
                filter === "All"
                  ? articles.filter((a) => !a.featured)
                  : filtered
              }
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
