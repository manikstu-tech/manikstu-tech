"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MediaHero from "@/components/blog/MediaHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { articles, type Category } from "./data";

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

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            {/* Category filter */}
            <div className="mb-10">
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
