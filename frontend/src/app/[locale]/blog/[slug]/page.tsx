import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import PageClient from "./PageClient";
import type { BlogPost, PressRelease } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://localhost:8000/api");

export type ArticleDetail = (BlogPost | PressRelease) & { _source: "blog" | "press" };

async function getArticle(slug: string): Promise<ArticleDetail | null> {
  const clean = decodeURIComponent(slug).trim();
  for (const source of ["blog", "press"] as const) {
    try {
      const res = await fetch(`${API_BASE_URL}/${source}/${clean}`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = await res.json();
        const item = json?.data;
        if (item && item.is_published !== false) return { ...item, _source: source };
      }
    } catch {
      // Try the next source.
    }
  }
  return null;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/blog?page=1`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? [])
      .filter((p: BlogPost) => p?.slug)
      .map((p: BlogPost) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const description =
    article.excerpt || article.content?.replace(/<[^>]*>/g, "").slice(0, 160) || article.title;

  return {
    title: article.title,
    description,
    alternates: { canonical: `https://manikstu.com/blog/${article.slug}` },
    openGraph: {
      title: `${article.title} | Manikstu Agri Solutions`,
      description,
      images: article.featured_image ? [article.featured_image] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Manikstu Agri Solutions`,
      description,
      images: article.featured_image ? [article.featured_image] : [],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://manikstu.com" },
            { "@type": "ListItem", position: 2, name: "Media", item: "https://manikstu.com/blog" },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: `https://manikstu.com/blog/${article.slug}`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt || "",
          image: article.featured_image || "",
          datePublished: article.published_at || "",
          author: { "@type": "Organization", name: "Manikstu Agro" },
        }}
      />
      <PageClient article={article} />
    </>
  );
}

