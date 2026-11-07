import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ContactForm } from "@/components/sections/contact/ContactForm"
import { OfficesMap } from "@/components/sections/contact/OfficesMap"
import { BackToTop } from "@/components/ui/BackToTop"
import {
  CONTACT_HOURS,
  OFFICES,
  REPLY_TIME,
  TEAM_EMAILS,
} from "@/constants/contact"
import { CONTACT_INFO, SITE_URL } from "@/constants/site"

const TITLE = "Contact Manikstu Agri Solutions | Phone, email and offices"
const DESCRIPTION =
  "Reach Manikstu Agri Solutions by phone, email or the enquiry form, or visit one of our four offices in Pune, Bhubaneswar, Kalahandi and Raipur."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact" },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Manikstu Agri Solutions",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "Manikstu Agro Private Limited",
    url: SITE_URL,
    email: CONTACT_INFO.email,
    telephone: "+91 9078193191",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+91 9078193191",
        email: CONTACT_INFO.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      ...TEAM_EMAILS.map(({ label, email }) => ({
        "@type": "ContactPoint",
        contactType: label.replace("Email ", ""),
        email,
        areaServed: "IN",
      })),
    ],
    location: OFFICES.map((office) => ({
      "@type": "Place",
      name: office.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.streetAddress,
        addressLocality: office.locality,
        addressRegion: office.region,
        postalCode: office.postalCode,
        addressCountry: "IN",
      },
    })),
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="contactHero">
          <div className="contactIntro">
            <p className="eyebrow">Get in touch</p>
            <h1>Contact us</h1>
            <p className="contactLede">
              Have a question, want to partner, or need support? We would love
              to hear from you.
            </p>
            <ul className="contactWays">
              <li>
                <span>Call us</span>
                <a href={CONTACT_INFO.phoneTel}>{CONTACT_INFO.phone}</a>
                <small>{CONTACT_HOURS}</small>
              </li>
              <li>
                <span>Email us</span>
                <a href={CONTACT_INFO.emailMailto}>{CONTACT_INFO.email}</a>
                <small>{REPLY_TIME}</small>
              </li>
              {TEAM_EMAILS.map(({ label, email, purpose }) => (
                <li key={email}>
                  <span>{label}</span>
                  <a href={`mailto:${email}`}>{email}</a>
                  <small>{purpose}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="enquiryCard">
            <h2>We’d love to hear from you</h2>
            <p>
              Drop us a line: questions, partnership ideas, feedback or
              anything else. Our team responds within a working day.
            </p>
            <ContactForm />
          </div>
        </section>

        <section className="offices" id="offices">
          <div className="officesHead">
            <div>
              <p className="eyebrow">Visit us</p>
              <h2>Four offices, three states.</h2>
            </div>
            <p>
              Registered in Pune, run from Bhubaneswar, with a farm office in
              Kalahandi and a regional office in Raipur.
            </p>
          </div>
          <OfficesMap />
        </section>
      </main>
      <Footer />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
