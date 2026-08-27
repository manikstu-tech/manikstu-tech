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
  rating?: number;
  ratingCount?: number;
  ratingBreakdown?: [number, number, number, number, number];
  reviews?: Review[];
  questions?: Question[];
  specifications?: Array<{ label: string; value: string }>;
  usage?: string;
  storage?: string;
  ingredients?: string;
  recommendedFor?: string[];
  gallery?: string[];
}

/**
 * Trust badges shown around the product surfaces. These are marketing chrome
 * (not products), so they stay client-side.
 */
export type TrustFeature = { icon: LucideIcon; title: string; subtitle: string };

export const trustFeatures: TrustFeature[] = [
  { icon: Leaf, title: "Quality Assured", subtitle: "Carefully selected and tested for best results." },
  { icon: UserCheck, title: "Farmer Trusted", subtitle: "Products used and trusted by farmers." },
  { icon: Truck, title: "Reliable Delivery", subtitle: "Safe and timely delivery at your doorstep." },
  { icon: Headphones, title: "Support", subtitle: "We are here to help you always." },
];
