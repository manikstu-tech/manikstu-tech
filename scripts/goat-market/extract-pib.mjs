// Step 1: download the PIB annexure and save its table exactly as printed (raw layer, no cleaning).
// Run: node scripts/goat-market/extract-pib.mjs
import { mkdir, readFile, writeFile } from "node:fs/promises"

const sources = JSON.parse(await readFile("data/goat-market/sources.json", "utf8")).sources
const source = sources["lc20-pib-annexure"]

const response = await fetch(source.url, { headers: { "User-Agent": "Mozilla/5.0" } })
if (!response.ok) throw new Error(`PIB returned ${response.status}`)
const html = await response.text()

const decode = (text) =>
  text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;| /g, " ")
    .replace(/\s+/g, " ")
    .trim()

const rows = []
for (const [, row] of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
  const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => decode(m[1]))
  // Data rows: serial number, state, cattle, buffalo, sheep, goat. The total row has an empty serial number.
  if (cells.length === 6 && (/^\d+$/.test(cells[0]) || cells[1] === "Total")) {
    rows.push({ serial: cells[0], state: cells[1], cattle: cells[2], buffalo: cells[3], sheep: cells[4], goat: cells[5] })
  }
}
// The page carries the same table twice (screen and print copies). Keep one, and make sure the copies agree.
const unique = new Map()
for (const row of rows) {
  const seen = unique.get(row.state)
  if (seen && JSON.stringify(seen) !== JSON.stringify(row)) throw new Error(`The two copies of the table disagree for ${row.state}`)
  unique.set(row.state, row)
}
rows.length = 0
rows.push(...unique.values())
if (rows.length !== 37) throw new Error(`Expected 36 states/UTs plus a total row, found ${rows.length}`)

await mkdir("data/goat-market/raw", { recursive: true })
await writeFile(
  "data/goat-market/raw/lc20-pib-annexure.json",
  JSON.stringify({ sourceId: "lc20-pib-annexure", url: source.url, unit: "animals (actual numbers, Indian digit grouping as printed)", rows }, null, 2) + "\n",
)
console.log(`Saved ${rows.length} rows to data/goat-market/raw/lc20-pib-annexure.json`)
