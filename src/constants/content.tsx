import { CONTACT_PAGE, LOCAL_ASSET_BASE, SITE_URL } from "@/constants/site"

import type {
  HeroSlide,
  SolutionItem,
  ImpactStatItem,
  StoryItem,
} from "@/types"

export const AUTOPLAY_MS = 7000

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/hero-conference.webp",

    alt: "A presenter speaking into a microphone on a conference stage",

    position: "74% center",

    // Investor-facing copy, verified against the repo (Nov 2026). The village count is left out on purpose:
    // 700+ (IMPACT_STATS) and 800+ (June 2026 Miller Center press item) disagree.
    eyebrow: "No. 1 India's integrated goat-farming ecosystem",

    title: (
      <>
        Proven at village level. <br />
        <em>Ready for scale.</em>
      </>
    ),

    text: "Manikstu runs an integrated goat-farming ecosystem, from insurance and healthcare to training and market access, through village-level entrepreneurs. Each farm we support gets a shed, breeding stock, insurance, veterinary care and a route to market. Impact capital extends that model to more villages, with farmers at the centre.",

    proof: "7,00,000+ goats insured · 3+ states covered",

    primary: ["Explore the ecosystem", "#solutions"],

    secondary: ["Invest with us", "/investors"],
  },

  {
    // The same photo as slide 1, by request
    image: "/hero-women-goats.webp",

    alt: "Three smiling women farmers holding white baby goats in front of a blue goat shed",

    position: "68% 40%",

    // Written and fact-checked against the site (Nov 2026): the Goat Bank model is from the 2024 press stories in
    // src/constants/resources.ts; the copy describes the model, not the women in the photo
    eyebrow: "The Manikstu Goat Bank",

    title: (
      <>
        Two goats to begin. <br />
        <em>A herd that multiplies.</em>
      </>
    ),

    text: "Goats, not just a loan: our Goat Bank gives a village family two goats to raise for two years. Part of each herd passes on, so another family can begin.",

    proof: "Featured in PM Modi's Mann Ki Baat, February 2024",

    // The #project-ajah section is the story film and the Goat Bank, so "Watch our story" matches it
    primary: ["Watch our story", "#project-ajah"],

    secondary: ["Help it grow", "/join"],
  },

  {
    image: "/hero-farm-shed.webp",

    alt: "An elevated blue steel goat shed with a wooden entry ramp, shaded by trees",

    position: "40% center",

    // Shed facts follow the Build a Better Farm solution page (src/constants/solutions/build-a-better-farm.ts)
    eyebrow: "Climate-smart goat sheds",

    title: (
      <>
        Raised off the ground. <br />
        <em>Built for better farms.</em>
      </>
    ),

    text: "Our sheds stand on pillars, off the wet ground, so goats stay dry and cool and the shed stays cleaner. Air moves through freely, solar lights keep it bright after dark, and the space underneath can hold poultry and collect manure for the fields.",

    primary: ["Build a better farm", "/solutions/build-a-better-farm"],

    secondary: ["Start your farm", "/franchise"],
  },

  {
    image: "/hero-livestock-care.webp",

    alt: "Manikstu livestock care products, including Poshak Tatwa and Livtherapy syrups, Fungi Rakshak, Kurmi Nashak tablets and a Goat Feed bag, displayed on a stone in front of a goat shed",

    position: "78% center",

    zoom: 1.15,

    // Written for farmers and investors alike; chosen and checked against the site's facts (Nov 2026)
    eyebrow: "Livestock health, rural impact",

    title: (
      <>
        Healthy herds. <br />
        <em>Rural prosperity.</em>
      </>
    ),

    text: "Ayurvedic tonics, dewormers, herbal skin care and complete goat feed, made for healthier, more productive goats. Part of a goat-farming model already replicated across villages and states, ready to scale.",

    proof: "10,000+ farmers impacted · 700+ villages reached",

    primary: ["Shop our products", "/products"],

    secondary: ["Invest with us", "/investors"],
  },
]

export const SOLUTIONS: SolutionItem[] = [
  {
    number: "01",

    icon: "health",

    title: "Care for your goats",

    description:
      "Prevent disease, support reproduction and keep your herd healthy.",

    href: "/solutions/care-for-your-goats",
  },

  {
    number: "02",

    icon: "herd",

    title: "Build a better farm",

    description:
      "Better sheds, inputs and expert advice.",

    href: "/solutions/build-a-better-farm",
  },

  {
    number: "03",

    icon: "shield",

    title: "Protect your animals",

    description:
      "Insurance for your goats, because you've worked hard for them.",

    href: "/solutions/protect-your-animals",
  },

  {
    number: "04",

    icon: "market",

    title: "Sell at a fair price",

    description:
      "Get the best value for your goats and use the value of your farm waste.",

    href: "/solutions/sell-at-a-fair-price",
  },

  {
    number: "05",

    icon: "sprout",

    title: "Village level entrepreneurs",

    description:
      "Turn your herd into a steady income with training, finance and market support.",

    href: "/solutions/village-level-entrepreneurs",
  },
]

// Full addresses: our own pictures live in /public, the rest are still served from manikstu.com
export const SOLUTION_IMAGES = [
  `${LOCAL_ASSET_BASE}/solutions/care-for-your-goats.webp`,

  `${SITE_URL}/collaborate-hero.webp`,

  `${LOCAL_ASSET_BASE}/solutions/protect-your-animals.webp`,

  `${LOCAL_ASSET_BASE}/solutions/sell-at-a-fair-price.webp`,

  `${LOCAL_ASSET_BASE}/solutions/village-level-entrepreneurs.webp`,
]

export const IMPACT_STATS: ImpactStatItem[] = [
  { icon: "farmers", value: "10,000+", label: "Farmers impacted" },

  { icon: "villages", value: "700+", label: "Villages reached" },

  { icon: "goats", value: "7,00,000+", label: "Goats insured" },

  { icon: "states", value: "3+", label: "States covered" },
]

export const STORIES: StoryItem[] = [
  {
    image: "ramesh.jpg",

    quote: "The loans and insurance helped me grow my goat farm and income.”",

    name: "Ramesh Pradhan",

    role: "Farmer, Mayurbhanj",
  },

  {
    image: "lakshmi.jpg",

    quote: "With training and proper guidance, our goats are healthier.”",

    name: "Lakshmi Devi",

    role: "Farmer, Kalahandi",
  },

  {
    image: "anita.jpg",

    quote: "The women-led initiative gave me confidence and a steady income.”",

    name: "Anita Majhi",

    role: "Farmer, Balangir",
  },
  // The next three are the wording from the design reference. Confirm them, and add real photos, before launch.
  {
    quote: "Goat rearing has given me a stable income and a brighter future for my family.”",
    name: "Ramesh Kumar",
    role: "Farmer, Odisha",
  },
  {
    quote: "With Manikstu’s support, I started my own goat unit and now I am financially independent.”",
    name: "Savitri Devi",
    role: "Entrepreneur, Bihar",
  },
  {
    quote: "Training and healthcare support have helped us raise healthier goats and better livelihoods.”",
    name: "Laxmi Bai",
    role: "Farmer, Rajasthan",
  },
]

