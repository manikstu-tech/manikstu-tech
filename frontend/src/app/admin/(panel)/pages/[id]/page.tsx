import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonClass, PageHeader } from "@/components/admin/AdminUi";
import BlocksEditor from "@/components/admin/BlocksEditor";
import PageSettingsForm from "@/components/admin/PageSettingsForm";
import { AdminApiError } from "@/lib/admin/api";
import { requireAdmin } from "@/lib/admin/auth";
import { getPageDetail } from "@/lib/admin/pages";
import { deleteBlockAction, reorderBlocksAction, saveBlockAction, savePageAction } from "../actions";

export const metadata: Metadata = { title: "Edit Page" };

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const [user, { id }] = await Promise.all([requireAdmin(), params]);
  const page = await getPageDetail(id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });

  return (
    <>
      <PageHeader
        title={page.title}
        subtitle={
          <span>
            <code className="rounded bg-[#F0ECE2] px-2 py-0.5 text-xs">{page.slug === "home" ? "/" : `/${page.slug}`}</code> · {page.blocks.length} content blocks
          </span>
        }
        actions={
          <Link href="/admin/pages" className={buttonClass.light}>
            <ArrowLeft className="h-4 w-4" /> All Pages
          </Link>
        }
      />
      <div className="grid items-start gap-5 xl:grid-cols-[1fr_1.6fr]">
        <PageSettingsForm page={page} action={savePageAction.bind(null, page.id)} />
        <BlocksEditor
          blocks={page.blocks}
          canDelete={user.role === "developer"}
          saveAction={saveBlockAction.bind(null, page.id)}
          reorderAction={reorderBlocksAction.bind(null, page.id)}
          deleteAction={deleteBlockAction.bind(null, page.id)}
        />
      </div>
    </>
  );
}
