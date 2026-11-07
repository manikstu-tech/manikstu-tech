import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { BackToTop } from "@/components/ui/BackToTop"
import { HeroCarousel } from "@/components/sections/home/HeroCarousel"
import { AboutSection } from "@/components/sections/home/AboutSection"
import { ImpactSection } from "@/components/sections/home/ImpactSection"
import { MarketOutlookSection } from "@/components/sections/home/MarketOutlookSection"
import { SolutionsSection } from "@/components/sections/home/SolutionsSection"
import { AjahSection } from "@/components/sections/home/AjahSection"
import { StoriesSection } from "@/components/sections/home/StoriesSection"
import { HOME_HERO } from "@/constants/cms"
import { STORIES } from "@/constants/content"
import { getContent } from "@/lib/cms"
import { CtaSection } from "@/components/sections/home/CtaSection"

export default async function HomePage() {
  const { slides } = await getContent("home/hero", HOME_HERO)
  const { stories } = await getContent("home/stories", { stories: STORIES })
  return (
    <main id="main">
      <Header />
      <HeroCarousel slides={slides} />
      <AboutSection />
      <ImpactSection />
      <MarketOutlookSection />
      <SolutionsSection />
      <AjahSection />
      <StoriesSection stories={stories} />
      <CtaSection />
      <Footer />
      <BackToTop />
    </main>
  )
}
