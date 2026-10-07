import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import PageClient from "./PageClient";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://127.0.0.1:8001/api");

export type JobDetail = {
  id: number | string;
  title: string;
  category?: string | null;
  location?: string | null;
  type?: string | null;
  description?: string | null;
};

async function getJob(id: string): Promise<JobDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/careers`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? []).find((j: JobDetail) => String(j?.id) === decodeURIComponent(id).trim()) ?? null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/careers`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? [])
      .filter((j: JobDetail) => j?.id != null)
      .map((j: JobDetail) => ({ id: String(j.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return { title: "Job Not Found" };
  }

  const description = job.description?.slice(0, 160) || `${job.title} at Manikstu Agri Solutions.`;

  return {
    title: `${job.title} | Careers`,
    description,
    alternates: { canonical: `https://manikstu.com/careers/${job.id}` },
    openGraph: {
      title: `${job.title} | Manikstu Agri Solutions Careers`,
      description,
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://manikstu.com" },
            { "@type": "ListItem", position: 2, name: "Careers", item: "https://manikstu.com/careers" },
            {
              "@type": "ListItem",
              position: 3,
              name: job.title,
              item: `https://manikstu.com/careers/${job.id}`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description || "",
          hiringOrganization: { "@type": "Organization", name: "Manikstu Agro" },
          jobLocation: { "@type": "Place", address: job.location || "Odisha, India" },
          employmentType: job.type || "",
        }}
      />
      <PageClient job={job} />
    </>
  );
}

