// Videos from the Manikstu Agro YouTube channel:
// https://www.youtube.com/@manikstuagro5847/videos  (channel UCCW2MDXd4_sd5oadjITvzjQ)
//
// Thumbnails are served by YouTube (img.youtube.com) and the popup embeds
// youtube.com/embed/<id>, so no API key or backend call is needed.
// To refresh this list when new videos are published, update the entries below.

export interface YouTubeVideo {
  id: string;      // YouTube video id
  title: string;
  date?: string;   // ISO date published (yyyy-mm-dd), when known
}

export const youtubeVideos: YouTubeVideo[] = [
  { id: "I5O3s-BnDpQ", title: "A Healthy Goat Starts with a Clean Shed | Smart Goat Farming", date: "2026-07-11" },
  { id: "aKnwiUhA4Yw", title: "Project AJAH | Integrated Livestock Entrepreneurship Initiative | Government of Chhattisgarh", date: "2026-02-25" },
  { id: "9ywHq6H3-wU", title: "Project AJAH: Igniting India’s Rural Red Revolution | 10,000 Women Entrepreneurs Rising", date: "2026-02-16" },
  { id: "VAp65vmHuIE", title: "Manikstu Sujalam Suphalam: Transforming Rural Livelihoods Through Goat Entrepreneurship", date: "2025-11-28" },
  { id: "ptdZbTfgfV8", title: "Manikstu Goat Feed – The Secret to Healthy & Profitable Goats!", date: "2025-08-31" },
  { id: "DSDTOyG9kHI", title: "Boost Animal Health with Manikstu Mineral Blocks", date: "2025-08-22" },
  { id: "qGOj-ybgQL4", title: "Manikstu Kurmi Nashak – Best Ayurvedic Tablet for Deworming Goats & Livestock", date: "2025-08-04" },
  { id: "bToCXYj0eXE", title: "Banita’s Journey: Empowering Women Through Goats | Sujalam Suphalam by Manikstu Agro", date: "2025-07-09" },
  { id: "0lfALmUA0mw", title: "Manikstu Pachak Tatwa", date: "2025-06-08" },
  { id: "vw1VK5uFiyA", title: "Manikstu Livtherapy – Ayurvedic Liver Health for Happier Goats", date: "2025-05-13" },
  { id: "Wu1fHoBKAtM", title: "Manikstu Poshak Tatwa - Ayurvedic Secret for Goat Health", date: "2025-04-16" },
  { id: "eurGt7tXTFw", title: "Mann Ki Baat, 25th Feb 2024", date: "2024-07-13" },
  { id: "p59qEVkkds0", title: "Harvesting Gold: The Art of Crafting Manikstu Goat Manure for our own farm and vibrant pits", date: "2023-12-07" },
  { id: "u0G7ii27yxk", title: "Boosting Ginger Farming Success: Manikstu Goat Manure Farmer Shares Insights", date: "2023-09-27" },
  { id: "8z7PbrIQBu4", title: "Cultivating Success: The Riteshraj Rose Polyhouse Journey with Manikstu Goat Farm Manure", date: "2023-09-19" },
  { id: "-uZY4y-I5y4", title: "Supercharge Your Goat Farm with Smart Nepier, Dasrath, Methi Grass, Subabul, and CO4 Fodder!" },
  { id: "nEXXWvS2hbg", title: "Best Agro Company in Odisha | Manikstu Agro | Goat Farming" },
  { id: "Y18GgQUyNgo", title: "ଅମୃତଭଣ୍ଡା ଚାଷ | Papaya Cultivation | Taiwan Red Lady Papaya | Manikstu Agro" },
  { id: "Mq2I-kwUxuc", title: "Manikstu Goat Farm" },
  { id: "Pdd7EKgRiOQ", title: "Manikstu Goat Farm" },
  { id: "NlifGgsgdNQ", title: "Manikstu Goat Farm" },
  { id: "TvV0aqEA6Pw", title: "Manikstu Goat Farm" },
];
