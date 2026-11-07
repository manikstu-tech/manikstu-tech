import type { LogoGroup } from "@/constants/partners"

// One band per group: the logos on the left, a sticky label with the count on the right
export function LogoWall({
  group,
  alt,
  large,
  plate,
  align = "right",
}: {
  group: LogoGroup
  alt?: boolean
  large?: boolean
  // Letterpress plates instead of the tinted cards
  plate?: boolean
  // Which side of the logos the label (count, heading, text) sits on: the right by default
  align?: "left" | "right"
}) {
  const { id, title, text, logos } = group
  return (
    <section
      className={["lwBand", alt && "alt", align !== "right" && align].filter(Boolean).join(" ")}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <header className="lwHead">
        <p className="lwCount" aria-hidden="true">
          {logos.length}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{text}</p>
      </header>
      <ul className={plate ? "lwGrid plate" : large ? "lwGrid large" : "lwGrid"}>
        {logos.map(({ name, src, wide }) => (
          <li key={name}>
            {plate ? (
              <>
                {src && (
                  <img
                    src={src}
                    alt=""
                    width="220"
                    height="90"
                    loading="lazy"
                    decoding="async"
                    className={wide ? "wide" : undefined}
                  />
                )}
                <i aria-hidden="true" />
                <span className="lwName">{name}</span>
              </>
            ) : (
              <>
                <div className="lwTile">
                  {src ? (
                    <img src={src} alt="" width="220" height="90" loading="lazy" decoding="async" />
                  ) : (
                    <span className="lwWord">{name}</span>
                  )}
                </div>
                {src && <span className="lwName">{name}</span>}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
