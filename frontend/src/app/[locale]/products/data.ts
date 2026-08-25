import {
  Leaf,
  UserCheck,
  Truck,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export interface Review {
  id: number;
  author: string;
  location?: string;
  rating: number; // 1..5
  date: string;
  title?: string;
  body: string;
  verified?: boolean;
  helpful?: number;
}

export interface Question {
  id: number;
  asker: string;
  askedAt: string;
  question: string;
  answer?: string;
  answerer?: string;
  answeredAt?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: { name: string } | null;
  size?: string;
  highlights?: string[];
  longDescription?: string;
  rating?: number;                   // 0..5 (one decimal ok)
  ratingCount?: number;              // total ratings
  ratingBreakdown?: [number, number, number, number, number]; // [5⭐, 4⭐, 3⭐, 2⭐, 1⭐]
  reviews?: Review[];
  questions?: Question[];
  specifications?: Array<{ label: string; value: string }>;
  usage?: string;
  storage?: string;
  ingredients?: string;
  recommendedFor?: string[];
  gallery?: string[];
}

// Reasonable defaults used when a product has no reviews yet — keeps the
// UI visually complete for every product without duplicating data.
export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Ramesh Pradhan",
    location: "Mayurbhanj, Odisha",
    rating: 5,
    date: "Feb 12, 2024",
    title: "Excellent quality — my goats love it",
    body:
      "Started using this two months ago on my herd of 24 goats. I can already see better weight gain and coats look shinier. Delivery to my village was on time.",
    verified: true,
    helpful: 42,
  },
  {
    id: 2,
    author: "Lakshmi Devi",
    location: "Keonjhar, Odisha",
    rating: 4,
    date: "Jan 28, 2024",
    title: "Good product, packaging could be sturdier",
    body:
      "Works well and price is reasonable for the quantity. One bag was slightly torn on arrival but nothing was lost. Would order again.",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    author: "Sanjay Nayak",
    location: "Kalahandi, Odisha",
    rating: 5,
    date: "Jan 05, 2024",
    title: "Recommended by our vet",
    body:
      "Our field veterinarian suggested this and I trust his advice. Three weeks in — visible improvement in my lactating does. Milk yield is up too.",
    verified: true,
    helpful: 27,
  },
];

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    asker: "Prakash B.",
    askedAt: "Feb 20, 2024",
    question: "How much should I give per goat per day?",
    answer:
      "For adult goats, we recommend 200–300 gm per day mixed with regular feed. For kids and lactating does the dosage is different — please check the label or ask on our helpline.",
    answerer: "Manikstu Support",
    answeredAt: "Feb 21, 2024",
  },
  {
    id: 2,
    asker: "Anita M.",
    askedAt: "Feb 10, 2024",
    question: "Is this safe for pregnant goats?",
    answer:
      "Yes, absolutely — it is safe for pregnant and lactating goats. In fact many farmers use it specifically during these stages for better outcomes.",
    answerer: "Manikstu Support",
    answeredAt: "Feb 11, 2024",
  },
  {
    id: 3,
    asker: "Suresh K.",
    askedAt: "Jan 30, 2024",
    question: "Do you deliver to remote villages in Chhattisgarh?",
    answer:
      "Yes, we deliver across Odisha, Chhattisgarh and Maharashtra. Delivery timelines depend on the pin code — typically 5–8 working days for interior villages.",
    answerer: "Manikstu Support",
    answeredAt: "Jan 31, 2024",
  },
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: -1,
    name: "Goat Feed",
    slug: "goat-feed",
    description: "Complete and balanced nutrition for healthy growth and productivity.",
    price: 850,
    image: "",
    category: { name: "Nutrition" },
    size: "25 kg",
    highlights: [
      "Balanced protein, energy and mineral profile",
      "Formulated for all life stages of goats",
      "Supports better weight gain and milk yield",
      "Made from farmer-tested, quality ingredients",
    ],
    longDescription:
      "A scientifically formulated feed blend that provides complete daily nutrition for goats across all life stages — from kids to lactating does. Regular feeding improves growth, productivity, and overall herd health while reducing dependence on scarce green fodder.",
    rating: 4.5,
    ratingCount: 1284,
    ratingBreakdown: [820, 310, 92, 38, 24],
    specifications: [
      { label: "Form", value: "Pellet" },
      { label: "Packaging Type", value: "Bag" },
      { label: "Grade Standard", value: "Feed Grade" },
      { label: "Shelf Life", value: "6 months" },
      { label: "Type Of Supplement", value: "Complete Feed" },
      { label: "Packaging", value: "25 kg" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    usage:
      "Feed 300–500 gm per adult goat per day, mixed with regular ration. Introduce gradually over 5–7 days when switching feeds.",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal the bag after every use. Keep out of reach of children.",
    ingredients:
      "Maize, soybean meal, rice bran, molasses, calcium carbonate, common salt, vitamin & mineral premix.",
    recommendedFor: [
      "Farmers looking to improve growth rate of their goats",
      "Lactating does needing higher nutrient density",
      "Rearing kids from 3 months onwards",
      "Farms with limited access to quality green fodder",
    ],
    gallery: ["/1.png", "/2.png", "/3.png", "/4.png"],
  },
  {
    id: -2,
    name: "Herbal Booster",
    slug: "herbal-booster",
    description: "Improves immunity, digestion and overall goat health.",
    price: 450,
    image: "",
    category: { name: "Health" },
    size: "500 ml",
    highlights: [
      "Traditional herbal blend with modern extraction",
      "Boosts appetite and digestive health",
      "Supports immunity during seasonal transitions",
      "Safe for daily long-term use",
    ],
    longDescription:
      "A natural liquid supplement crafted from time-tested herbs, designed to strengthen the immune system, aid digestion, and improve the overall vitality of the herd. Especially useful during monsoon and winter months.",
    rating: 4.3,
    ratingCount: 742,
    ratingBreakdown: [420, 200, 78, 28, 16],
    specifications: [
      { label: "Form", value: "Liquid" },
      { label: "Packaging Type", value: "Bottle" },
      { label: "Grade Standard", value: "Food Grade" },
      { label: "Shelf Life", value: "1 year" },
      { label: "Type Of Supplement", value: "Nutritional Supplement" },
      { label: "Packaging", value: "500 ml" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    ingredients:
      "Ashwagandha, Shatavari, Amla, Giloy, Neem extract, natural fruit sweeteners.",
    usage:
      "10 ml twice a day for adult goats, mixed with water or feed. Continue for 21 days for best results.",
    storage:
      "Keep tightly closed. Store below 30°C, away from direct sunlight.",
    recommendedFor: [
      "Herds recovering from illness or transport stress",
      "Seasonal immunity support during monsoon and winter",
      "Farms wanting a chemical-free daily tonic",
    ],
    gallery: ["/5.png", "/6.png", "/7.png", "/8.png"],
  },
  {
    id: -3,
    name: "Mineral Mixture",
    slug: "mineral-mixture",
    description: "Essential minerals for strong bones, better growth and fertility.",
    price: 300,
    image: "",
    category: { name: "Nutrition" },
    size: "1 kg",
    highlights: [
      "Complete macro & trace mineral profile",
      "Improves bone strength in growing kids",
      "Supports fertility and reproductive health",
      "Easily mixed with daily feed",
    ],
    longDescription:
      "A precisely balanced mineral supplement that fills the gaps in a typical grazing diet, helping goats grow stronger, breed better, and recover faster from stress. A small daily dose delivers long-term benefits.",
    rating: 4.6,
    ratingCount: 512,
    ratingBreakdown: [360, 110, 25, 10, 7],
    specifications: [
      { label: "Form", value: "Powder" },
      { label: "Packaging Type", value: "Container" },
      { label: "Grade Standard", value: "Feed Grade" },
      { label: "Shelf Life", value: "12 months" },
      { label: "Type Of Supplement", value: "Mineral Supplement" },
      { label: "Packaging", value: "1 kg" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    usage:
      "Mix 15–20 gm per adult goat per day into feed. Continue daily during growth, lactation and stress periods.",
    storage:
      "Store in a cool, dry place. Keep the container tightly closed after use.",
    ingredients:
      "Di-calcium phosphate, calcium carbonate, magnesium oxide, salt, trace minerals (Zn, Cu, Mn, Fe, I, Se).",
    recommendedFor: [
      "Growing kids showing weak bones or slow growth",
      "Lactating does — supports milk yield and calcium demand",
      "Breeding bucks and pregnant does",
      "Farms noticing signs of mineral deficiency (pica, poor coat)",
    ],
    gallery: ["/9.png", "/10.png", "/11.png", "/12.png"],
  },
  {
    id: -4,
    name: "Dewormer Powder",
    slug: "dewormer-powder",
    description: "Helps control internal worms and keeps goats healthy.",
    price: 120,
    image: "",
    category: { name: "Health" },
    size: "100 gm",
    highlights: [
      "Broad-spectrum internal parasite control",
      "Easy oral administration",
      "Trusted by field veterinarians",
      "Suitable for regular deworming schedules",
    ],
    longDescription:
      "An easy-to-use dewormer powder for scheduled internal parasite control. Reduces production losses from worm infestations and keeps herds thriving on pasture.",
    rating: 4.2,
    ratingCount: 386,
    ratingBreakdown: [210, 105, 42, 18, 11],
    specifications: [
      { label: "Form", value: "Powder" },
      { label: "Packaging Type", value: "Sachet" },
      { label: "Grade Standard", value: "Veterinary Grade" },
      { label: "Shelf Life", value: "24 months" },
      { label: "Type Of Supplement", value: "Anthelmintic" },
      { label: "Packaging", value: "100 gm" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    ingredients:
      "Broad-spectrum anthelmintic actives with palatable carrier for oral administration.",
    usage:
      "1 gm per 10 kg body weight, administered orally with feed. Repeat every 3 months as part of routine deworming.",
    storage:
      "Store in a cool, dry place. Keep out of reach of children and away from feed.",
    recommendedFor: [
      "Routine quarterly deworming schedules",
      "Herds showing signs of parasite load (poor coat, weight loss)",
      "Newly acquired stock during quarantine",
    ],
  },
  {
    id: -5,
    name: "Calcium Supplement",
    slug: "calcium-supplement",
    description: "Strengthens bones and improves milk yield in lactating goats.",
    price: 220,
    image: "",
    category: { name: "Nutrition" },
    size: "500 gm",
    highlights: [
      "Highly bioavailable calcium source",
      "Improves milk yield in lactating does",
      "Prevents milk fever and weakness",
      "Fortified with vitamin D3",
    ],
    longDescription:
      "A concentrated calcium supplement fortified with vitamin D3, formulated to prevent milk fever, weakness, and bone disorders — especially in high-producing lactating does.",
    rating: 4.4,
    ratingCount: 268,
    ratingBreakdown: [170, 65, 20, 8, 5],
    specifications: [
      { label: "Form", value: "Powder" },
      { label: "Packaging Type", value: "Container" },
      { label: "Grade Standard", value: "Feed Grade" },
      { label: "Shelf Life", value: "18 months" },
      { label: "Type Of Supplement", value: "Mineral Supplement" },
      { label: "Packaging", value: "500 gm" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    ingredients:
      "Calcium carbonate, calcium phosphate, vitamin D3, magnesium, essential trace minerals.",
    usage:
      "10–15 gm per adult goat per day, mixed with feed. Increase to 20 gm during late pregnancy and peak lactation.",
    storage: "Keep the container closed. Store in a cool, dry place.",
    recommendedFor: [
      "High-yielding lactating does",
      "Late-pregnancy does — prevents milk fever",
      "Growing kids showing weak bones",
    ],
  },
  {
    id: -6,
    name: "Fodder Seed Mix",
    slug: "fodder-seed-mix",
    description: "High-yield seed mix for green fodder cultivation year-round.",
    price: 180,
    image: "",
    category: { name: "Fodder" },
    size: "1 kg",
    highlights: [
      "Multi-cut, high-yield fodder varieties",
      "Suitable for irrigated and rainfed plots",
      "Improves on-farm green fodder availability",
      "Reduces feed cost year-round",
    ],
    longDescription:
      "A curated mix of proven multi-cut fodder seed varieties that grow well across Indian agro-climatic zones. Cultivating this on even a small patch of land dramatically reduces feed cost and improves herd health.",
    rating: 4.7,
    ratingCount: 194,
    ratingBreakdown: [150, 30, 8, 4, 2],
    specifications: [
      { label: "Form", value: "Seed" },
      { label: "Packaging Type", value: "Pouch" },
      { label: "Grade Standard", value: "Certified Seed" },
      { label: "Shelf Life", value: "12 months" },
      { label: "Type Of Supplement", value: "Multi-cut Fodder" },
      { label: "Packaging", value: "1 kg" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    ingredients:
      "Napier grass, Berseem, Lucerne, Guinea grass, Sorghum sudan (varietal mix).",
    usage:
      "Broadcast 8–10 kg per acre on well-prepared land. Irrigate lightly after sowing; first cut in 55–70 days.",
    storage:
      "Store in a dry, cool place. Avoid moisture and direct sunlight to preserve germination.",
    recommendedFor: [
      "Farms wanting to build a year-round green fodder base",
      "Small-holder families using kitchen gardens for fodder",
      "Reducing dependence on purchased feed",
    ],
  },
];

export type TrustFeature = { icon: LucideIcon; title: string; subtitle: string };

export const trustFeatures: TrustFeature[] = [
  { icon: Leaf, title: "Quality Assured", subtitle: "Carefully selected and tested for best results." },
  { icon: UserCheck, title: "Farmer Trusted", subtitle: "Products used and trusted by farmers." },
  { icon: Truck, title: "Reliable Delivery", subtitle: "Safe and timely delivery at your doorstep." },
  { icon: Headphones, title: "Support", subtitle: "We are here to help you always." },
];
