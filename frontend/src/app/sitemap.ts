import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://manikstu.com";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.manikstu.com/api";

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
  "/help",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = [...routes, ...(await detailPaths())];
  return all.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
  }));
}

// Article slugs + job IDs, best-effort: never fail the sitemap build.
async function detailPaths(): Promise<string[]> {
  try {
    const [blogRes, careersRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/blog?page=1`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE_URL}/careers`, { next: { revalidate: 3600 } }),
    ]);
    const paths: string[] = [];
    if (blogRes.status === "fulfilled" && blogRes.value.ok) {
      const blog = await blogRes.value.json();
      for (const p of blog.data ?? []) {
        if (p?.slug) paths.push(`/blog/${p.slug}`);
      }
    }
    if (careersRes.status === "fulfilled" && careersRes.value.ok) {
      const careers = await careersRes.value.json();
      for (const j of careers.data ?? []) {
        if (j?.id != null) paths.push(`/careers/${j.id}`);
      }
    }
    return paths;
  } catch {
    return [];
  }
}
