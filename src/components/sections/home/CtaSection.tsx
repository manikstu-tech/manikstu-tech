import { Arrow } from "@/components/ui/Arrow"
import { CONTACT_PAGE } from "@/constants/site"

export function CtaSection() {
  return (
    <section className="contactCta section" id="contact">
      <div className="contactLead">
        <p className="eyebrow">07 / Contact us</p>
        <h2>
          Let’s work together
          <br />
          for stronger rural livelihoods.
        </h2>
        <p>
          Have a question, partnership idea or want to learn more about our
          work? Send us a message and our team will get back to you.
        </p>
      </div>
      <div className="contactCard">
        <h3>Send us a message</h3>
        <p>
          Tell us how we can help, and which of our programs you would like to
          know more about.
        </p>
        <a className="button" href={CONTACT_PAGE}>
          Contact us <Arrow />
        </a>
      </div>
    </section>
  )
}
