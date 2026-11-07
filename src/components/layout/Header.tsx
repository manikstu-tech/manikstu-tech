import { HeaderBar } from "@/components/layout/HeaderBar"
import { SOLUTIONS, SOLUTION_IMAGES } from "@/constants/content"
import { MENU } from "@/constants/menu"
import { getContent } from "@/lib/cms"

export async function Header() {
  const menu = await getContent("site/menu", MENU)
  const { items } = await getContent("home/solutions", { items: SOLUTIONS, images: SOLUTION_IMAGES })
  const mega = [
    { heading: menu.projectsHeading, links: menu.projects },
    { heading: menu.solutionsHeading, links: items.map(({ title, href }) => ({ label: title, href: href ?? "/#solutions" })) },
  ]
  return <HeaderBar links={menu.links} mega={mega} join={menu.join} />
}
