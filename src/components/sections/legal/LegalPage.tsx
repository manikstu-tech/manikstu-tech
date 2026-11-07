import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { BackToTop } from "@/components/ui/BackToTop"
import type { LegalPageContent } from "@/constants/legal"

// Privacy Policy, Terms & Conditions and Cookies Policy share this plain reading layout (.legal in globals.css).
// Links inside a paragraph are styled by .legal a, not .textLink (which would double the underline).
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <>
      <Header />
      <main id="main">
        <article className="legal">
          <h1>{page.title}</h1>
          <p className="legalDate">Last updated: {page.updated}</p>
          <p className="legalIntro">{page.intro}</p>
          {page.sections.map(({ heading, text }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              {text.map((p, i) =>
                typeof p === "string" ? (
                  <p key={i}>{p}</p>
                ) : (
                  <p key={i}>
                    {p.text}{" "}
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.linkText}
                    </a>
                  </p>
                ),
              )}
            </section>
          ))}
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
