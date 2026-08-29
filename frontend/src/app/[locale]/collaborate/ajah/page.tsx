import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Ajah Initiative",
  description: "The Ajah Initiative by Manikstu Agro — empowering communities through sustainable goat farming partnerships.",
};

export default function Page() {
  return <PageClient />;
}
