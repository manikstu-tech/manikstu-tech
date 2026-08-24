import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/blog-data";
import { categoryColors } from "@/lib/blog-data";

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-grey">
        No articles found in this category.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/blog/${article.slug}`}>
          <article className="group h-full overflow-hidden rounded-xl border border-light-grey bg-white transition-all hover:shadow-md">
            {/* Thumbnail */}
            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-manikstu-cream p-4">
              <img
                src={article.image}
                alt={article.title}
                className="max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${categoryColors[article.category]}`}
                >
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-grey">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-charcoal font-heading group-hover:text-manikstu-green transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-grey line-clamp-2">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-manikstu-green">
                Read more
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
