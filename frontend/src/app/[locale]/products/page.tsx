import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://manikstu.com";

export const metadata: Metadata = {
  title: "Goat Farming Products — Supplements, Feed, Organic Manure | Manikstu",
  description: "Explore Manikstu Agro's range of ethically sourced goat products — supplements, feed, organic manure, and more.",
  openGraph: {
    title: "Goat Farming Products — Supplements, Feed, Organic Manure",
    description: "Ethically sourced goat products: supplements, feed, and organic manure from Manikstu Agro.",
  },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}/${locale}/products` },
          ],
        }}
      />
      <PageClient />
    </>
  );
}
