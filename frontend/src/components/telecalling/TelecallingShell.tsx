"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle, BarChart3, Bell, Home, LogOut, Menu, MessageSquare, Phone, PhoneCall, Settings, ShoppingBag, ShoppingCart,
  Truck, User, Users, X, type LucideIcon,
} from "lucide-react";
import type { TcNotifications } from "@/lib/admin/telecalling";
import type { AdminUser } from "@/lib/admin/types";

const BASE = "/admin/telecalling";

const NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: BASE, icon: Home },
  { label: "Farmers", href: `${BASE}/farmers`, icon: User },
  { label: "Orders", href: `${BASE}/orders`, icon: ShoppingCart },
  { label: "Products", href: `${BASE}/products`, icon: ShoppingBag },
  { label: "Delivery Tracking", href: `${BASE}/delivery`, icon: Truck },
  { label: "Complaints", href: `${BASE}/complaints`, icon: MessageSquare },
  { label: "Telecalling", href: `${BASE}/calls`, icon: PhoneCall },
  { label: "Franchise Leads", href: `${BASE}/franchise`, icon: Users },
  { label: "Reports", href: `${BASE}/reports`, icon: BarChart3 },
  { label: "Settings", href: `${BASE}/settings`, icon: Settings },
];

const NOTIF_ICONS: Record<string, LucideIcon> = { order: ShoppingBag, alert: AlertTriangle, lead: User, delivery: Truck, call: Phone };

type Props = {
  user: AdminUser;
  notifications: TcNotifications;
  markReadAction: () => Promise<void>;
  logoutAction: () => Promise<void>;
  children: ReactNode;
};

function NotificationBell({ notifications, markReadAction }: Pick<Props, "notifications" | "markReadAction">) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const { items, unread } = notifications;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div className="relative" ref={panel}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE7DC] bg-white text-grey hover:text-manikstu-green"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-manikstu-red px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[#F0ECE2] px-4 py-3">
            <span className="text-sm font-bold">Notifications</span>
            {unread > 0 && (
              <form action={markReadAction}>
                <button type="submit" className="text-xs font-semibold text-manikstu-green hover:underline">
                  Mark all read
                </button>
              </form>
            )}
          </div>
          <div className="max-h-[360px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-sm text-grey">
                <Bell className="h-7 w-7 opacity-50" />
                You&apos;re all caught up
              </div>
            ) : (
              items.map((n, i) => {
                const Icon = NOTIF_ICONS[n.icon] ?? AlertTriangle;
                return (
                  <div key={i} className={`flex gap-3 border-b border-[#F4F1EA] px-4 py-3 last:border-0 ${n.unread ? "bg-manikstu-green/[0.04]" : ""}`}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-leaf">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold">{n.title}</p>
                      <p className="truncate text-xs text-grey">{n.text}</p>
                      <p className="mt-0.5 text-[11px] text-[#9A9A8E]">{n.time}</p>
                    </div>
                    {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-manikstu-green" aria-label="Unread" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TelecallingShell({ user, notifications, markReadAction, logoutAction, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen lg:pl-64">
      {open && <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-manikstu-leaf transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <Link href={BASE}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Manikstu Agro" className="h-11 w-auto brightness-0 invert" />
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white/40">Overview</p>
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === BASE ? pathname === BASE : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
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
        </nav>
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">{initial}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
            <span className="mt-0.5 inline-block rounded-full bg-manikstu-green px-2 py-px text-[10px] font-semibold capitalize text-white">{user.role}</span>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white" aria-label="Sign out" title="Sign out">
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[#ECE7DC] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-10">
        <button type="button" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE7DC] bg-white text-grey lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <p className="hidden text-sm font-semibold text-manikstu-leaf lg:block">Telecalling Workspace</p>
        <div className="ml-auto flex items-center gap-3">
          <NotificationBell notifications={notifications} markReadAction={markReadAction} />
          <div className="hidden items-center gap-2.5 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-manikstu-green/10 text-sm font-bold text-manikstu-leaf">{initial}</div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold">{user.name}</p>
              <p className="text-[11px] capitalize text-grey">{user.role}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="h-1 bg-gradient-to-r from-manikstu-green via-manikstu-gold to-manikstu-leaf" aria-hidden />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
