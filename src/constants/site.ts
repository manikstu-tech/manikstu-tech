import type { NavItem } from "@/types"

export const SITE_URL = "https://manikstu.com"

export const LOCAL_ASSET_BASE = "/manikstu"

// Product photos are in public/product-images as WebP (converted from the previous site's PNGs, 293 MB down to 29 MB).
// The product data still names the PNGs, as "slug/1.png" or "/products/slug/1.png", so this maps those names to the WebP files.
// (Not public/products: on the live server that folder would shadow the /products pages.)
export const PRODUCT_IMAGE_BASE = `${SITE_URL}/product-images`
export const productImage = (path: string) =>
  `${PRODUCT_IMAGE_BASE}/${path.replace(/^\/?products\//, "").replace(/\.png$/i, ".webp")}`

export const CONTACT_PAGE = "/contact"

export const JOIN_PAGE = "/join"

export const CONTACT_INFO = {
  phone: "+91 90781 93191",

  phoneTel: "tel:+919078193191",

  email: "contact@manikstu.com",

  emailMailto: "mailto:contact@manikstu.com",

  location: "Bhubaneswar, Odisha 751013",
}

export const NAV_LINKS: NavItem[] = [
  { label: "Company", href: "/#about" },

  { label: "Our Solutions", href: "/#solutions", dropdownOnly: true },

  {
    label: "Our Association",
    href: "/partners",
    dropdownOnly: true,
    menu: [
      { label: "Our Teams", href: "/teams" },
      { label: "Our Investors", href: "/investors" },
      { label: "Our Partners", href: "/partners" },
    ],
  },

  {
    label: "Our Network",
    href: "/our-network",
    dropdownOnly: true,
    menu: [
      { label: "Franchise", href: "/franchise" },
      { label: "FPOs", href: "/fpo" },
      { label: "Supply & Distribution", href: "/supply-distribution" },
    ],
  },

  { label: "Products", href: "/products" },

  {
    label: "Resources",
    href: "/resources",
    dropdownOnly: true,
    menu: [
      { label: "Our Gallery", href: "/resources#gallery" },
      { label: "Our Media", href: "/blogs" },
      { label: "Careers", href: "/careers" },
    ],
  },

  { label: "Recognition", href: "/recognition" },

  { label: "Contact Us", href: CONTACT_PAGE },
]

// Profile links copied from the live manikstu.com footer

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ManikstuAgroPrivateLimited",
    icon: "facebook",
  },

  {
    label: "Instagram",
    href: "https://www.instagram.com/manikstuagro",
    icon: "instagram",
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/manikstu-agro-private-limited",
    icon: "linkedin",
  },

  {
    label: "YouTube",
    href: "https://www.youtube.com/@manikstuagro5847",
    icon: "youtube",
  },
] as const

// Shown under "Our Solutions" in the header menu
export const MEGA_PROJECTS = [
  { label: "Project AJAH, Chhattisgarh", href: "/projects/ajah" },
  { label: "Aangan Lakshmi, Chhattisgarh", href: "/projects/aangan-lakshmi" },
  { label: "Sujalam Sufalam, Odisha", href: "/projects/sujalam-suphalam" },
]
