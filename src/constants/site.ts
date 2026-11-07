import type { NavItem } from "@/types"

export const SITE_URL = "https://manikstu.com"

export const LOCAL_ASSET_BASE = "/manikstu"

// Product photos live in public_html/product-images on the live server, outside the build. They cannot sit in a folder named
// "products" there: LiteSpeed would answer /products/<slug> as that folder and redirect to /products/<slug>/, Next.js would
// redirect back, and the product pages would loop. Takes "slug/1.png" or "/products/slug/1.png".
export const PRODUCT_IMAGE_BASE = `${SITE_URL}/product-images`
export const productImage = (path: string) => `${PRODUCT_IMAGE_BASE}/${path.replace(/^\/?products\//, "")}`

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
