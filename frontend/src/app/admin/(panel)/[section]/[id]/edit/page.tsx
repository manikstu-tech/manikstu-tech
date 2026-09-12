import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Forbidden, PageHeader } from "@/components/admin/AdminUi";
import SectionForm from "@/components/admin/SectionForm";
import { AdminApiError } from "@/lib/admin/api";
import { requireAdmin } from "@/lib/admin/auth";
import { getSection } from "@/lib/admin/sections";
import { getRecord } from "@/lib/admin/sections-api";
import { saveSectionAction } from "../../../section-actions";
import { loadCategories } from "../../form-data";

type Params = { params: Promise<{ section: string; id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const section = getSection((await params).section);
  return { title: section ? `Edit ${section.singular}` : "Admin" };
}

export default async function EditRecordPage({ params }: Params) {
  const [{ section: key, id }, user] = await Promise.all([params, requireAdmin()]);
  const section = getSection(key);
  if (!section || section.canEdit === false) notFound();
  if (section.developerOnly && user.role !== "developer") return <Forbidden title={section.title} />;

  const record = await getRecord(key, id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });

  return (
    <>
      <PageHeader title={`Edit ${section.singular}`} subtitle={String(record[section.titleField] ?? "")} />
      <SectionForm
        sectionKey={key}
        record={record}
        categories={await loadCategories(section, record.category_id)}
        action={saveSectionAction.bind(null, key, record.id)}
        cancelHref={section.hasDetail ? `/admin/${key}/${record.id}` : `/admin/${key}`}
      />
    </>
  );
}
