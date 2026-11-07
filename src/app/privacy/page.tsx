import type { Metadata } from "next"
import { LegalPage } from "@/components/sections/legal/LegalPage"
import { PRIVACY } from "@/constants/legal"
import { getContent } from "@/lib/cms"

export const metadata: Metadata = {
  title: `${PRIVACY.title} | Manikstu Agri Solutions`,
  description: PRIVACY.description,
  alternates: { canonical: "/privacy" },
}

export default async function PrivacyPage() {
  return <LegalPage page={await getContent("legal/privacy", PRIVACY)} />
}
