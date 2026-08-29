import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Manikstu Agro Private Limited — our mission to revolutionize goat farming in India, our team, and our journey from Kalahandi, Odisha.",
};

export default function Page() {
  return <PageClient />;
}
