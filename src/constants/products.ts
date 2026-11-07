import details from "@/data/productDetails.json"

// Copied from manikstu.com/products. Prices, sizes and stock change on that site, so check it before relying on them here.
export type Product = {
  slug: string
  name: string
  category: "Health" | "Nutrition"
  tagline: string
  size: string
  price: number
  inStock: boolean
  // Path under manikstu.com/products
  image: string
}

export const PRODUCTS: Product[] = [
  {
    slug: "poshak-tatwa",
    name: "Poshak Tatwa",
    category: "Health",
    tagline:
      "Ayurvedic multivitamin syrup that boosts livestock health, growth, and productivity.",
    size: "300 ml",
    price: 249,
    inStock: true,
    image: "poshak-tatwa/1.png",
  },
  {
    slug: "livtherapy-syrup",
    name: "Livtherapy Syrup",
    category: "Health",
    tagline:
      "Powerful Ayurvedic liver tonic that supports hepatic function and recovery.",
    size: "1 Kg",
    price: 173,
    inStock: true,
    image: "livtherapy-syrup/1.png",
  },
  {
    slug: "pachak-tatwa",
    name: "Pachak Tatwa",
    category: "Health",
    tagline:
      "Potent Ayurvedic digestive tonic that stimulates appetite and gut health.",
    size: "200 ml",
    price: 172,
    inStock: true,
    image: "pachak-tatwa/1.png",
  },
  {
    slug: "kurmi-nashak",
    name: "Kurmi Nashak",
    category: "Health",
    tagline: "Ayurvedic deworming tablets for internal parasite control.",
    size: "Pack of 10",
    price: 150,
    inStock: false,
    image: "kurmi-nashak/1.png",
  },
  {
    slug: "tickclear-soap",
    name: "Tickclear Soap",
    category: "Health",
    tagline:
      "Medicated soap that protects livestock from ticks, lice, mites and other external parasites.",
    size: "125 gm",
    price: 130,
    inStock: true,
    image: "tickclear-soap/1.png",
  },
  {
    slug: "fungi-rakshak",
    name: "Fungi Rakshak",
    category: "Health",
    tagline: "Natural plant-based antifungal cream for livestock skin health.",
    size: "100 gm",
    price: 185,
    inStock: true,
    image: "fungi-rakshak/1.png",
  },
  {
    slug: "multi-mineral-lick-block",
    name: "Multi Mineral Lick Block",
    category: "Nutrition",
    tagline:
      "Natural trace mineral lick block that supports livestock health and performance.",
    size: "1 kg",
    price: 250,
    inStock: true,
    image: "multi-mineral-lick-block/1.png",
  },
  {
    slug: "black-salt-block",
    name: "Black Salt Block",
    category: "Nutrition",
    tagline:
      "Ayurvedic black-salt lick for digestion, electrolyte balance and detox.",
    size: "1 kg",
    price: 250,
    inStock: true,
    image: "black-salt-block/1.png",
  },
  {
    slug: "sulphur-block",
    name: "Sulphur Block",
    category: "Nutrition",
    tagline:
      "Sulphur-rich lick block for skin, metabolism and detoxification support.",
    size: "1 kg",
    price: 220,
    inStock: true,
    image: "sulphur-block/1.png",
  },
  {
    slug: "calcium-block",
    name: "Calcium Block",
    category: "Nutrition",
    tagline: "Pure plant-derived calcium block for daily livestock calcium needs.",
    size: "1 kg",
    price: 250,
    inStock: true,
    image: "calcium-block/1.png",
  },
  {
    slug: "pink-salt-block",
    name: "Pink Salt Block",
    category: "Nutrition",
    tagline:
      "Natural pink-salt lick rich in essential trace minerals and electrolytes.",
    size: "1 kg",
    price: 275,
    inStock: true,
    image: "pink-salt-block/1.png",
  },
  {
    slug: "protein-block",
    name: "Protein Block",
    category: "Nutrition",
    tagline:
      "Nutritional lick block that supplements essential protein for growth and milk production.",
    size: "1 kg",
    price: 275,
    inStock: true,
    image: "protein-block/1.png",
  },
  {
    slug: "cobalt-block",
    name: "Cobalt Block",
    category: "Nutrition",
    tagline:
      "Cobalt-rich lick block for rumen Vitamin B12 synthesis and energy metabolism.",
    size: "1 kg",
    price: 275,
    inStock: true,
    image: "cobalt-block/1.png",
  },
  {
    slug: "super-supplement-block",
    name: "Super Supplement Block",
    category: "Nutrition",
    tagline:
      "Premium multi-nutrient lick block for balanced daily supplementation.",
    size: "1 kg",
    price: 250,
    inStock: true,
    image: "super-supplement-block/1.png",
  },
  {
    slug: "goat-feed",
    name: "Goat Feed",
    category: "Nutrition",
    tagline:
      "Complete pelleted feed that supports growth, milk yield and overall goat productivity.",
    size: "10 kg",
    price: 350,
    inStock: true,
    image: "goat-feed/goat-feed-main.png",
  },
]

export const PRODUCT_ASSURANCE = [
  { text: "Trusted by farmers across India", icon: "sprout" },
  { text: "Safe and effective formulations", icon: "shield" },
  { text: "Supports healthier animals and better livelihoods", icon: "herd" },
] as const

export const PRODUCT_TRUST = [
  { title: "Quality assured", text: "Carefully selected and tested for best results.", icon: "shield" },
  { title: "Farmer trusted", text: "Products used and trusted by farmers.", icon: "farmers" },
  { title: "Reliable delivery", text: "Safe and timely delivery at your doorstep.", icon: "truck" },
  { title: "Support", text: "We are here to help you always.", icon: "headset" },
] as const

// Per-product page content, generated by `node scripts/products/scrape.mjs` from manikstu.com
export type ProductDetail = {
  why: string[]
  specs: [string, string][]
  composition: string
  storage: string
  description: string[]
  features: string[]
  recommended: string[]
  dosage: string[]
  // Paths under manikstu.com, main shot first
  images: string[]
  // YouTube id of the product video
  video: string | null
}

export const PRODUCT_DETAILS = details as unknown as Record<string, ProductDetail>
