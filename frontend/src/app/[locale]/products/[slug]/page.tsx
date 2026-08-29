import type { Metadata } from "next";
import PageClient from "./PageClient";
import JsonLd from "@/components/seo/JsonLd";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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
    `${p.name} — available at Manikstu Agro. ${p.category?.name ? `Category: ${p.category.name}.` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Manikstu Agro`,
      description,
      images: p.image ? [p.image] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Manikstu Agro`,
      description,
      images: p.image ? [p.image] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const p = product?.data;

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
            url: `https://manikstu.com/en/products/${slug}`,
            sku: p.sku || "",
            brand: { "@type": "Brand", name: "Manikstu Agro" },
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
                url: `https://manikstu.com/en/products/${slug}`,
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
      <PageClient />
    </>
  );
}
