import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://manikstu.com";

// English-only site: single-locale sitemap, bare (unprefixed) URLs.
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
  "/partners",
  "/help",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
  }));
}
