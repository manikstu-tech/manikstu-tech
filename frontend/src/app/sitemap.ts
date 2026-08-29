import type { MetadataRoute } from "next";

const BASE_URL = "https://manikstu.com";
const locales = [
  "en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "or", "ja", "de", "fr", "es",
];

const routes = [
  "",
  "/about",
  "/services",
  "/products",
  "/contact",
  "/careers",
  "/collaborate",
  "/collaborate/ajah",
  "/training",
  "/blog",
  "/help",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${route}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${BASE_URL}/${loc}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
