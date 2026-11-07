import type { Metadata } from "next"

// The admin is for staff only: kept out of search results and out of the site's own header and footer
export const metadata: Metadata = { title: "Admin | Manikstu", robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main id="main" className="adm">{children}</main>
}
