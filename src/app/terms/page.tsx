import type { Metadata } from "next"
import { LegalPage } from "@/components/sections/legal/LegalPage"
import { TERMS } from "@/constants/legal"
import { getContent } from "@/lib/cms"

export const metadata: Metadata = {
  title: `${TERMS.title} | Manikstu Agro Private Limited`,
  description: TERMS.description,
  alternates: { canonical: "/terms" },
}

export default async function TermsPage() {
  return <LegalPage page={await getContent("legal/terms", TERMS)} />
}
