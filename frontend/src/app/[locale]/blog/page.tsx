import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Blog & Media",
  description: "Latest news, articles, and media from Manikstu Agro — insights on goat farming, agriculture, and rural development.",
};

export default function Page() {
  return <PageClient />;
}
