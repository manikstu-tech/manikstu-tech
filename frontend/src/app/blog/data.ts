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

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  thumbnail: string;
  url: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: "g1", title: "Farmer Field School in Kalahandi", location: "Kalahandi, Odisha", date: "Feb 12, 2024", image: "/1.png" },
  { id: "g2", title: "Vaccination Camp — Balangir", location: "Balangir, Odisha", date: "Feb 24, 2024", image: "/2.png" },
  { id: "g3", title: "Women SHG Meeting", location: "Sundargarh, Odisha", date: "Mar 05, 2024", image: "/3.png" },
  { id: "g4", title: "Goat Bank Handover Day", location: "Mayurbhanj, Odisha", date: "Mar 18, 2024", image: "/4.png" },
  { id: "g5", title: "Demo Plot Field Day", location: "Keonjhar, Odisha", date: "Apr 02, 2024", image: "/5.png" },
  { id: "g6", title: "Community Awareness Drive", location: "Rayagada, Odisha", date: "Apr 15, 2024", image: "/6.png" },
  { id: "g7", title: "Youth Training Workshop", location: "Ganjam, Odisha", date: "Apr 22, 2024", image: "/7.png" },
  { id: "g8", title: "Livestock Insurance Sign-up", location: "Nabarangpur, Odisha", date: "May 04, 2024", image: "/8.png" },
  { id: "g9", title: "Fodder Cultivation Demo", location: "Koraput, Odisha", date: "May 12, 2024", image: "/9.png" },
  { id: "g10", title: "AJAH Women Cohort Graduation", location: "Bhawanipatna, Odisha", date: "May 20, 2024", image: "/10.png" },
  { id: "g11", title: "Village Health Camp", location: "Malkangiri, Odisha", date: "Jun 01, 2024", image: "/11.png" },
  { id: "g12", title: "Farmer Producer Meeting", location: "Boudh, Odisha", date: "Jun 10, 2024", image: "/12.png" },
];

export const videos: VideoItem[] = [
  {
    id: "v1",
    title: "Manikstu's Goat Bank — Farmer Story",
    description: "Meet Ramesh, a farmer whose life changed with Manikstu's Goat Bank model.",
    duration: "3:42",
    date: "Mar 20, 2024",
    thumbnail: "/1.png",
    url: "#",
  },
  {
    id: "v2",
    title: "Inside a Vaccination Camp",
    description: "A day in the field with our veterinary team across three villages.",
    duration: "2:18",
    date: "Mar 10, 2024",
    thumbnail: "/2.png",
    url: "#",
  },
  {
    id: "v3",
    title: "Women Leading Rural Livelihoods",
    description: "Project AJAH — women farmers building a livestock-led rural economy.",
    duration: "4:57",
    date: "Feb 28, 2024",
    thumbnail: "/3.png",
    url: "#",
  },
  {
    id: "v4",
    title: "Goat Care App — Field Walkthrough",
    description: "How our field team uses the app to onboard farmers and log visits in real time.",
    duration: "3:05",
    date: "Feb 14, 2024",
    thumbnail: "/4.png",
    url: "#",
  },
];

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
