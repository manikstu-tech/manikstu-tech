"use client"

import { useEffect, useRef, useState } from "react"
import { QuoteBadge } from "@/components/sections/subpage/QuoteBadge"
import { SITE_URL } from "@/constants/site"
import type { Person } from "@/constants/subpages"

// Square portraits with name and role, scrolled sideways one card at a time
export function PeopleSlider({ people, quotes }: { people: Person[]; quotes?: boolean }) {
  const track = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = () => {
    const el = track.current
    if (!el) return
    setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4,
    })
  }

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 24) })
  }

  return (
    <div className={quotes ? "peopleSlider quotes" : "peopleSlider"}>
      <ul className="peopleTrack" ref={track} onScroll={measure}>
        {people.map((person) => (
          <li className="personCard" key={person.name}>
            <img
              src={`${SITE_URL}/team/${person.photo}`}
              alt={person.name}
              width="480"
              height="480"
              loading="lazy"
            />
            {quotes ? (
              <div className="quoteCard">
                <QuoteBadge />
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <blockquote>“{person.bio}”</blockquote>
              </div>
            ) : (
              <>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className="sliderBtn prev" type="button" aria-label="Previous" hidden={edge.start} onClick={() => scroll(-1)}>
        ‹
      </button>
      <button className="sliderBtn next" type="button" aria-label="Next" hidden={edge.end} onClick={() => scroll(1)}>
        ›
      </button>
    </div>
  )
}
