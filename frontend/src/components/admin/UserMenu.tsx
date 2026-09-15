"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import type { AdminUser } from "@/lib/admin/types";

type Props = {
  user: AdminUser;
  logoutAction: () => Promise<void>;
};

export default function UserMenu({ user, logoutAction }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const role = user.role.charAt(0).toUpperCase() + user.role.slice(1);

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-1 py-1 transition hover:bg-manikstu-cream/70"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-manikstu-green text-sm font-semibold text-white">
          {(user.name?.[0] ?? "A").toUpperCase()}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-semibold text-charcoal">{user.name}</span>
          <span className="block text-xs font-semibold text-manikstu-gold">{role}</span>
        </span>
        <ChevronDown className={`hidden h-4 w-4 shrink-0 text-grey transition-transform sm:block ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-light-grey bg-white shadow-xl shadow-charcoal/10">
          <div className="flex items-center gap-3 border-b border-light-grey px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manikstu-green text-base font-semibold text-white">
              {(user.name?.[0] ?? "A").toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-charcoal">{user.name}</span>
              <span className="block truncate text-xs text-grey">{user.email}</span>
            </span>
          </div>

          <div className="px-4 py-2.5">
            <span className="inline-block rounded-full bg-manikstu-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#8A6414]">
              {role}
            </span>
          </div>

          <form action={logoutAction} className="border-t border-light-grey">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-semibold text-manikstu-red transition hover:bg-manikstu-red/5"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
