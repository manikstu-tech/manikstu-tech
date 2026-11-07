"use client"

import { useState } from "react"
import { RAIPUR_MAP } from "@/constants/raipurMap"

const OVERVIEW = "Project AJAH has started in four blocks of Raipur District, Chhattisgarh, with a phased rollout."

// Every tehsil of Raipur District with its name; the four Project AJAH blocks are filled in and can be picked.
// Hovering, tapping or tabbing to one lights it up; Enter or Space picks it.
export function AjaMap() {
  const [picked, setPicked] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const shown = hover ?? picked
  const blocks = RAIPUR_MAP.areas.filter(({ aja }) => aja)
  const block = blocks.find(({ id }) => id === shown)
  const toggle = (id: string) => setPicked((current) => (current === id ? null : id))

  return (
    <div className="ajMap">
      <svg
        className="ajMapSvg"
        viewBox={RAIPUR_MAP.viewBox}
        role="group"
        aria-label="Map of Raipur District, Chhattisgarh, with the four Project AJAH blocks highlighted: Arang, Tilda, Abhanpur and Dharsiwa"
      >
        {RAIPUR_MAP.areas.map(({ id, name, d, aja }) => (
          <path
            key={id}
            d={d}
            className={`area${aja ? " aja" : ""}${shown === id ? " on" : ""}`}
            onMouseEnter={aja ? () => setHover(id) : undefined}
            onMouseLeave={aja ? () => setHover(null) : undefined}
            onClick={aja ? () => toggle(id) : undefined}
            {...(aja && {
              tabIndex: 0,
              role: "button",
              "aria-label": `${name} block`,
              "aria-pressed": picked === id,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggle(id)
                }
              },
            })}
          />
        ))}
        {RAIPUR_MAP.areas.map(({ id, name, label, aja }) => (
          <text key={id} x={label[0]} y={label[1]} className={`${aja ? "aja" : ""}${shown === id ? " on" : ""}`}>
            {name}
          </text>
        ))}
        <circle className="city" cx={RAIPUR_MAP.city[0]} cy={RAIPUR_MAP.city[1]} r="5" />
      </svg>

      <div className="ajMapPanel">
        <p className="ajMapInfo" aria-live="polite">
          {block ? (
            <>
              <strong>{block.name} block, Raipur District</strong>A Project AJAH block in the phased rollout.
            </>
          ) : (
            OVERVIEW
          )}
        </p>
        <p className="ajMapKey">
          <span>
            <i className="aja" /> Project AJAH blocks
          </span>
          <span>
            <i /> Other tehsils
          </span>
          <span>
            <i className="city" /> Raipur city
          </span>
        </p>
        <small className="ajMapCredit">Indicative map of Raipur District&apos;s eight tehsils. Outlines are approximate.</small>
      </div>
    </div>
  )
}
