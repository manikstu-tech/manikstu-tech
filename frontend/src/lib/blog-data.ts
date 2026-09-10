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
  type?: "blog" | "press";
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  date: string;
  description: string;
  // True when `url` is a direct video file (admin upload) rather than a link/embed.
  isFile?: boolean;
  // Set when this is a YouTube video — opens in a popup player instead of navigating.
  youtubeId?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

export const categoryColors: Record<Category, string> = {
  Featured: "bg-manikstu-green",
  Event: "bg-manikstu-red",
  Press: "bg-manikstu-gold",
  Media: "bg-saura-red",
};

export const categoryColorMap = categoryColors;

// Fallback data — API fetches real content
export const articles: Article[] = [];
export const galleryPhotos: GalleryPhoto[] = [];
export const videos: VideoItem[] = [];
