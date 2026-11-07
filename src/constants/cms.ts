import { HERO_SLIDES, IMPACT_STATS, SOLUTIONS, SOLUTION_IMAGES, STORIES } from "@/constants/content"
import { CAREER_VALUES, PERKS, WHY_JOIN } from "@/constants/careers"
import { FOOTER } from "@/constants/footer"
import { COOKIES, PRIVACY, TERMS } from "@/constants/legal"
import { MENU } from "@/constants/menu"
import { INVESTOR_GROUP, PARTNER_GROUPS } from "@/constants/partners"
import { LOCAL_ASSET_BASE } from "@/constants/site"
import { SOLUTION_PAGES } from "@/constants/solutions"
import { ADVISORS, LEADERSHIP, MANAGEMENT, PARTNER_STEPS, PARTNER_TYPES, WAYS_TO_FUND, WHY_TRUST } from "@/constants/subpages"

// The hero stores each picture as a path inside the site's asset folder. In the editable content it is the full address, so a picture
// uploaded from the admin (or any web address) works the same way as the original ones.
export const HOME_HERO = { slides: HERO_SLIDES.map((slide) => ({ ...slide, image: `${LOCAL_ASSET_BASE}${slide.image}` })) }

// Every page the admin can edit. `defaults` is the content written in the code; edits saved from /admin are laid over it
// (see src/lib/cms.ts). To make another page editable: add it here, then read it in the page with getContent(key, defaults).
// scope: where on the page this document's text appears. "header" and "footer" are the shared parts; leave it out for the page's own content.
export type CmsDoc = { key: string; title: string; group: string; preview: string; defaults: unknown; scope?: "header" | "footer" }

export const CMS_DOCS: CmsDoc[] = [
  { key: "home/hero", title: "Hero slides", group: "Home", preview: "/", defaults: HOME_HERO },
  { key: "home/solutions", title: "Solution tiles", group: "Home", preview: "/#solutions", defaults: { items: SOLUTIONS, images: SOLUTION_IMAGES } },
  { key: "home/impact", title: "Impact numbers", group: "Home", preview: "/#impact", defaults: { stats: IMPACT_STATS } },
  { key: "home/stories", title: "Farmer stories", group: "Home", preview: "/#stories", defaults: { stories: STORIES } },
  ...SOLUTION_PAGES.map((page) => ({
    key: `solutions/${page.slug}`,
    title: page.name,
    group: "Solutions",
    preview: `/solutions/${page.slug}`,
    defaults: page,
  })),
  { key: "teams", title: "Our teams", group: "About and network", preview: "/teams", defaults: { leadership: LEADERSHIP, management: MANAGEMENT, advisors: ADVISORS } },
  { key: "investors", title: "Our investors", group: "About and network", preview: "/investors", defaults: { ways: WAYS_TO_FUND, why: WHY_TRUST, group: INVESTOR_GROUP } },
  { key: "partners", title: "Our partners", group: "About and network", preview: "/partners", defaults: { types: PARTNER_TYPES, steps: PARTNER_STEPS, groups: PARTNER_GROUPS } },
  { key: "careers", title: "Careers", group: "About and network", preview: "/careers", defaults: { values: CAREER_VALUES, whyJoin: WHY_JOIN, perks: PERKS } },
  { key: "site/menu", title: "Menu", group: "Whole site", preview: "/", scope: "header", defaults: MENU },
  { key: "site/footer", title: "Footer", group: "Whole site", preview: "/", scope: "footer", defaults: FOOTER },
  { key: "legal/privacy", title: "Privacy policy", group: "Legal", preview: "/privacy", defaults: PRIVACY },
  { key: "legal/terms", title: "Terms and conditions", group: "Legal", preview: "/terms", defaults: TERMS },
  { key: "legal/cookies", title: "Cookie policy", group: "Legal", preview: "/cookies", defaults: COOKIES },
]

export const cmsDoc = (key: string) => CMS_DOCS.find((doc) => doc.key === key)
