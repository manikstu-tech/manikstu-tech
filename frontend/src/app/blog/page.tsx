"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MediaHero from "@/components/blog/MediaHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/types";

type Category = "Featured" | "Event" | "Press" | "Media";

interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: Category;
  excerpt: string;
  image: string;
  featured: boolean;
}

function mapPost(post: BlogPost): Article {
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    date: post.published_at
      ? new Date(post.published_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "",
    category: (post.category?.name as Category) ?? "Featured",
    excerpt: post.excerpt ?? "",
    image: post.featured_image ?? "",
    featured: post.is_featured,
  };
}

export default function BlogPage() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((res) => setArticles(res.data.map(mapPost)))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

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
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : (
              <ArticleGrid
                articles={
                  filter === "All"
                    ? articles.filter((a) => !a.featured)
                    : filtered
                }
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
