import type { Metadata } from "next"
import { LegalPage } from "@/components/sections/legal/LegalPage"
import { COOKIES } from "@/constants/legal"
import { getContent } from "@/lib/cms"

export const metadata: Metadata = {
  title: `${COOKIES.title} | Manikstu Agri Solutions`,
  description: COOKIES.description,
  alternates: { canonical: "/cookies" },
}

export default async function CookiesPage() {
  return <LegalPage page={await getContent("legal/cookies", COOKIES)} />
}
