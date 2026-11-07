import { BackgroundVideo } from "@/components/ui/BackgroundVideo"
import { PurposeIcon } from "@/components/ui/PurposeIcon"

export function AboutSection() {
  return (
    <section className="aboutStory section" id="about">
      <div className="aboutIntro">
        <div className="aboutLead">
          <p className="eyebrow">01 / Who we are</p>
          <h2>
            Integrated solutions for <span>stronger rural</span> livelihoods.
          </h2>
        </div>
        <p className="aboutIntroText">
          Founded in 2015 in Kalahandi, Odisha, Manikstu Agro began with a
          simple belief—that livestock can be a reliable economic asset. Today,
          its integrated goat-farming ecosystem brings together herd healthcare,
          expert advice, livestock insurance and fair market access, helping
          rural families, especially women, earn a steady income.
        </p>
      </div>
      <div className="aboutBento">
        <figure className="aboutStoryCard">
          <BackgroundVideo
            videoId="eurGt7tXTFw"
            title="Manikstu in Mann Ki Baat, 25 February 2024"
            className="aboutVideo"
            poster="hqdefault"
          />
          <figcaption>
            <h3>Our Story</h3>
            <p>
              From a handful of farmers in Kalahandi to a movement across
              states.
            </p>
          </figcaption>
        </figure>
        <div className="purposeGrid">
          <article className="purposeCard">
            <div className="purposeTitle">
              <PurposeIcon type="mission" />
              <strong>Our Mission</strong>
            </div>
            <p>
              To build an integrated goat ecosystem that empowers rural
              households, especially women, through sustainable and profitable
              enterprises.
            </p>
          </article>
          <article className="purposeCard dark">
            <div className="purposeTitle">
              <PurposeIcon type="vision" />
              <strong>Our Vision</strong>
            </div>
            <p>
              To be India’s most trusted and scalable goat value chain company,
              enabling inclusive and climate-resilient rural livelihoods.
            </p>
          </article>
          <article className="purposeCard">
            <div className="purposeTitle">
              <PurposeIcon type="aims" />
              <strong>Our Aims</strong>
            </div>
            <ul>
              <li>Quality livestock</li>
              <li>Better livelihoods</li>
              <li>Financial inclusion</li>
              <li>Climate resilience</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
