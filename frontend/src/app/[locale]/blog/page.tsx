"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MediaHero from "@/components/blog/MediaHero";
import GallerySection from "@/components/blog/GallerySection";
import VideosSection from "@/components/blog/VideosSection";
import CategoryFilter from "@/components/blog/CategoryFilter";
import ArticleGrid from "@/components/blog/ArticleGrid";
import {
  articles as fallbackArticles,
  galleryPhotos as fallbackGallery,
  videos,
  categoryColorMap,
  type Category,
  type Article,
  type GalleryPhoto,
} from "@/lib/blog-data";
import { getBlogPosts, getPressReleases, getGallery } from "@/lib/api";

export default function BlogPage() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [allArticles, setAllArticles] = useState<Article[]>(fallbackArticles);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(fallbackGallery);

  useEffect(() => {
    // Fetch blog posts + press releases, normalize into unified Article shape
    Promise.all([getBlogPosts(), getPressReleases()]).then(([blog, press]) => {
      const blogArticles: Article[] = (blog.data || []).map((p) => ({
        id: String(p.id),
        title: p.title,
        slug: p.slug,
        date: p.published_at || "",
        category: (p.category?.name || "Featured") as Category,
        excerpt: p.excerpt || "",
        image: p.featured_image || "",
        featured: p.is_featured,
        type: "blog" as const,
      }));

      const pressArticles: Article[] = (press.data || []).map((p) => ({
        id: String(p.id),
        title: p.title,
        slug: p.slug,
        date: p.published_at || "",
        category: (p.category?.name || "Press") as Category,
        excerpt: p.excerpt || "",
        image: p.featured_image || "",
        featured: false,
        type: "press" as const,
      }));

      const merged = [...blogArticles, ...pressArticles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (merged.length) setAllArticles(merged);
    }).catch(() => {});

    // Fetch gallery — normalize API shape → GalleryPhoto shape
    getGallery().then((res) => {
      if (res.data?.length) {
        const mapped: GalleryPhoto[] = res.data.map((g) => ({
          id: String(g.id),
          title: g.caption || "",
          location: "",
          date: "",
          image: g.image,
        }));
        setGalleryPhotos(mapped);
      }
    }).catch(() => {});
  }, []);

  const filtered =
    filter === "All" ? allArticles : allArticles.filter((a) => a.category === filter);

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

              {/* Ornamental Divider with Framed Diamond */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
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

            {/* Article grid — featured article included inline, no special banner */}
            <ArticleGrid articles={filtered} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
