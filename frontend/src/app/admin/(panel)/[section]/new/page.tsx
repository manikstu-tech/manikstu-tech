import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Forbidden, PageHeader } from "@/components/admin/AdminUi";
import SectionForm from "@/components/admin/SectionForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getSection } from "@/lib/admin/sections";
import { saveSectionAction } from "../../section-actions";
import { loadCategories } from "../form-data";

type Params = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const section = getSection((await params).section);
  return { title: section ? `Add ${section.singular}` : "Admin" };
}

export default async function NewRecordPage({ params }: Params) {
  const [{ section: key }, user] = await Promise.all([params, requireAdmin()]);
  const section = getSection(key);
  if (!section || section.canCreate === false) notFound();
  if (section.developerOnly && user.role !== "developer") return <Forbidden title={section.title} />;

  return (
    <>
      <PageHeader title={`Add ${section.singular}`} subtitle={section.subtitle} />
      <SectionForm
        sectionKey={key}
        categories={await loadCategories(section)}
        action={saveSectionAction.bind(null, key, null)}
        cancelHref={`/admin/${key}`}
      />
    </>
  );
}
