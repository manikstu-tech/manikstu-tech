import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Manikstu Agro. Reach us via phone, email, or visit our offices in Kalahandi, Odisha.",
};

export default function Page() {
  return <PageClient />;
}
