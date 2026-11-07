import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

export const BUILD_A_BETTER_FARM: SolutionPageContent = {
  slug: "build-a-better-farm",
  name: "Build a Better Farm",
  summary:
    "Through its programs, Manikstu helps goat-rearing families with raised, ventilated sheds, quality feed and inputs, and the training and expert advice to run a better farm.",
  title: "A strong shed, a stronger family.",
  lede: "Raised sheds, good feed and training, so your goats and your family grow together.",
  lead: {
    src: `${LOCAL_ASSET_BASE}/solutions/build-a-better-farm.webp`,
    alt: "A group of people stands in front of a raised blue goat shed, with goats on its upper floor.",
    quote: "Off the wet ground, her goats sleep dry and safe.",
    caption: "A raised floor helps keep the shed clean and airy.",
  },
  intro: [
    "Your goats give your family so much. They deserve a home that keeps them well. Out in the open, in heat and rain, on damp ground, they fall sick more easily. A good shed changes that. So do the right food and the right know-how.",
    "That is why we help families build a better farm at home. Through programs like Project AJAH and Aangan Lakshmi, selected women get a raised shed in their own backyard, support with feed and inputs, and training to run it well, one step at a time.",
  ],
  pillarsHeading: "Four ways we help you build a better farm",
  pillars: [
    {
      icon: "herd",
      title: "A Shed Above the Damp",
      text: "The shed stands on pillars, off the wet ground. Air moves through it, it stays cleaner, and solar lights keep it bright after dark.",
    },
    {
      icon: "sprout",
      title: "Room to Grow Underneath",
      text: "The space under the shed can hold country chickens, and the manure that collects there can feed your fields or be sold.",
    },
    {
      icon: "health",
      title: "Good Food, Strong Goats",
      text: "Our Goat Feed pellets, Poshak Tatwa syrup and mineral lick blocks help your goats grow strong and give milk.",
    },
    {
      icon: "training",
      title: "Learn From People Who Know",
      text: "Training in feeding, breeding, goat care and farm accounts, with regular guidance to help you run your farm well.",
    },
  ],
  pair: [
    {
      src: `${LOCAL_ASSET_BASE}/about-hero.webp`,
      alt: "Women and men sit in a circle in a meeting room with goat murals on the wall.",
      quote: "Every question she asks makes her farm stronger.",
    },
    {
      src: `${LOCAL_ASSET_BASE}/solutions/protect-your-animals.webp`,
      alt: "Adults holding a young child stand among goats in a shed with a green slatted floor.",
      position: "center 46%",
    },
  ],
  motto: { hi: "अच्छा बाड़ा, स्वस्थ बकरी, खुशहाल घर।", en: "A good shed, a healthy goat, a happy home." },
  stepsHeading: "How a better farm takes shape",
  steps: ["Prepare your backyard for the shed", "Build the raised shed", "Bring in good feed and inputs", "Learn and grow with training"],
  partners: {
    heading: "Sound Sheds. Stronger Enterprises.",
    sub: "A raised shed, quality inputs and trained hands turn a backyard herd into a managed enterprise.",
    why: "Goats kept on open or damp ground face heat, rain, poor ventilation and disease, and many rural households cannot fund proper shelter on their own. In programs such as Project AJAH and Aangan Lakshmi, each selected woman gets an elevated shed with solar lighting, plus input support and training. Government scheme convergence, subject to approvals, helps fund each unit, and in AJAH it is registered in her name. The aim is a working enterprise at home, and a family that can plan beyond the next season.",
    values: [
      {
        title: "Infrastructure That Lowers Risk",
        text: "Raised, ventilated sheds are designed to improve hygiene and keep herds out of the damp conditions linked to disease, protecting the asset at its base.",
      },
      {
        title: "Blended Public and SHG Funding",
        text: "In AJAH and Aangan Lakshmi, each unit pairs proposed government scheme convergence with SHG cluster credit, subject to scheme terms and approvals.",
      },
      {
        title: "More Than One Income Stream",
        text: "The space beneath each shed can hold indigenous poultry, and manure collected below can be used or sold, spreading household income.",
      },
      {
        title: "One Package, Ready to Repeat",
        text: "A steel shed, a starter herd, farmer training, remote monitoring and para-vet support come together in one unit that can be repeated village after village.",
      },
    ],
  },
  cta: {
    heading: "A dry floor for her goats can mean a steadier life for her children.",
    line: "Build the shed once, and a family can grow strong around it.",
    primary: "Build My Farm",
  },
}
