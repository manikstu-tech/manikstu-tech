import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

export const PROTECT_YOUR_ANIMALS: SolutionPageContent = {
  slug: "protect-your-animals",
  name: "Protect Your Animals",
  summary:
    "Manikstu Agro's Goat Insurance Initiative keeps goats healthy, recorded and insured with ear tags, vaccines, Pashu Sakhi visits and claim help.",
  title: "Your goat is your family's future.",
  lede: "Ear tags, vaccines, village care and claim help, all in one place.",
  lead: {
    src: `${LOCAL_ASSET_BASE}/solutions/care-for-your-goats.webp`,
    alt: "A woman tends goats in a raised shed; the goat in front wears an identification ear tag.",
    quote: "Her savings are not in a bank. They graze.",
    caption: "Every insured goat carries its own identification tag.",
  },
  intro: [
    "We know what your goats mean to you. They are your savings. They pay for school fees, medicine and food in hard months. When money is short, they are there. Losing even one can hurt the whole home.",
    "That is why our Goat Insurance Initiative exists. From Kalahandi to villages across Odisha and Chhattisgarh, we stand with farmers like you, keeping your goats healthy, recorded and insured, so you can rest a little easier.",
  ],
  pillarsHeading: "Four ways we protect your goats",
  pillars: [
    {
      icon: "goats",
      title: "Every Goat Gets Its Tag",
      text: "Each insured goat gets its own ear tag, so it is registered, its records stay safe and it is easy to trace.",
    },
    {
      icon: "health",
      title: "Care Before Sickness Comes",
      text: "Vaccines on time and regular health checks stop illness early. A healthy goat means peace of mind.",
    },
    {
      icon: "farmers",
      title: "Your Pashu Sakhi Is Near",
      text: "A trained Pashu Sakhi from your own area visits often, checks on your goats and keeps their health records.",
    },
    {
      icon: "shield",
      title: "Help When It Hurts Most",
      text: "If an insured goat dies, we help eligible farmers with the papers and checks, so the claim is settled on time, as the policy terms allow.",
    },
  ],
  pair: [
    {
      src: `${LOCAL_ASSET_BASE}/solutions/village-level-entrepreneurs.webp`,
      alt: "Women farmers at a community training session.",
    },
    {
      src: `${LOCAL_ASSET_BASE}/solutions/protect-your-animals.webp`,
      alt: "A family with a young child visits goats at a raised goat shed.",
      quote: "A healthy goat today is a school bag tomorrow.",
      position: "center 46%",
    },
  ],
  motto: { hi: "बकरी सुरक्षित, परिवार सुरक्षित।", en: "Goat safe, family safe." },
  stepsHeading: "How protection works",
  steps: ["Tag and register each goat", "Vaccinate and prevent disease", "Regular visits by Pashu Sakhis", "Help with every claim"],
  partners: {
    heading: "Protected Goats. Bankable Futures.",
    sub: "Tagged, vaccinated and monitored, every goat becomes a lower-risk asset a farmer can build on.",
    why: "One death can wipe out years of a family's progress. Animals without insurance or records are hard to lend against or underwrite. Our model changes that: every insured goat is ear-tagged, vaccinated on time and checked regularly by trained Pashu Sakhis, so each one has a recorded health history. That record lowers risk for insurers, builds confidence for lenders and turns a fragile herd into a protected asset.",
    values: [
      {
        title: "Risk Reduced Through Data",
        text: "Ear tags and health records give every insured animal a traceable identity, which supports sounder underwriting and verifiable claims.",
      },
      {
        title: "Last-Mile Reach, Built In",
        text: "Pashu Sakhis come from the villages they serve, so care reaches places that standard distribution rarely does.",
      },
      {
        title: "Women's Financial Resilience",
        text: "Protecting a goat protects a livelihood, helping women farmers keep their assets and recover from losses.",
      },
      {
        title: "Built to Scale",
        text: "It started with a handful of farmers in Kalahandi and now runs across states on one repeatable model.",
      },
    ],
  },
  cta: {
    heading: "Protect one goat, and a mother can keep planning for her children's future.",
    line: "Your support does more than insure a goat. It keeps a family's hope standing.",
    primary: "Insure My Goats",
  },
}
