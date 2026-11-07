import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { PhotoGrid } from "@/components/sections/resources/PhotoGrid"
import { VideoGrid } from "@/components/sections/resources/VideoGrid"
import { SubSection } from "@/components/sections/subpage/parts"
import { BackToTop } from "@/components/ui/BackToTop"

const TITLE = "Resources | Manikstu Agro Private Limited"
const DESCRIPTION =
  "Photos and videos from Manikstu Agro Private Limited and its work with goat farmers and rural families across India."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/resources" },
}

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* No hero: the gallery opens the page, so its title is the page heading */}
        <SubSection id="gallery" level={1} eyebrow="Gallery" title="Photo gallery" intro="Moments from our work in the field, at events and with our team.">
          <PhotoGrid />
        </SubSection>

        <SubSection id="videos" alt eyebrow="Films" title="Videos" intro="Short films and field interviews that let farmers speak for themselves.">
          <VideoGrid />
        </SubSection>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
