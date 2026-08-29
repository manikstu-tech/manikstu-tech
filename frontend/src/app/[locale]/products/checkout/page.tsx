import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order of Manikstu Agro products.",
};

export default function Page() {
  return <PageClient />;
}
