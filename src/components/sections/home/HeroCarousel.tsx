"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { LOCAL_ASSET_BASE } from "@/constants/site"
import { AUTOPLAY_MS } from "@/constants/content"
import type { HeroSlide } from "@/types"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// The slides come from the page, so edits made in the admin reach this client component
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [slide, setSlide] = useState(0)
  const reducedMotion = useReducedMotion()

  const autoplay = !reducedMotion

  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => {
      setSlide((current) => (current + 1) % slides.length)
    }, AUTOPLAY_MS)

    return () => window.clearTimeout(timer)
  }, [slide, autoplay])

  return (
    <section
      className="hero heroCarousel"
      id="home"
      aria-roledescription="carousel"
      aria-label="Manikstu highlights"
    >
      <div className="heroSlides" aria-live={autoplay ? "off" : "polite"}>
        {slides.map((item, i) => (
          <div
            key={i}
            className={`heroSlide${i === slide ? " active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== slide}
            inert={i !== slide}
          >
            <img
              className={item.zoom ? "slideImage zoom" : "slideImage"}
              src={item.image}
              alt={item.alt}
              style={{ objectPosition: item.position, ...(item.zoom && { "--zoom": item.zoom }) } as CSSProperties}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
            <div className="slideShade" />
            <div className="slideCopy">
              <p className="eyebrow">{item.eyebrow}</p>
              {i === 0 ? <h1>{item.title}</h1> : <h2>{item.title}</h2>}
              <p className="lede">{item.text}</p>
              {item.proof && <p className="slideProof">{item.proof}</p>}
              <div className="actions">
                <a className="button cream" href={item.primary[1]}>
                  {item.primary[0]} <Arrow />
                </a>
                <a className="textLink lightLink" href={item.secondary[1]}>
                  {item.secondary[0]} <Arrow />
                </a>
              </div>
              <div className="trust">
                <div className="avatars">
                  {[1, 2, 3, 4].map((n) => (
                    <img
                      key={n}
                      src={`${LOCAL_ASSET_BASE}/avatars/trust-${n}.jpg`}
                      alt=""
                    />
                  ))}
                </div>
                <strong>Trusted by 10,000+ farmers</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Previous / next: changing the slide restarts the autoplay timer, so a visitor gets the full time on their pick */}
      <div className="heroNav">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setSlide((current) => (current - 1 + slides.length) % slides.length)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setSlide((current) => (current + 1) % slides.length)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
