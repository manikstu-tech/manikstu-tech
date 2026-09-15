"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, MessageSquare, Newspaper, ShoppingCart, type LucideIcon } from "lucide-react";
import type { NotificationItem, NotificationType } from "@/app/admin/api/notifications/route";

const LAST_SEEN_KEY = "admin:notif:lastSeen";
const POLL_MS = 30_000;

const META: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  order: { icon: ShoppingCart, className: "bg-manikstu-green/10 text-manikstu-leaf" },
  enquiry: { icon: MessageSquare, className: "bg-manikstu-gold/15 text-[#8A6414]" },
  blog: { icon: Newspaper, className: "bg-[#5B8DEF]/10 text-[#3E6ED6]" },
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function readLastSeen(): number {
  try {
    return Number(localStorage.getItem(LAST_SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
}

export default function NotificationBell() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const [lastSeen, setLastSeen] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastSeen(readLastSeen());
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/admin/api/notifications", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { items: NotificationItem[] };
      setItems(data.items ?? []);
    } catch {
      /* offline / transient — keep the last good list */
    }
  }, []);

  // Poll on mount, on an interval, and whenever the tab regains focus.
  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    const onFocus = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, [load]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const unread = items.filter((i) => new Date(i.at).getTime() > lastSeen).length;

  const markAllSeen = () => {
    const now = Date.now();
    try {
      localStorage.setItem(LAST_SEEN_KEY, String(now));
    } catch {
      /* private mode — badge simply won't persist */
    }
    setLastSeen(now);
  };

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next && unread > 0) markAllSeen();
      return next;
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-grey transition-colors hover:bg-manikstu-cream/70 hover:text-charcoal"
        aria-label={`Notifications${unread ? ` (${unread} new)` : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-manikstu-red px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-light-grey bg-white shadow-xl shadow-charcoal/10 sm:w-96">
          <div className="flex items-center justify-between border-b border-light-grey px-4 py-3">
            <p className="text-sm font-semibold text-charcoal">Notifications</p>
            {items.length > 0 && (
              <button type="button" onClick={markAllSeen} className="text-xs font-semibold text-manikstu-green hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="mx-auto h-8 w-8 text-light-grey" />
                <p className="mt-2 text-sm text-grey">You&apos;re all caught up.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#F4F1EA]">
                {items.map((item) => {
                  const { icon: Icon, className } = META[item.type];
                  const isNew = new Date(item.at).getTime() > lastSeen;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex gap-3 px-4 py-3 transition hover:bg-manikstu-cream/40 ${isNew ? "bg-manikstu-green/[0.04]" : ""}`}
                      >
                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${className}`}>
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-charcoal">{item.title}</span>
                          <span className="block truncate text-xs text-grey">{item.subtitle}</span>
                          <span className="mt-0.5 block text-[11px] font-medium text-grey/70">{timeAgo(item.at)}</span>
                        </span>
                        {isNew && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-manikstu-red" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <Link
            href="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="block border-t border-light-grey px-4 py-2.5 text-center text-xs font-semibold text-manikstu-green hover:bg-manikstu-cream/40"
          >
            View dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
