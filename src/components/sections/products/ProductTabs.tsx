"use client"

import { useState, type ReactNode } from "react"

export function ProductTabs({
  tabs,
}: {
  tabs: { id: string; label: string; content: ReactNode }[]
}) {
  const [active, setActive] = useState(tabs[0].id)

  return (
    <div className="pdTabs">
      <div className="pdTabList" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={active === id}
            aria-controls={`panel-${id}`}
            onClick={() => setActive(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {tabs.map(({ id, content }) => (
        <div
          key={id}
          className="pdPanel"
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={active !== id}
        >
          {content}
        </div>
      ))}
    </div>
  )
}
