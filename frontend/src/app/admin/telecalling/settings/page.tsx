import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/AdminUi";
import SettingsTabs from "@/components/telecalling/SettingsTabs";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcSettings } from "@/lib/admin/telecalling";
import { updateProfileAction } from "../actions";

export const metadata: Metadata = { title: "Settings" };

export default async function TelecallingSettingsPage() {
  await requireTelecaller();

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your profile, team and notification preferences." />
      <SettingsTabs settings={await getTcSettings()} profileAction={updateProfileAction} />
    </>
  );
}
