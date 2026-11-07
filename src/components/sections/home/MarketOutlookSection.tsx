"use client"

import { useState } from "react"

import { Arrow } from "@/components/ui/Arrow"

import { ImpactIcon } from "@/components/ui/ImpactIcon"

import { IndiaMap } from "@/components/ui/IndiaMap"

import { StateSelector } from "@/components/ui/StateSelector"

import { MAP_STATES } from "@/constants/indiaMap"

import {
  DATA_TYPE_LABEL,
  DEFAULT_STATE,
  GOAT_MARKET,
  MAP_LEVELS,
  MARKET_SOURCE,
  NATIONAL_GOATS,
  RANKED_STATES,
  TOP_STATES,
} from "@/constants/marketOutlook"

export function MarketOutlookSection() {
  const [selected, setSelected] = useState(DEFAULT_STATE)

  const data = GOAT_MARKET.states[selected]
  const { metrics } = GOAT_MARKET
  const goats = data.goatPopulation as number | undefined

  return (
    <section className="marketOutlook section" id="market-outlook">
      <div className="marketLead">
        <p className="eyebrow">03 / Market outlook</p>
        <h2>Understanding the livestock landscape across India.</h2>
        <p>
          India has a significant opportunity to strengthen its livestock
          sector, with government initiatives and growing adoption of scientific
          practices. Supporting small and marginal farmers is central to making
          those gains last.
        </p>
        <a
          className="button"
          href={MARKET_SOURCE.url}
          target="_blank"
          rel="noreferrer"
        >
          Explore Market Insights <Arrow />
        </a>
      </div>

      <div className="marketMapWrap">
        <IndiaMap
          selected={selected}
          onSelect={setSelected}
          levels={MAP_LEVELS}
        />
        <div className="mapLegend" aria-hidden="true">
          <span>Fewer goats</span>
          {[1, 2, 3, 4, 5].map((level) => (
            <i key={level} className={`l${level}`} />
          ))}
          <span>More goats</span>
        </div>
        <p className="mapLegendNote">Shading shows goat population, 2019.</p>
      </div>

      <div className="marketPanel">
        <label htmlFor="market-state">Selected state</label>
        <StateSelector
          id="market-state"
          options={MAP_STATES.map(({ name }) => name)}
          value={selected}
          onChange={setSelected}
        />
        <div className="quickPicks">
          <span>Top goat states</span>
          {TOP_STATES.map((name) => (
            <button
              key={name}
              type="button"
              className={name === selected ? "on" : undefined}
              aria-pressed={name === selected}
              onClick={() => setSelected(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <dl className="marketMetrics" key={selected} aria-live="polite">
          {goats === undefined ? (
            <div>
              <ImpactIcon type="goats" />
              <dt>Goat population</dt>
              <dd className="unavailable">Data unavailable</dd>
            </div>
          ) : (
            <>
              <div>
                <ImpactIcon type="goats" />
                <dt>Goat population</dt>
                <dd>{goats.toLocaleString("en-IN")} goats</dd>
                <dd className="metricMeta">
                  {metrics.goatPopulation.reportingYear} ·{" "}
                  {DATA_TYPE_LABEL[metrics.goatPopulation.dataType]}
                </dd>
              </div>
              <div>
                <ImpactIcon type="herd" />
                <dt>Share of India’s goats</dt>
                <dd>{((goats / NATIONAL_GOATS) * 100).toFixed(1)}%</dd>
                <dd className="metricMeta">Calculated from the census counts</dd>
              </div>
              <div>
                <ImpactIcon type="states" />
                <dt>Rank by goat population</dt>
                <dd>
                  {RANKED_STATES.indexOf(selected) + 1} of{" "}
                  {RANKED_STATES.length}
                </dd>
                <dd className="metricMeta">States and UTs with a census figure</dd>
              </div>
            </>
          )}
        </dl>
        {data.note && <p className="marketNote">{data.note}</p>}
      </div>
    </section>
  )
}
