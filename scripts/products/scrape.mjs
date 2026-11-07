// Reads each product page on manikstu.com and writes src/data/productDetails.json
// Usage: node scripts/products/scrape.mjs
import { readFileSync, writeFileSync } from "node:fs"

const SITE = "https://manikstu.com"
const source = readFileSync("src/constants/products.ts", "utf8")
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1])

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")

const between = (lines, start, ends) => {
  const i = lines.findIndex((l) => l === start)
  if (i < 0) return []
  const out = []
  for (let j = i + 1; j < lines.length; j++) {
    if (ends.includes(lines[j])) break
    out.push(lines[j])
  }
  return out
}

const details = {}
for (const slug of slugs) {
  const res = await fetch(`${SITE}/products/${slug}`)
  if (!res.ok) throw new Error(`${slug}: ${res.status}`)
  const html = await res.text()
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
  const lines = decode(body.replace(/<[^>]+>/g, "\n"))
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  // Numbered shots (1.png, 2.png) or named ones (goat-feed-main.png); the main shot comes first
  const images = [
    ...new Set([...html.matchAll(new RegExp(String.raw`/products/${slug}/[\w-]+\.(?:png|jpg|webp)`, "g"))].map((m) => m[0])),
  ].sort((a, b) => Number(b.includes("main")) - Number(a.includes("main")) || a.localeCompare(b))
  const video = html.match(/img\.youtube\.com\/vi\/([\w-]+)\//)?.[1] ?? null

  const specLines = between(lines, "Product Specifications", ["Composition", "Storage & handling", "Product Description"])
  // A spec can have an empty value, so split on the known labels rather than pairing lines
  const LABELS = ["Form", "Packaging Type", "Grade Standard", "Shelf Life", "Type Of Supplement", "Packaging", "Country of Origin"]
  const specs = []
  for (const line of specLines) {
    if (LABELS.includes(line)) specs.push([line, ""])
    else if (specs.length) specs.at(-1)[1] = line
  }

  const desc = between(lines, "Product Description", ["Ratings & Reviews"])
  const group = (label, ends) => {
    const i = desc.findIndex((l) => l.startsWith(label))
    if (i < 0) return []
    const out = []
    for (let j = i + 1; j < desc.length; j++) {
      if (ends.some((e) => desc[j].startsWith(e))) break
      out.push(desc[j])
    }
    return out
  }
  const stops = ["Key Features", "Recommended For", "Dosage", "Usage", "Benefits"]
  details[slug] = {
    why: between(lines, "Why farmers choose it", ["Quality Assured"]),
    specs,
    composition: between(lines, "Composition", ["Storage & handling", "Product Description"]).join(" "),
    storage: between(lines, "Storage & handling", ["Product Description"]).join(" "),
    description: desc.slice(0, desc.findIndex((l) => stops.some((s) => l.startsWith(s))) >>> 0 || 1),
    features: group("Key Features", stops.filter((s) => s !== "Key Features")),
    recommended: group("Recommended For", stops.filter((s) => s !== "Recommended For")),
    dosage: group("Dosage", ["Ratings"]),
    images,
    video,
  }
  console.log(slug, images.length, details[slug].specs.length, details[slug].features.length, details[slug].recommended.length, details[slug].dosage.length, video)
}
writeFileSync("src/data/productDetails.json", JSON.stringify(details, null, 2) + "\n")
