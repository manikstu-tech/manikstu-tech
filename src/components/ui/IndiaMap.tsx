"use client"

import { useState } from "react"
import { MAP_HEIGHT, MAP_STATES, MAP_WIDTH } from "@/constants/indiaMap"

// Markers go last so neighbouring states don't paint over them
const DRAW_ORDER = [...MAP_STATES].sort(
  (a, b) => Number(!!a.dot) - Number(!!b.dot),
)

interface IndiaMapProps {
  selected: string
  onSelect: (name: string) => void
  // Optional shading group (1 to 5) per state
  levels?: Record<string, number>
}

export function IndiaMap({ selected, onSelect, levels }: IndiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const label = MAP_STATES.find(({ name }) => name === (hovered ?? selected))

  return (
    <div className="indiaMap">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="group"
        aria-label="Map of India. Select a state to see its livestock figures."
      >
        {DRAW_ORDER.map(({ name, d, at, dot }) => (
          <g
            key={name}
            className={`mapState${levels?.[name] ? ` l${levels[name]}` : ""}${name === selected ? " selected" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={name}
            aria-pressed={name === selected}
            onClick={() => onSelect(name)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onSelect(name)
              }
            }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(name)}
            onBlur={() => setHovered(null)}
          >
            <path d={d} />
            {/* Regions too small to tap get a marker and a wider invisible target */}
            {dot && <circle cx={at[0]} cy={at[1]} r="7" />}
            {dot && <circle className="mapHit" cx={at[0]} cy={at[1]} r="21" />}
          </g>
        ))}
      </svg>
      {label && (
        <span
          className="mapLabel"
          aria-hidden="true"
          style={{
            // Kept away from the edges so long names never cause sideways scrolling
            left: `${Math.min(70, Math.max(30, (label.at[0] / MAP_WIDTH) * 100))}%`,
            top: `${Math.max(8, (label.at[1] / MAP_HEIGHT) * 100)}%`,
          }}
        >
          {label.name}
        </span>
      )}
    </div>
  )
}
