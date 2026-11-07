// Step 2: turn the raw layer into the dataset the website reads.
// Run: node scripts/goat-market/build.mjs
import { readFile, writeFile } from "node:fs/promises"

const { sources } = JSON.parse(await readFile("data/goat-market/sources.json", "utf8"))
const raw = JSON.parse(await readFile("data/goat-market/raw/lc20-pib-annexure.json", "utf8"))

// Canonical state list = the map's own, so the dataset and the map can never disagree
const mapSource = await readFile("src/constants/indiaMap.ts", "utf8")
const names = [...mapSource.matchAll(/^\s{4}"name": "([^"]+)"/gm)].map((m) => m[1])

// ISO 3166-2:IN codes
const CODES = {
  "Andaman and Nicobar Islands": "AN", "Andhra Pradesh": "AP", "Arunachal Pradesh": "AR", Assam: "AS", Bihar: "BR",
  Chandigarh: "CH", Chhattisgarh: "CG", "Dadra and Nagar Haveli and Daman and Diu": "DH", Delhi: "DL", Goa: "GA",
  Gujarat: "GJ", Haryana: "HR", "Himachal Pradesh": "HP", "Jammu and Kashmir": "JK", Jharkhand: "JH", Karnataka: "KA",
  Kerala: "KL", Ladakh: "LA", Lakshadweep: "LD", "Madhya Pradesh": "MP", Maharashtra: "MH", Manipur: "MN",
  Meghalaya: "ML", Mizoram: "MZ", Nagaland: "NL", Odisha: "OD", Puducherry: "PY", Punjab: "PB", Rajasthan: "RJ",
  Sikkim: "SK", "Tamil Nadu": "TN", Telangana: "TS", Tripura: "TR", "Uttar Pradesh": "UP", Uttarakhand: "UK",
  "West Bengal": "WB",
}

// PIB table name -> canonical name. The two Dadra/Daman rows merge into one UT, as the map draws it.
const RENAME = {
  "Andaman & Nicobar Islands": "Andaman and Nicobar Islands",
  "Dadra & Nagar Haveli": "Dadra and Nagar Haveli and Daman and Diu",
  "Daman And Diu": "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu And Kashmir": "Jammu and Kashmir",
}
const NOTES = {
  "Jammu and Kashmir": "Includes Ladakh. The 2019 census table counts the two together.",
  Ladakh: "Counted with Jammu and Kashmir in the 2019 census table.",
  "Dadra and Nagar Haveli and Daman and Diu": "Sum of the two rows the census table prints separately.",
}

// "7,3630" is a typo in the source for 73,630; stripping every comma gives the right number (the totals row confirms it).
const toNumber = (text) => Number(text.replace(/,/g, ""))

const goats = {}
for (const row of raw.rows) {
  if (row.state === "Total") continue
  const name = RENAME[row.state] ?? row.state
  goats[name] = (goats[name] ?? 0) + toNumber(row.goat)
}

const states = {}
for (const name of names) {
  states[name] = { code: CODES[name] }
  if (goats[name] !== undefined) states[name].goatPopulation = goats[name]
  if (NOTES[name]) states[name].note = NOTES[name]
}

// What each metric is, where it comes from, or why it has no figure
const NSS_REASON =
  "The NSS 77th round records goats together with sheep, pigs and rabbits as one 'ovine and other mammals' item, so goat-owning households cannot be separated. Its unit-level data also needs a free MoSPI login."
const HCES_REASON =
  "HCES 2023-24 records 'goat meat/mutton' as one combined item (code 192, kg, last 7 days). No state-wise quantity table is published in the documents we could reach, and the unit-level data needs a free MoSPI login."
const SUPPLY_REASON =
  "Needs state-wise per-capita consumption and goat meat production from the DAHD Basic Animal Husbandry Statistics, which we could not download."

const metrics = {
  goatRearingHouseholds: {
    label: "Goat-rearing households",
    unit: "households",
    dataType: "survey_estimate",
    sourceIds: ["nss77-instructions"],
    unavailableReason: NSS_REASON,
  },
  goatPopulation: {
    label: "Goat population",
    unit: "goats",
    reportingYear: 2019,
    dataType: "official_census",
    sourceIds: ["lc20-pib-annexure", "lc20-key-results"],
  },
  averageHerdSize: {
    label: "Average goat herd size",
    unit: "goats per household",
    dataType: "calculated",
    sourceIds: ["nss77-instructions"],
    unavailableReason: "Needs the number of goat-rearing households. " + NSS_REASON,
  },
  perCapitaMeatConsumption: {
    label: "Per-capita goat meat consumption",
    unit: "kg per person per year",
    category: "goat_meat_or_mutton",
    dataType: "survey_estimate",
    sourceIds: ["hces-questionnaire"],
    unavailableReason: HCES_REASON,
  },
  estimatedAnnualDemand: {
    label: "Estimated annual demand",
    unit: "tonnes per year",
    dataType: "calculated",
    sourceIds: ["hces-questionnaire"],
    unavailableReason: SUPPLY_REASON,
  },
  goatMeatProduction: {
    label: "Goat meat production",
    unit: "tonnes per year",
    dataType: "official_statistics",
    sourceIds: [],
    unavailableReason: SUPPLY_REASON,
  },
  productionCoverage: {
    label: "Production coverage",
    unit: "percent of estimated demand",
    dataType: "calculated",
    sourceIds: [],
    unavailableReason: SUPPLY_REASON,
  },
  productionDemandBalance: {
    label: "Indicative surplus or deficit",
    unit: "tonnes per year",
    dataType: "calculated",
    sourceIds: [],
    unavailableReason: SUPPLY_REASON,
  },
}

const out = { sources, metrics, states }
await writeFile("src/data/goatMarket.json", JSON.stringify(out, null, 2) + "\n")
console.log(`Wrote src/data/goatMarket.json (${Object.keys(states).length} states and UTs)`)
