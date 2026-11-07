import { AdminApp } from "@/components/admin/AdminApp"
import { AdminLogin } from "@/components/admin/AdminLogin"
import { CMS_DOCS } from "@/constants/cms"
import { adminConfigured, isAdmin } from "@/lib/adminAuth"
import { DEV_STORE, REMOTE } from "@/lib/cms"

const STYLE_ONLY = [
  ["/franchise", "Franchise"],
  ["/fpo", "FPO Connect"],
  ["/projects/ajah", "Project AJAH"],
  ["/projects/aangan-lakshmi", "Aangan Lakshmi"],
  ["/projects/sujalam-suphalam", "Sujalam Suphalam"],
  ["/products", "Products"],
  ["/contact", "Contact"],
  ["/resources", "Resources"],
  ["/blogs", "Blogs"],
  ["/our-network", "Our network"],
  ["/recognition", "Recognition"],
  ["/join", "Join us"],
]

export default async function AdminPage() {
  if (!adminConfigured) {
    return (
      <div className="admLogin">
        <h1>Admin is not set up</h1>
        <p>
          Add an <b>ADMIN_PASSWORD</b> environment variable to this site, then redeploy. See the README section "Content admin".
        </p>
      </div>
    )
  }
  if (!(await isAdmin())) return <AdminLogin />
  const docs = [
    ...CMS_DOCS.map(({ key, title, group, preview, scope }) => ({ key, title, group, preview, scope })),
    // Pages whose text is written inside the page file. Every word, picture and colour on them is still editable by clicking on the page.
    ...STYLE_ONLY.map(([path, title]) => ({ key: `route:${path}`, title, group: "Other pages", preview: path, styleOnly: true })),
  ]
  // storage "none": production without Supabase keys, so nothing could be saved
  return <AdminApp docs={docs} storage={REMOTE ? "supabase" : DEV_STORE ? "local" : "none"} />
}
