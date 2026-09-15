import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin/auth";
import { logoutAction } from "./actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col lg:pl-64">
      <AdminSidebar user={user} logoutAction={logoutAction} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-28 sm:px-6 lg:px-10">{children}</main>

      {/* Site-wide footer — copyright over a full-bleed village art band flush to the bottom */}
      <footer className="relative">
        <p className="px-4 pb-2 text-center text-xs font-medium text-grey">
          &copy; 2026 Manikstu Agro Private Limited. All Rights Reserved.
        </p>
        {/* Village line-art — multiply blend drops the white ground so only the ink shows */}
        <div
          aria-hidden
          className="pointer-events-none h-24 w-full bg-repeat-x bg-bottom opacity-60 mix-blend-multiply"
          style={{ backgroundImage: "url('/patterns/village-scene.png?v=2')", backgroundSize: "auto 100%" }}
        />
      </footer>
    </div>
  );
}
