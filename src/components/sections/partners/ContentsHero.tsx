import type { CSSProperties } from "react"
import { Arrow } from "@/components/ui/Arrow"

export type ContentsItem = { id: string; n: number; title: string; text: string }

// A full-height, text-only hero: the headline and intro on top, and along the bottom a contents row
// that names what is further down the page and jumps to it (Partners and Investors pages).
export function ContentsHero({
  eyebrow,
  title,
  lede,
  action,
  href,
  items,
  wide,
}: {
  eyebrow: string
  title: string
  lede: string
  // The button under the intro; left out, the hero has no button
  action?: string
  href?: string
  // The contents row along the bottom; left out, the hero is just the headline and intro
  items?: ContentsItem[]
  // A long headline: it spans the full width and the intro sits beneath it, instead of beside it
  wide?: boolean
}) {
  return (
    <section className={wide ? "phero wide" : "phero"}>
      <div className="pheroMain">
        <p className="eyebrow">{eyebrow}</p>
        <div className="pheroTop">
          <h1>{title}</h1>
          <div className="pheroSide">
            <p className="subLede">{lede}</p>
            {action && href && (
              <div className="subActions">
                <a className="button" href={href}>
                  {action} <Arrow />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {items && (
        <nav className="pheroIndex" aria-label={`On this page: ${eyebrow}`}>
          <ul style={{ "--n": items.length } as CSSProperties}>
            {items.map(({ id, n, title: name, text }) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span className="n">{n}</span>
                  <strong>{name}</strong>
                  <span className="d">{text}</span>
                  <i aria-hidden="true">↓</i>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  )
}
