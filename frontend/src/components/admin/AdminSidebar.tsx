"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Briefcase, Contact, FileText, GraduationCap, Handshake, Image as ImageIcon, LayoutDashboard, LogOut, Megaphone,
  Menu, MessageSquare, Newspaper, Package, Quote, Settings, ShieldCheck, ShoppingCart, Sprout, Tags, Users, X,
  type LucideIcon,
} from "lucide-react";
import type { AdminUser } from "@/lib/admin/types";

type NavItem = { label: string; icon: LucideIcon; href: string; developerOnly?: boolean };

const NAV: { group: string; items: NavItem[] }[] = [
  { group: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" }] },
  {
    group: "Sales",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
      { label: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
      { label: "Customers", icon: Contact, href: "/admin/customers" },
    ],
  },
  {
    group: "Catalogue",
    items: [
      { label: "Products", icon: Package, href: "/admin/products" },
      { label: "Categories", icon: Tags, href: "/admin/categories" },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Blog", icon: Newspaper, href: "/admin/blog" },
      { label: "Press", icon: Megaphone, href: "/admin/press" },
      { label: "Pages", icon: FileText, href: "/admin/pages" },
      { label: "Media", icon: ImageIcon, href: "/admin/media" },
      { label: "Testimonials", icon: Quote, href: "/admin/testimonials" },
      { label: "Partners", icon: Handshake, href: "/admin/partners" },
    ],
  },
  {
    group: "Organisation",
    items: [
      { label: "Team", icon: Users, href: "/admin/team" },
      { label: "Careers", icon: Briefcase, href: "/admin/careers" },
      { label: "Training", icon: GraduationCap, href: "/admin/training" },
      { label: "Awareness", icon: Sprout, href: "/admin/awareness" },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Settings", icon: Settings, href: "/admin/settings", developerOnly: true },
      { label: "Users", icon: ShieldCheck, href: "/admin/users", developerOnly: true },
    ],
  },
];

const ROLE_STYLE: Record<string, string> = {
  developer: "bg-manikstu-gold text-white",
  telesales: "bg-manikstu-green text-white",
  hr: "bg-[#5B8DEF] text-white",
};

type Props = {
  user: AdminUser;
  logoutAction: () => Promise<void>;
};

export default function AdminSidebar({ user, logoutAction }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDeveloper = user.role === "developer";

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-manikstu-leaf px-4 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Manikstu Agro" className="h-8 w-auto brightness-0 invert" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-manikstu-leaf transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Manikstu Agro" className="h-11 w-auto brightness-0 invert" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV.map(({ group, items }) => {
            const visible = items.filter((item) => !item.developerOnly || isDeveloper);
            if (visible.length === 0) return null;
            return (
              <div key={group}>
                <p className="px-3 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-white/40">{group}</p>
                {visible.map(({ label, icon: Icon, href }) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`my-px flex h-10 items-center gap-2.5 rounded-lg px-3 text-[13.5px] transition ${
                        active ? "bg-manikstu-green font-semibold text-white" : "font-medium text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
            <span className={`mt-0.5 inline-block rounded-full px-2 py-px text-[10px] font-semibold capitalize ${ROLE_STYLE[user.role] ?? "bg-white/20 text-white"}`}>
              {user.role}
            </span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
