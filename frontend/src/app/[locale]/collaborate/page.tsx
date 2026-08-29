import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Collaborate With Us",
  description: "Partner with Manikstu Agro — explore collaboration opportunities in goat farming, research, and rural development.",
};

export default function Page() {
  return <PageClient />;
}
