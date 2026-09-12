import type { Metadata } from "next";
import { Forbidden, PageHeader } from "@/components/admin/AdminUi";
import SettingsForm from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getSettings } from "@/lib/admin/sections-api";
import { saveSettingsAction } from "../section-actions";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireAdmin();
  if (user.role !== "developer") return <Forbidden title="Settings" />;

  return (
    <>
      <PageHeader title="Settings" subtitle="Contact details, social links and site text" />
      <SettingsForm values={await getSettings()} action={saveSettingsAction} />
    </>
  );
}
