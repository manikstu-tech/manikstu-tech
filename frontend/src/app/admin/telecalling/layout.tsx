import TelecallingShell from "@/components/telecalling/TelecallingShell";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcNotifications } from "@/lib/admin/telecalling";
import { logoutAction } from "../(panel)/actions";
import { markNotificationsReadAction } from "./actions";

export default async function TelecallingLayout({ children }: { children: React.ReactNode }) {
  const user = await requireTelecaller();
  const notifications = await getTcNotifications();

  return (
    <TelecallingShell user={user} notifications={notifications} markReadAction={markNotificationsReadAction} logoutAction={logoutAction}>
      {children}
    </TelecallingShell>
  );
}
