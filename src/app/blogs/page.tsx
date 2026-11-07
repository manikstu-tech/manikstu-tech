import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { PostGrid } from "@/components/sections/resources/PostGrid"
import { SubSection } from "@/components/sections/subpage/parts"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { PRESS } from "@/constants/resources"

const TITLE = "Blogs | Manikstu Agro Private Limited"
const DESCRIPTION =
  "Press coverage and articles about Manikstu Agro Private Limited and the goat farming families we work with across rural India."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blogs" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blogs" },
}

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* No hero: press coverage opens the page, so its title is the page heading */}
        <SubSection id="press" level={1} eyebrow="In the news" title="Press coverage" intro="Stories about our work in newspapers, magazines and on partner websites.">
          <ul className="resPress">
            {PRESS.map(({ publisher, title, url, date, image, fit }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <span className="resPressImg">
                    <Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: fit }} />
                  </span>
                  <span className="resPressBody">
                    <small>{`${publisher} · ${date}`}</small>
                    <strong>{title}</strong>
                    <span className="resPressMore">
                      Read the story <Arrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SubSection>

        <SubSection id="posts" alt eyebrow="Our stories" title="Our Blogs" intro="Stories and updates from Manikstu's work across rural India.">
          <PostGrid />
        </SubSection>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
