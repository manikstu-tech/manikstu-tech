import Link from "next/link"

type MegaLink = { label: string; href: string }
export type MegaColumn = { heading: string; links: MegaLink[] }

// Opens under "Our Solutions" on hover or keyboard focus (all CSS), and sits inside the phone menu as a plain list.
export function MegaMenu({ columns, onNavigate }: { columns: MegaColumn[]; onNavigate: () => void }) {
  return (
    <div className="mega">
      <div className="megaPanel">
        {columns.map(({ heading, links }) => (
          <div className="megaCol" key={heading}>
            <h3>{heading}</h3>
            <ul>
              {links.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <Link href={href} onClick={onNavigate}>
                      {label}
                    </Link>
                  ) : (
                    <a href={href} onClick={onNavigate}>
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// A single short list, for items with only a few links (Our Association, Our Network)
export function NavDropdown({
  links,
  onNavigate,
}: {
  links: MegaLink[]
  onNavigate: () => void
}) {
  return (
    <div className="mega simple">
      <div className="megaPanel">
        <ul>
          {links.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link href={href} onClick={onNavigate}>
                  {label}
                </Link>
              ) : (
                <a href={href} onClick={onNavigate}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
