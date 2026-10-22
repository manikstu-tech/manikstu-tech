import type { Metadata } from "next";
import PageClient from "./PageClient";
import JsonLd from "@/components/seo/JsonLd";
import { FALLBACK_PRODUCTS, type Product } from "../data";
import { setRequestLocale } from "next-intl/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://127.0.0.1:8001/api");

export function generateStaticParams() {
  return FALLBACK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

type ProductData = {
  data: {
    name?: string;
    description?: string;
    longDescription?: string;
    slug?: string;
    image?: string;
    price?: number;
    category?: { name?: string };
    rating?: number;
    ratingCount?: number;
    inStock?: boolean;
    sku?: string;
  };
};

async function getProduct(slug: string): Promise<ProductData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/**
 * The product as it is right now, stock included, for the first paint: never cached, so a shopper never sees a
 * stale "In stock". Fetching it uncached renders this page per request. Capped at a few seconds so a slow backend
 * cannot hold the page up; on failure the page renders and the browser loads the product itself.
 */
async function getLiveProduct(slug: string): Promise<ProductData["data"] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as ProductData;
    return body?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product?.data) {
    return { title: "Product Not Found" };
  }

  const p = product.data;
  const title = p.name || "Product";
  const description =
    p.description?.slice(0, 160) ||
    `${p.name}, available at Manikstu Agri Solutions. ${p.category?.name ? `Category: ${p.category.name}.` : ""}`;

  return {
    title,
    description,
    alternates: { canonical: `https://manikstu.com/products/${slug}` },
    openGraph: {
      title: `${title} | Manikstu Agri Solutions`,
      description,
      images: p.image ? [p.image] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Manikstu Agri Solutions`,
      description,
      images: p.image ? [p.image] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const live = await getLiveProduct(slug);
  // Structured data from the live product when there is one, so search engines see real availability too.
  const p = live ?? (await getProduct(slug))?.data;

  return (
    <>
      {p && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description || p.longDescription || "",
            image: p.image || "",
                url: `https://manikstu.com/products/${slug}`,
            sku: p.sku || "",
            brand: { "@type": "Brand", name: "Manikstu Agri Solutions" },
            ...(p.category?.name && {
              category: p.category.name,
            }),
            ...(p.price != null && {
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: p.price,
                availability: p.inStock
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            url: `https://manikstu.com/products/${slug}`,
              },
            }),
            ...(p.rating != null && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: p.rating,
                reviewCount: p.ratingCount || 1,
              },
            }),
          }}
        />
      )}
      <PageClient initialProduct={live as Product | null} />
    </>
  );
}

