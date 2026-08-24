import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Article } from "@/app/blog/data";
import { categoryColors } from "@/app/blog/data";

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group overflow-hidden rounded-xl border border-light-grey bg-white shadow-sm transition-all hover:shadow-md">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative flex h-64 items-center justify-center overflow-hidden bg-manikstu-cream p-6 md:h-full">
            <img
              src={article.image}
              alt={article.title}
              className="max-h-56 max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <span
              className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryColors[article.category]}`}
            >
              {article.category}
            </span>
            <h2 className="text-2xl font-bold text-charcoal font-heading group-hover:text-manikstu-green transition-colors">
              {article.title}
            </h2>
            <p className="mt-3 text-sm text-grey leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-grey">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
