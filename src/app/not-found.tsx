import type { Metadata } from "next"
import Link from "next/link"
import { StatusPage } from "@/components/ui/StatusPage"

export const metadata: Metadata = { title: "Page not found | Manikstu Agri Solutions" }

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="We can't find that page"
      text="The link may be old or mistyped. Go back home, or try one of the pages below."
      links={[
        ["Our solutions", "/#solutions"],
        ["Products", "/products"],
        ["Franchise", "/franchise"],
        ["FPO Connect", "/fpo"],
        ["Contact us", "/contact"],
      ]}
    >
      <Link className="ajBtn gold" href="/">
        Back to home
      </Link>
    </StatusPage>
  )
}
