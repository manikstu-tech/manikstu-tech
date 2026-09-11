import type { Metadata } from "next";
import PageClient from "./PageClient";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://manikstu.com";

export const metadata: Metadata = {
  title: "Goat Farming News, Press & Media | Manikstu Agro",
  description: "Latest news, articles, and media from Manikstu Agro, insights on goat farming, agriculture, and rural development.",
  openGraph: {
    title: "Goat Farming News, Press & Media",
    description: "Latest news and media coverage from Manikstu Agro on goat farming and rural development.",
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
            { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale}/blog` },
          ],
        }}
      />
      <PageClient />
    </>
  );
}
