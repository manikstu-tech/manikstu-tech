import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Manikstu Agro — explore career opportunities in goat farming, veterinary services, and agricultural innovation.",
};

export default function Page() {
  return <PageClient />;
}
