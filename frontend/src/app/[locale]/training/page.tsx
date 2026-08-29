import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Professional goat farming training programs by Manikstu Agro — learn modern techniques, livestock management, and business skills.",
};

export default function Page() {
  return <PageClient />;
}
