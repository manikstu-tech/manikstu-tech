import type { MetadataRoute } from "next"
import { PRODUCTS } from "@/constants/products"
import { POSTS } from "@/constants/resources"
import { SITE_URL } from "@/constants/site"
import { SOLUTION_PAGES } from "@/constants/solutions"

// Every public page. The cart and the API are left out on purpose.
const PAGES = [
  "/",
  "/partners",
  "/investors",
  "/join",
  "/our-network",
  "/recognition",
  "/supply-distribution",
  "/franchise",
  "/fpo",
  "/teams",
  "/products",
  "/resources",
  "/blogs",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/projects/ajah",
  "/projects/aangan-lakshmi",
  "/projects/sujalam-suphalam",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...PAGES,
    ...PRODUCTS.map(({ slug }) => `/products/${slug}`),
    ...SOLUTION_PAGES.map(({ slug }) => `/solutions/${slug}`),
    ...POSTS.flatMap(({ slug }) => (slug ? [`/blogs/${slug}`] : [])),
  ]
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }))
}
