import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { FOOTER } from "@/constants/footer"
import { CONTACT_INFO, CONTACT_PAGE, SOCIAL_LINKS } from "@/constants/site"
import { getContent } from "@/lib/cms"

// One footer for every page: three link columns, a large "Let's talk" link to the contact page, then legal links and social icons under a dotted rule.
export async function Footer() {
  const text = await getContent("site/footer", FOOTER)
  return (
    <footer>
      <div className="footerMain">
        <div className="footerLinks">
          {text.columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h3>{title}</h3>
              {links.map(({ label, href }) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footerTalk">
          <p className="footerKicker">{text.kicker}</p>
          <a className="footerBig" href={CONTACT_PAGE}>
            {text.big}
          </a>
          <p className="footerPhoneRow">
            <span>{text.callUs}</span>
            <a className="footerPhone" href={CONTACT_INFO.phoneTel}>
              {CONTACT_INFO.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="footerBottom">
        <div className="footerBottomTop">
          <div className="footerLegal">
            {text.legal.map(({ label, href }) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </div>
          <ul className="footerSocial" aria-label="Follow Manikstu">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Manikstu on ${label}`}>
                  <ImpactIcon type={icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footerCopyrightRow">
          <span className="footerCopyright">© {new Date().getFullYear()} {text.copyright}</span>
          <span className="footerRegistration">{text.registration}</span>
        </div>
      </div>
    </footer>
  )
}
