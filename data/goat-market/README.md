# Goat market data

The numbers on the website's India map (the "Market outlook" section) come from here. Nothing is typed into the page by hand.

## How it flows

```
data/goat-market/sources.json            where each number comes from
scripts/goat-market/extract-pib.mjs  ->  data/goat-market/raw/lc20-pib-annexure.json   (table exactly as printed)
scripts/goat-market/build.mjs        ->  src/data/goatMarket.json                       (what the page reads)
scripts/goat-market/validate.mjs         checks the result, exits with an error if anything is off
```

Run all three with `npm run data:goat`.

## What is in the dataset today

| Metric | Status | Source | Year |
|---|---|---|---|
| Goat population | Official count, all states and UTs | 20th Livestock Census, PIB annexure | 2019 |
| Goat-rearing households | Unavailable | see below | |
| Average goat herd size | Unavailable | needs the household count | |
| Per-capita goat meat consumption | Unavailable | see below | |
| Goat meat demand vs supply | Unavailable | needs the two rows above plus production | |

Ladakh has no figure of its own: the census table counts it inside Jammu and Kashmir. Dadra and Nagar Haveli and Daman and Diu is the sum of two rows the table prints separately.

## Why four metrics are empty (found in this run)

- **Households and herd size.** The brief asked for NSS 77th round figures. The survey's own instructions (Vol. I, paras 3.8.3 and 4.7.5, PDF page 207) record livestock as cattle, buffalo, "ovine and other mammals" (sheep, goats, pigs and rabbits together), poultry and other. Goats are never recorded on their own, so goat-owning households and goat herd size cannot be worked out from NSS 77, with or without weights. The microdata also needs a free login at microdata.gov.in.
- **Per-capita consumption.** The HCES 2023-24 questionnaire (Section 6.5, PDF page 32) has one item, code 192, "goat meat/mutton", in kg over the last 7 days. Goat and sheep meat are combined. The documents reachable here contain no state-wise quantity table, and the unit-level data needs a login.
- **Demand vs supply.** Needs per-capita consumption (above) and state-wise goat meat production from the DAHD Basic Animal Husbandry Statistics. The DAHD site refused every download in this run.
- **21st Livestock Census.** No finalised state-wise results were found, so 2019 is still the latest.

## How to fill the gaps later

1. Get the source file: register free at microdata.gov.in (HCES 2023-24, catalogue 237; NSS 77, catalogue 157), or download the BAHS PDF from dahd.gov.in.
2. Add the source to `sources.json` (organisation, title, table, page, year, url, kind).
3. Add a raw extraction script beside `extract-pib.mjs` that saves the figures as printed into `data/goat-market/raw/`.
4. In `build.mjs`, set the metric's `reportingYear` and `sourceIds`, remove its `unavailableReason`, and write each state's value into `states[name]`.
5. Run `npm run data:goat`. `validate.mjs` fails if a figure has no source, year, unit or type.
6. Keep the labels honest: if goat and sheep meat stay combined, the page must keep saying "goat meat/mutton".

## When a new Livestock Census is published

Add its table to `sources.json`, point `extract-pib.mjs` (or a new extractor) at it, update the year in `build.mjs`, and run `npm run data:goat`.

## Known limits

- The 2019 census is five years old. Goat populations move.
- The Key Results cross-check in `validate.mjs` covers ten major states, not all of them.
- The PIB table has two typos (Puducherry goats printed "7,3630", Madhya Pradesh sheep "32,4,585"). Removing the commas gives the right numbers, and the totals row confirms it.
