import type { Metadata } from "next"
import { OfflineActions } from "@/components/ui/OfflineActions"
import { StatusPage } from "@/components/ui/StatusPage"

export const metadata: Metadata = { title: "You are offline | Manikstu Agro Private Limited", robots: { index: false } }

// Shown by the service worker (public/sw.js) when a page cannot be reached and was not saved from an earlier visit
export default function OfflinePage() {
  return (
    <StatusPage
      title="You are offline"
      text="We could not reach the site. Check your connection and try again. Pages you opened earlier may still open."
    >
      <OfflineActions />
    </StatusPage>
  )
}
