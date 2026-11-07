// Step 3: refuse to ship a dataset that does not check out. Exits with an error on the first failure.
// Run: node scripts/goat-market/validate.mjs
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const dataset = JSON.parse(await readFile("src/data/goatMarket.json", "utf8"))
const raw = JSON.parse(await readFile("data/goat-market/raw/lc20-pib-annexure.json", "utf8"))
const mapSource = await readFile("src/constants/indiaMap.ts", "utf8")
const mapNames = [...mapSource.matchAll(/^\s{4}"name": "([^"]+)"/gm)].map((m) => m[1])
const { states, metrics, sources } = dataset
const stateNames = Object.keys(states)
let checks = 0
const ok = (message) => { checks++; console.log("ok  " + message) }

// 1. Every state and UT, once, with a unique code
assert.equal(stateNames.length, 36)
assert.deepEqual([...stateNames].sort(), [...mapNames].sort())
assert.equal(new Set(mapNames).size, mapNames.length, "duplicate state on the map")
const codes = stateNames.map((n) => states[n].code)
assert.ok(codes.every(Boolean) && new Set(codes).size === 36, "missing or duplicate state code")
ok("36 states and UTs, no duplicates, unique codes, same names as the map")

// 2. Goat population adds up to the total the source prints
const printedTotal = Number(raw.rows.find((r) => r.state === "Total").goat.replace(/,/g, ""))
const sum = stateNames.reduce((a, n) => a + (states[n].goatPopulation ?? 0), 0)
assert.equal(sum, printedTotal)
ok(`goat population sums to the printed national total (${printedTotal.toLocaleString("en-IN")})`)

// 3. Spot check named in the brief
assert.equal(states.Odisha.goatPopulation, 6393452)
ok("Odisha goat population is 63,93,452, as published")

// 4. Cross-check against a second document: Key Results Table 14 (million, 2 decimals)
const KEY_RESULTS = { Rajasthan: 20.84, "West Bengal": 16.28, "Uttar Pradesh": 14.48, Bihar: 12.82, "Madhya Pradesh": 11.06, Maharashtra: 10.6, "Tamil Nadu": 9.89, Jharkhand: 9.12, Odisha: 6.39, Karnataka: 6.17 }
for (const [name, million] of Object.entries(KEY_RESULTS)) {
  assert.ok(Math.abs(states[name].goatPopulation / 1e6 - million) <= 0.005 + 1e-9, `${name} differs from Key Results Table 14`)
}
ok("10 major states match Key Results Table 14 within rounding")

// 5. Nothing silently zero, nothing invented
for (const name of stateNames) {
  const s = states[name]
  if (name === "Ladakh") assert.equal(s.goatPopulation, undefined, "Ladakh has no separate figure in the source")
  else assert.ok(Number.isInteger(s.goatPopulation) && s.goatPopulation > 0, `${name}: bad goat population`)
  for (const key of Object.keys(s)) assert.ok(["code", "goatPopulation", "note"].includes(key) || key in metrics, `${name}: unknown field ${key}`)
}
ok("every state has a real figure or none (Ladakh), and no field is unexplained")

// 6. Source metadata: every metric with a figure cites a real source, every metric without one says why
for (const [key, metric] of Object.entries(metrics)) {
  const hasValue = stateNames.some((n) => states[n][key] !== undefined)
  for (const id of metric.sourceIds) assert.ok(sources[id], `${key}: unknown source ${id}`)
  if (hasValue) assert.ok(metric.sourceIds.length && metric.reportingYear && metric.unit && metric.dataType, `${key}: figures without full metadata`)
  else assert.ok(metric.unavailableReason, `${key}: no figures and no reason given`)
}
ok("every populated metric has source, year, unit and type; every empty one says why")

console.log(`\n${checks} checks passed`)
