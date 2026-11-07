import type { ReactNode } from "react"
import { Arrow } from "@/components/ui/Arrow"
import type { InfoItem } from "@/constants/subpages"
import { CONTACT_PAGE } from "@/constants/site"

export function SubSection({
  id,
  title,
  intro,
  eyebrow,
  level = 2,
  alt,
  children,
}: {
  id?: string
  title: string
  intro?: string
  // With an eyebrow the heading takes the page hero's style: small label above, bold title
  eyebrow?: string
  // 1 when the section opens a page that has no hero, so the page still has one main heading
  level?: 1 | 2
  alt?: boolean
  children: ReactNode
}) {
  const Heading = level === 1 ? "h1" : "h2"
  return (
    <section className={alt ? "subSection alt" : "subSection"} id={id}>
      <div className={eyebrow ? "subHead bold" : "subHead"}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading>{title}</Heading>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  )
}

export function InfoGrid({ items, columns }: { items: InfoItem[]; columns: 2 | 3 | 4 }) {
  return (
    <ul className={`infoGrid cols${columns}`}>
      {items.map(({ title, text }) => (
        <li className="infoCard" key={title}>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ul>
  )
}

export function SubCta({
  title,
  text,
  action = "Get in touch",
  href = CONTACT_PAGE,
}: {
  title: string
  text: string
  action?: string
  href?: string
}) {
  return (
    <section className="subCta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a className="button" href={href}>
        {action} <Arrow />
      </a>
    </section>
  )
}
