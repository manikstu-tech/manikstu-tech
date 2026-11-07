import Link from "next/link"
import type { ReactNode } from "react"

// The brand mark as a letter: the ring from the logo with a sprout inside. It stands in for the first "0" of a status code, so the
// 404 and 500 pages carry the brand without a picture. `broken` leaves a gap in the ring, used for "offline".
function Ring({ broken }: { broken?: boolean }) {
  return (
    <svg className="statusRing" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="41" strokeDasharray={broken ? "190 68" : undefined} strokeLinecap="round" />
      <path className="stem" d="M50 76V50" />
      <path className="leaf" d="M50 52C38 54 31 46 30 36c11-1 19 4 20 16zM50 52c12 2 19-6 20-16-11-1-19 4-20 16z" />
      <circle className="sun" cx="50" cy="31" r="5.5" />
    </svg>
  )
}

const Code = ({ code }: { code?: string }) => {
  if (!code) return <Ring broken />
  const at = code.indexOf("0")
  return (
    <>
      {code.slice(0, at)}
      <Ring />
      {code.slice(at + 1)}
    </>
  )
}

type Props = { code?: string; title: string; text: string; children?: ReactNode; links?: [string, string][]; note?: string }

// One layout for every "something is not as expected" page: 404, errors and offline. Self-contained (no header, footer or images
// from the network) so it still renders when the rest of the site does not, and so the offline page can be cached whole.
export function StatusPage({ code, title, text, children, links, note }: Props) {
  return (
    <main id="main" className="status">
      <Link className="statusBrand" href="/">
        <img src="/icons/icon-192.png" alt="" width="40" height="40" />
        <span>Manikstu Agri Solutions</span>
      </Link>
      <div className="statusBody">
        <p className="statusCode" aria-hidden="true">
          <Code code={code} />
        </p>
        <div className="statusCopy">
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="statusActions">{children}</div>
          {links && (
            <nav className="statusLinks" aria-label="Pages to try">
              <p>Popular pages</p>
              <ul>
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {note && <small>{note}</small>}
        </div>
      </div>
    </main>
  )
}
