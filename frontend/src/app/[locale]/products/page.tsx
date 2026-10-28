import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import type { Product } from "./data";

const BASE_URL = "https://manikstu.com";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://127.0.0.1:8001/api");

/**
 * The catalogue as it is right now, stock included, for the first paint: never cached, so a card never shows a stale
 * "Add to Cart". Fetching it uncached renders this page per request. Capped at a few seconds so a slow backend cannot
 * hold the page up; on failure the page renders and the browser loads the catalogue itself.
 */
async function getLiveProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?page=1&limit=50`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: unknown };
    return Array.isArray(body?.data) && body.data.length > 0 ? (body.data as Product[]) : null;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Goat Farming Products, Supplements, Feed, Organic Manure | Manikstu",
  description: "Explore Manikstu Agri Solutions's range of ethically sourced goat products, supplements, feed, organic manure, and more.",
  alternates: { canonical: "https://manikstu.com/products" },
  openGraph: {
    title: "Goat Farming Products, Supplements, Feed, Organic Manure",
    description: "Ethically sourced goat products: supplements, feed, and organic manure from Manikstu Agri Solutions.",
  },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const initialProducts = await getLiveProducts();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}/products` },
          ],
        }}
      />
      <PageClient initialProducts={initialProducts} />
    </>
  );
}

