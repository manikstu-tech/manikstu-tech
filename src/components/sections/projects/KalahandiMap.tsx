"use client"

import { useState } from "react"
import { KALAHANDI_MAP } from "@/constants/kalahandiMap"

const OVERVIEW = "Manikstu began in Kalahandi District, Odisha, in 2015, and still works from its field office here."

// The tahasils filled in and pickable, as the Project AJAH blocks are on the Raipur map.
// Kegaon's line follows the Kalahandi office address (P.S. Kegaon) and the founding story in src/constants/resources.ts.
// shortcut: the site has no specific facts about Bhawanipatna or Kesinga, so their lines stay generic; replace them
// with real details (villages, farmers, programmes) once the team supplies them.
const HIGHLIGHTS: Record<string, string> = {
  Kegaon: "Home of Manikstu's field office at Salebhata, where the company began in 2015.",
  Bhawanipatna: "Part of Manikstu's work area in Kalahandi District.",
  Kesinga: "Part of Manikstu's work area in Kalahandi District.",
}
const NAMES = Object.keys(HIGHLIGHTS)

// Kalahandi District with all 13 tahasils named; the highlighted ones are filled in and can be picked, like the AJAH map.
// Hovering, tapping or tabbing to one lights it up; Enter or Space picks it.
export function KalahandiMap() {
  const [picked, setPicked] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const shown = hover ?? picked
  const toggle = (name: string) => setPicked((current) => (current === name ? null : name))

  return (
    <div className="ajMap">
      <svg
        className="ajMapSvg kld"
        viewBox={KALAHANDI_MAP.viewBox}
        role="group"
        aria-label={`Map of Kalahandi District, Odisha, showing its 13 tahasils with ${NAMES.join(", ")} highlighted`}
      >
        {KALAHANDI_MAP.tahasils.map(({ name, d }) =>
          name in HIGHLIGHTS ? (
            <path
              key={name}
              d={d}
              className={`area aja${shown === name ? " on" : ""}`}
              onMouseEnter={() => setHover(name)}
              onMouseLeave={() => setHover(null)}
              onClick={() => toggle(name)}
              tabIndex={0}
              role="button"
              aria-label={`${name} tahasil`}
              aria-pressed={picked === name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggle(name)
                }
              }}
            />
          ) : (
            <path key={name} className="area" d={d} />
          ),
        )}
        {KALAHANDI_MAP.tahasils.map(({ name, label }) => {
          const lines = name.split(" ")
          return (
            <text
              key={name}
              x={label[0]}
              y={label[1] - ((lines.length - 1) * 6.5)}
              className={name in HIGHLIGHTS ? `aja${shown === name ? " on" : ""}` : undefined}
            >
              {lines.map((line, i) => (
                <tspan key={line} x={label[0]} dy={i ? 13 : 0}>
                  {line}
                </tspan>
              ))}
            </text>
          )
        })}
      </svg>
      <div className="ajMapPanel">
        <p className="ajMapInfo" aria-live="polite">
          {shown ? (
            <>
              <strong>{shown}, Kalahandi District</strong>
              {HIGHLIGHTS[shown]}
            </>
          ) : (
            OVERVIEW
          )}
        </p>
        <p className="ajMapKey">
          <span>
            <i className="aja" /> Where we work
          </span>
          <span>
            <i /> Other tahasils
          </span>
        </p>
        <small className="ajMapCredit">Indicative map of Kalahandi District&apos;s 13 tahasils. Outlines are approximate.</small>
      </div>
    </div>
  )
}
