import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { logoutAction } from "./actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen lg:pl-64">
      <AdminSidebar user={user} logoutAction={logoutAction} />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pt-10">{children}</main>
    </div>
  );
}
