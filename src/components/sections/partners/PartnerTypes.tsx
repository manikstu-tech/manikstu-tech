import type { InfoItem } from "@/constants/subpages"

// "Who we partner with" as a directory: the heading stays beside a list of rows, each row a type of partner and what we do together
export function PartnerTypes({
  id = "partner-types",
  title,
  intro,
  items,
}: {
  id?: string
  title: string
  intro: string
  items: InfoItem[]
}) {
  return (
    <section className="ptBand" id={id} aria-labelledby={`${id}-title`}>
      <header className="ptHead">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
      </header>
      <ul className="ptList">
        {items.map(({ title: name, text }) => (
          <li key={name}>
            <h3>{name}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
