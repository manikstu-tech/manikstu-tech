export type Category = "Featured" | "Event" | "Press" | "Media";

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: Category;
  excerpt: string;
  image: string;
  featured: boolean;
}

export const categoryColors: Record<Category, string> = {
  Featured: "bg-manikstu-green",
  Event: "bg-manikstu-red",
  Press: "bg-manikstu-gold",
  Media: "bg-saura-red",
};

export const articles: Article[] = [
  {
    id: "1",
    title: "Manikstu's Goat Bank featured in Mann Ki Baat",
    slug: "mann-ki-baat-feature",
    date: "Feb 25, 2024",
    category: "Featured",
    excerpt:
      "Our innovative Goat Bank model was highlighted by the Hon'ble Prime Minister in his monthly radio address, recognizing its impact on rural livelihoods.",
    image: "/1.png",
    featured: true,
  },
  {
    id: "2",
    title: "PM Modi meets with Odisha Govt. for Rural Development",
    slug: "pm-odisha-rural-development",
    date: "Jan 14, 2024",
    category: "Event",
    excerpt:
      "A landmark meeting between the Hon'ble Prime Minister and Odisha state officials to discuss rural development initiatives including goat farming programs.",
    image: "/2.png",
    featured: false,
  },
  {
    id: "3",
    title: "CEO receives Emerging Women Entrepreneur Award",
    slug: "emerging-women-entrepreneur",
    date: "Dec 15, 2023",
    category: "Press",
    excerpt:
      "Our CEO was honored with the Emerging Women Entrepreneur Award for her transformative work in agricultural empowerment and rural innovation.",
    image: "/3.png",
    featured: false,
  },
  {
    id: "4",
    title: "Manikstu Initiative on Goat Farming featured in Dainik Jagran",
    slug: "dainik-jagran-coverage",
    date: "Mar 08, 2024",
    category: "Media",
    excerpt:
      "Dainik Jagran covered our goat farming initiative, highlighting how technology-driven approaches are revolutionizing traditional farming in Odisha.",
    image: "/4.png",
    featured: false,
  },
  {
    id: "5",
    title: "Partnership with NABARD for Rural Credit Expansion",
    slug: "nabard-partnership",
    date: "Nov 20, 2023",
    category: "Featured",
    excerpt:
      "A strategic partnership with NABARD to expand rural credit facilities for goat farmers across Odisha, Chhattisgarh, and Maharashtra.",
    image: "/5.png",
    featured: false,
  },
  {
    id: "6",
    title: "Annual Stakeholder Meeting 2023",
    slug: "annual-stakeholder-meeting",
    date: "Oct 05, 2023",
    category: "Event",
    excerpt:
      "Our annual stakeholder meeting brought together farmers, partners, and government officials to review progress and plan the year ahead.",
    image: "/6.png",
    featured: false,
  },
  {
    id: "7",
    title: "Manikstu featured in The Hindu Business Line",
    slug: "hindu-business-line",
    date: "Sep 18, 2023",
    category: "Press",
    excerpt:
      "The Hindu Business Line published an in-depth feature on our Goat Bank model and its potential to transform rural economies across India.",
    image: "/7.png",
    featured: false,
  },
  {
    id: "8",
    title: "Mobile App Launch for Farmer Onboarding",
    slug: "mobile-app-launch",
    date: "Aug 12, 2023",
    category: "Media",
    excerpt:
      "Launch of our mobile application designed to streamline farmer onboarding, village visits, and delivery of essential agricultural services.",
    image: "/8.png",
    featured: false,
  },
];
