"use client";

import { useTranslations } from "next-intl";
import type { Category } from "@/lib/blog-data";

const categories: ("All" | Category)[] = [
  "All",
  "Featured",
  "Event",
  "Press",
  "Media",
];

export default function CategoryFilter({
  active,
  onFilter,
}: {
  active: "All" | Category;
  onFilter: (cat: "All" | Category) => void;
}) {
  const t = useTranslations("Blog");

  const categoryLabels: Record<string, string> = {
    All: t("categories.all"),
    Featured: t("categories.featured"),
    Event: t("categories.event"),
    Press: t("categories.press"),
    Media: t("categories.media"),
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilter(cat)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            active === cat
              ? "bg-manikstu-green text-white"
              : "border border-light-grey bg-white text-charcoal hover:border-manikstu-green hover:text-manikstu-green"
          }`}
        >
          {categoryLabels[cat] || cat}
        </button>
      ))}
    </div>
  );
}