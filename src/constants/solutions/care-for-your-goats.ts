import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

export const CARE_FOR_YOUR_GOATS: SolutionPageContent = {
  slug: "care-for-your-goats",
  name: "Care for Your Goats",
  summary:
    "Manikstu Agro helps keep goat herds healthy with veterinary care, vaccination, breeding support, feed and supplements, and Pashu Sakhi visits.",
  title: "A healthy herd is a hopeful home.",
  lede: "Vet care, vaccines, breeding help and good feed, close to your village.",
  lead: {
    src: `${LOCAL_ASSET_BASE}/solutions/sell-at-a-fair-price.webp`,
    alt: "Two women with a clipboard stand among goats in a shed with a green slatted floor.",
    quote: "She knows every goat by name, and every cough by heart.",
    caption: "Regular health checks and simple records help a herd stay well.",
  },
  intro: [
    "When a goat falls sick, the whole home feels it. You sit up at night beside her. You count what you might lose. Every mother who rears goats knows this fear. You should not have to face it alone.",
    "That is why we bring care closer to you. Where our programs run, trained Pashu Sakhis and para-vets check on your herd. Your goats get treatment when they fall ill and vaccines before they do. We help with breeding, and with feed and supplements that keep your herd strong, season after season.",
  ],
  pillarsHeading: "Four ways we care for your herd",
  pillars: [
    {
      icon: "health",
      title: "Care That Comes to You",
      text: "In our programs, Pashu Sakhis and para-vets visit your herd, and veterinary treatment is there when a goat falls ill.",
    },
    {
      icon: "shield",
      title: "Vaccines Before Trouble Starts",
      text: "Vaccines given on a calendar help protect your goats before illness spreads. Some programs plan for PPR, FMD and goat pox.",
    },
    {
      icon: "herd",
      title: "Help With Breeding and Kids",
      text: "Good breeding bucks, planned kidding and care for newborn kids help your herd grow, one healthy birth at a time.",
    },
    {
      icon: "sprout",
      title: "Food That Builds Strength",
      text: "Goat feed, mineral lick blocks and Poshak Tatwa, our multivitamin syrup, give your goats what grazing alone can miss.",
    },
  ],
  pair: [
    {
      src: `${LOCAL_ASSET_BASE}/solutions/care-for-your-goats.webp`,
      alt: "A woman tends goats in a raised shed; the goat in front has an ear tag.",
      quote: "Every goat she checks is a worry she can set down.",
    },
    {
      src: `${LOCAL_ASSET_BASE}/solutions/manikstu-products.webp`,
      alt: "Manikstu product packs: Poshak Tatwa multivitamin syrup, a Goat Feed bag and a Goat Manure pouch.",
    },
  ],
  motto: { hi: "स्वस्थ बकरी, खुशहाल घर।", en: "Healthy goat, happy home." },
  stepsHeading: "How care works",
  steps: [
    "Health checks by Pashu Sakhis",
    "Vaccines on a fixed calendar",
    "Planned breeding and kid care",
    "Feed and supplements for strength",
  ],
  partners: {
    heading: "Healthy Herds. Stronger Rural Enterprises.",
    sub: "Prevention, treatment and planned breeding turn a vulnerable herd into a better-managed rural asset.",
    why: "In unorganized goat farming, limited veterinary access, inadequate vaccination and poor management drive high mortality, and every loss erodes a family's savings. Our model puts care at the village level: trained Pashu Sakhis and para-vets, veterinary treatment, a vaccination calendar, planned breeding and nutrition support. Healthier animals help reduce avoidable losses, support steadier herd growth and give insurers and funders a sounder base. Behind each healthy goat is a mother who can plan again.",
    values: [
      {
        title: "Prevention Before Payouts",
        text: "Vaccination on a calendar and regular checks aim to stop disease before it spreads, cutting avoidable losses before any claim is made.",
      },
      {
        title: "Care Where Herds Live",
        text: "Trained Pashu Sakhis and para-vets take treatment and advice to villages where veterinary access is limited.",
      },
      {
        title: "Breeding That Builds Assets",
        text: "Selected breeding bucks, planned kidding and care for newborn kids help a small starter herd grow into a lasting enterprise.",
      },
      {
        title: "Women at the Center",
        text: "Our programs center rural women, so keeping a herd healthy protects an asset she manages and an income she earns.",
      },
    ],
  },
  cta: {
    heading: "Keep one goat healthy, and a mother has fewer losses to count.",
    line: "Your support brings care to a herd, and calm to a home.",
    primary: "Get Goat Care",
  },
}
