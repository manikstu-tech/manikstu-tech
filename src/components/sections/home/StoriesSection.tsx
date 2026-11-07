"use client"

import { useEffect, useRef } from "react"
import { SITE_URL } from "@/constants/site"
import type { StoryItem } from "@/types"

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")

// Three copies side by side: the visitor lives in the middle one, and is moved back to it
// whenever scrolling settles in an outer copy, which looks identical.
const COPIES = [0, 1, 2]

export function StoriesSection({ stories }: { stories: StoryItem[] }) {
  const track = useRef<HTMLDivElement>(null)

  // Width of one copy, measured from the first card of copy 0 to the first card of copy 1
  const copyWidth = () => {
    const cards = track.current?.children
    if (!cards || cards.length < stories.length + 1) return 0
    return (
      (cards[stories.length] as HTMLElement).offsetLeft -
      (cards[0] as HTMLElement).offsetLeft
    )
  }

  const jump = (delta: number) => {
    const el = track.current
    if (!el) return
    // Instant and unsnapped for one frame, so the move cannot be seen
    el.style.scrollSnapType = "none"
    el.style.scrollBehavior = "auto"
    el.scrollLeft += delta
    requestAnimationFrame(() => {
      el.style.scrollSnapType = ""
      el.style.scrollBehavior = ""
    })
  }

  useEffect(() => {
    const el = track.current
    if (!el) return
    let timer: number
    const wrap = () => {
      const width = copyWidth()
      if (!width) return
      if (el.scrollLeft < width * 0.5) jump(width)
      else if (el.scrollLeft >= width * 1.5) jump(-width)
    }
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(wrap, 140)
    }
    // Start at the first card of the middle copy, and return there if the layout changes size
    const start = () => jump(copyWidth() - el.scrollLeft)
    start()
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", start)
    return () => {
      window.clearTimeout(timer)
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", start)
    }
  }, [])

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20) })
  }

  return (
    <section className="voices section">
      <div className="voicesHead">
        <div>
          <p className="eyebrow">06 / Voices from the field</p>
          <h2>
            Real stories.
            <br />
            Meaningful change.
          </h2>
        </div>
        <div className="voicesTools">
          <div className="voicesArrows">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous stories"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next stories"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div className="voicesTrack" ref={track}>
        {COPIES.flatMap((copy) =>
          stories.map(({ image, quote, name, role }) => (
            <article
              className="voice"
              key={`${copy}-${name}`}
              // Only the middle copy is read out or focusable
              aria-hidden={copy === 1 ? undefined : true}
            >
              {image ? (
                <img
                  src={`${SITE_URL}/team/avatars/${image}`}
                  alt={copy === 1 ? `${name}, ${role}` : ""}
                  width="320"
                  height="320"
                  loading="lazy"
                />
              ) : (
                <div className="voiceInitials" aria-hidden="true">
                  {initials(name)}
                </div>
              )}
              <div className="voiceBody">
                <blockquote>
                  <span aria-hidden="true">“</span>
                  {quote}
                </blockquote>
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            </article>
          )),
        )}
      </div>
    </section>
  )
}
