import { LOCAL_ASSET_BASE } from "@/constants/site"
import type { SolutionPageContent } from "@/types"

export const SELL_AT_A_FAIR_PRICE: SolutionPageContent = {
  slug: "sell-at-a-fair-price",
  name: "Sell at a Fair Price",
  summary:
    "In our programs, live-weight buyback, market linkage and pricing training help goat farmers sell fairly, and goat manure can add income.",
  title: "Your hard work deserves its full price.",
  lede: "Sell by weight, reach better markets and earn from goat manure too.",
  lead: {
    src: `${LOCAL_ASSET_BASE}/solutions/sell-at-a-fair-price.webp`,
    alt: "Two women with a clipboard among goats in a shed with a green slatted floor.",
    quote: "She counts every goat. Now every goat counts.",
    caption: "Counting and recording every goat makes a fair sale easier.",
    position: "left center",
  },
  intro: [
    "You raise each goat with care, through heat, rain and long days. Then the day comes to sell, and too often someone else decides the price. A rushed sale to a local trader can take away much of what you worked for.",
    "That is why we help you sell on fairer terms. Where our programs offer it, a Manikstu buyback based on live weight, as per programme terms, gives you a clear way to sell your goats, and you are still free to use the open market when the price there is better. Even the manure under your shed can bring money home.",
  ],
  pillarsHeading: "Four ways to a fairer sale",
  pillars: [
    {
      icon: "balance",
      title: "Paid by Weight, Not by Guess",
      text: "Where the buyback applies, your goats are priced by live weight at set rates, so the price follows the care you gave.",
    },
    {
      icon: "market",
      title: "A Steadier Way to Sell",
      text: "Buyback and market links give you an organized way to sell, so you can rely less on middlemen and hurried deals.",
    },
    {
      icon: "training",
      title: "Know What Your Goat Is Worth",
      text: "Women learn about marketing and how to set prices in line with the market, so you can bargain with confidence.",
    },
    {
      icon: "sprout",
      title: "Value Beneath the Shed",
      text: "Manure gathers under the raised floor. Use it in your fields or sell it. In some programs it can be processed, packed and bought back.",
    },
  ],
  pair: [
    {
      src: `${LOCAL_ASSET_BASE}/solutions/manikstu-products.webp`,
      alt: "Manikstu product packs: a box of Poshak Tatwa multivitamin syrup, a Goat Feed bag and a Goat Manure pouch.",
      quote: "Even what falls beneath the shed has value.",
    },
    {
      src: `${LOCAL_ASSET_BASE}/hero-slide-2-photo.webp`,
      alt: "Young women in brown work coats and two men in front of a long raised goat shed, with goats in the foreground.",
    },
  ],
  motto: { hi: "मेहनत का पूरा दाम।", en: "The full price for hard work." },
  stepsHeading: "How a fair sale works",
  steps: [
    "Raise healthy goats to sale weight",
    "Weigh each goat for a live-weight price",
    "Sell through buyback, where offered, or the open market",
    "Earn from goat manure as well",
  ],
  partners: {
    heading: "Fair Prices. Stronger Value Chains.",
    sub: "Weight-based buyback, where offered, and market linkage give goats a clearer route to market and farmers a reason to invest.",
    why: "Raising a healthy goat is only half the job; selling it well is the other half. Many farmers depend on local aggregators and distress sales, and can receive less than fair weight-based rates. Our programs add a structured market option: a proposed buyback at live-weight rates, market linkages that aim to reduce reliance on intermediaries, and training in market pricing. Processed, packed manure can add a second product. Less uncertainty at the point of sale lets a mother plan beyond the next lean month.",
    values: [
      {
        title: "Transparent, Weight-Based Pricing",
        text: "Where the buyback applies, live-weight rates replace guesswork at the point of sale, giving farmers and buyers a shared, checkable basis for price.",
      },
      {
        title: "Less Reliance on Intermediaries",
        text: "Buyback arrangements and market linkages aim to give farmers organized access to livestock markets and fewer reasons for distress sales.",
      },
      {
        title: "Value From Farm Waste",
        text: "Manure collected beneath raised sheds can be processed, packed and sold, adding a second income line from the same unit.",
      },
      {
        title: "Women Who Own the Sale",
        text: "Women are trained in marketing and pricing, so the person setting the price is the one who raised the herd.",
      },
    ],
  },
  cta: {
    heading: "When a goat sells for what it is truly worth, a mother's hard work is finally seen.",
    line: "Help us build markets that pay village families fairly.",
    primary: "Sell My Goats",
  },
}
