import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { SolutionArticle } from "@/components/sections/solutions/SolutionArticle"
import { BackToTop } from "@/components/ui/BackToTop"
import { SOLUTION_PAGES } from "@/constants/solutions"
import { getContent } from "@/lib/cms"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => SOLUTION_PAGES.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const base = SOLUTION_PAGES.find((p) => p.slug === slug)
  if (!base) return {}
  const page = await getContent(`solutions/${slug}`, base)
  const url = `/solutions/${slug}`
  return {
    title: `${page.name} | Manikstu Agri Solutions`,
    description: page.summary,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.summary, url },
  }
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params
  const base = SOLUTION_PAGES.find((p) => p.slug === slug)
  if (!base) notFound()
  const page = await getContent(`solutions/${slug}`, base)

  return (
    <>
      <Header />
      <main id="main">
        <SolutionArticle page={page} />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
