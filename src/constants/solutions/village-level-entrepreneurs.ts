import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

export const VILLAGE_LEVEL_ENTREPRENEURS: SolutionPageContent = {
  slug: "village-level-entrepreneurs",
  name: "Village Level Entrepreneurs",
  summary:
    "Manikstu Agro helps village women build goat enterprises with training, SHG credit, the Goat Bank, Pashu Sakhi support and, where offered, buyback.",
  title: "Your herd can become your own business.",
  lede: "Training, SHG credit where schemes allow, the Goat Bank and help to sell, close to home.",
  lead: {
    src: `${LOCAL_ASSET_BASE}/solutions/village-level-entrepreneurs.webp`,
    alt: "A large group, mostly women, gathers indoors for a session, with painted animal motifs on the wall.",
    quote: "She came to learn. She left with a plan.",
    caption: "Training covers goat rearing, basic medication, fodder collection and setting fair prices.",
  },
  intro: [
    "You have reared goats for years. You know when one is hungry, when one is sick and when one is ready to sell. What was missing was never your skill. It was the support around you.",
    "That is what we build with you. Since we began in Kalahandi in 2015, we have worked with women to turn a few goats into a business of their own, with training, the Goat Bank, trained Pashu Sakhis, help to sell and, in some programs, credit through Self-Help Groups.",
  ],
  pillarsHeading: "Four ways we help you grow",
  pillars: [
    {
      icon: "training",
      title: "Learn It, Then Lead It",
      text: "Learn goat rearing, basic medicine, fodder collection and simple farm accounts, and how to set a fair price in line with the market.",
    },
    {
      icon: "goats",
      title: "Begin With the Goat Bank",
      text: "The Goat Bank can give your family two goats to raise for two years. When kids are born, part of the herd passes on so another family can begin.",
    },
    {
      icon: "farmers",
      title: "Credit Through Your SHG",
      text: "In projects such as AJAH and Aangan Lakshmi, Self-Help Group cluster credit helps women set up their own goat unit, as each scheme's terms allow.",
    },
    {
      icon: "market",
      title: "A Buyer When You Are Ready",
      text: "Where the buyback applies, Manikstu buys goats by live weight, so you need not be pushed into a distress sale. The open market stays open to you.",
    },
  ],
  pair: [
    {
      src: `${LOCAL_ASSET_BASE}/hero-slide-2-photo.webp`,
      alt: "Young women in brown work coats stand with two men in front of a long raised goat shed, with goats in the foreground.",
    },
    {
      src: `${LOCAL_ASSET_BASE}/hero-slide-3-photo.webp`,
      position: "center 10%",
      alt: "A woman speaks into a microphone beside a seated woman; below, goats stand in front of a raised blue shed.",
      quote: "Her herd, her records, her income.",
    },
  ],
  motto: { hi: "मेरी बकरी, मेरा कारोबार।", en: "My goat, my business." },
  stepsHeading: "How you get started",
  steps: ["Connect through your SHG or our team", "Train in rearing and accounts", "Start your own goat unit", "Sell by weight where buyback applies"],
  partners: {
    heading: "Women-Led Enterprises. Village by Village.",
    sub: "Training, SHG credit and a buyback route can turn backyard herds into enterprises that women own and run.",
    why: "Rural women have long reared goats, yet few have the training, credit or market access to run them as a business. Our model brings these together. Women train in rearing, health and accounts; in AJAH and Aangan Lakshmi, SHG cluster credit and government scheme convergence fund the unit, subject to approvals; the Goat Bank passes kids on to new families; and, where offered, a weight-based buyback gives a structured way to sell. When a mother runs her own enterprise, the whole household stands stronger.",
    values: [
      {
        title: "Financed Through SHG Structures",
        text: "In AJAH and Aangan Lakshmi, SHG cluster credit and scheme convergence fund each unit, with repayment intended to come from the enterprise's income.",
      },
      {
        title: "Local Youth, Local Capacity",
        text: "Unemployed local youth are trained as Pashu Seva Adhikaris and paid per visit, alongside a Pashu Sakhi and para-vet network.",
      },
      {
        title: "A Route to Market",
        text: "Where offered, a weight-based buyback for goats and manure gives producers a structured sales route and an alternative to distress sales.",
      },
      {
        title: "A Model That Multiplies",
        text: "Through the Goat Bank, part of each herd passes to new families, so each family helps the next household begin.",
      },
    ],
  },
  cta: {
    heading: "Help one woman start her goat business, and her children grow up seeing what she can do.",
    line: "Your support can turn her skill into an income she owns.",
    primary: "Start My Enterprise",
  },
}
