"use client"

import { useState } from "react"
import { Arrow } from "@/components/ui/Arrow"
import {
  OFFICES,
  mapsLink,
  officeAddress,
} from "@/constants/contact"
import { MAP_HEIGHT, MAP_STATES, MAP_WIDTH } from "@/constants/indiaMap"

const OFFICE_STATES = new Set(OFFICES.map(({ state }) => state))

export function OfficesMap() {
  const [active, setActive] = useState(OFFICES[0].id)
  const current = OFFICES.find(({ id }) => id === active) ?? OFFICES[0]

  return (
    <div className="officesBody">
      <ul className="officeList">
        {OFFICES.map((office) => (
          <li
            key={office.id}
            className={office.id === active ? "office active" : "office"}
            onMouseEnter={() => setActive(office.id)}
          >
            <button
              type="button"
              aria-expanded={office.id === active}
              aria-controls={`${office.id}-details`}
              onClick={() => setActive(office.id)}
              onFocus={() => setActive(office.id)}
            >
              <strong>{office.name}</strong>
              <span>{office.place}</span>
            </button>
            <div className="officeMore" id={`${office.id}-details`}>
              <div>
                <address>{officeAddress(office)}</address>
                <a
                  href={mapsLink(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps <Arrow />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="officeMap">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
          {/* Same shapes drawn thick underneath: only the outer edge shows, as the country outline */}
          <g className="omOutline">
            {MAP_STATES.map(({ name, d }) => (
              <path key={name} d={d} />
            ))}
          </g>
          {MAP_STATES.map(({ name, d }) => (
            <path
              key={name}
              d={d}
              className={
                name === current.state
                  ? "omState on"
                  : OFFICE_STATES.has(name)
                    ? "omState has"
                    : "omState"
              }
            />
          ))}
          {OFFICES.map(({ id, pin }) => (
            <g
              key={id}
              className={id === active ? "omPin on" : "omPin"}
              onMouseEnter={() => setActive(id)}
              onClick={() => setActive(id)}
            >
              <circle className="ring" cx={pin[0]} cy={pin[1]} r="14" />
              <circle className="dot" cx={pin[0]} cy={pin[1]} r="6" />
            </g>
          ))}
        </svg>
        <span
          className="mapLabel"
          aria-hidden="true"
          style={{
            left: `${Math.min(75, Math.max(25, (current.pin[0] / MAP_WIDTH) * 100))}%`,
            top: `${(current.pin[1] / MAP_HEIGHT) * 100}%`,
          }}
        >
          {current.name}
        </span>
      </div>
    </div>
  )
}
