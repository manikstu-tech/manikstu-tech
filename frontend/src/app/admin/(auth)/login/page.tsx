import type { Metadata } from "next";
import { ShieldCheck, Users, FileText, LockKeyhole } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

const HIGHLIGHTS = [
  { Icon: FileText, title: "Manage the website", desc: "Content, media, pages and press in one place." },
  { Icon: Users, title: "HR workspace", desc: "Review applications and post jobs." },
  { Icon: LockKeyhole, title: "Role-based access", desc: "Everyone sees only what they should." },
];

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;

  return (
    <main className="relative min-h-screen bg-[#FBF3E6] lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ── Left brand panel (desktop only) ── */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-b from-manikstu-leaf via-manikstu-green to-[#1F4E1A] lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12">
        {/* Warli art strip, inverted to white */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-repeat-x opacity-70 brightness-0 invert"
          style={{ backgroundImage: "url('/patterns/saura-border-top.png?v=2')", backgroundSize: "auto 285%", backgroundPosition: "center 48%" }}
        />
        {/* Decorative mandala corner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/patterns/mandala-top-right.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 top-6 h-auto w-80 opacity-[0.12] [filter:brightness(0)_invert(1)]"
        />
        {/* Village scene along the bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-cover bg-bottom bg-no-repeat opacity-[0.16] brightness-0 invert"
          style={{ backgroundImage: "url('/patterns/village-scene.webp')" }}
        />

        <div className="relative z-10 pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Manikstu Agri Solutions" className="h-14 w-auto brightness-0 invert" />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-manikstu-gold">Management System</p>
          <h2 className="mt-3 font-heading text-4xl font-bold leading-tight text-white">
            Run Manikstu from<br />one calm place.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Sign in to manage the website, your team and hiring — tailored to your role.
          </p>

          <ul className="mt-9 space-y-5">
            {HIGHLIGHTS.map(({ Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/70">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs font-medium text-white/60">
          &copy; 2026 Manikstu Agro Private Limited. All Rights Reserved.
        </p>
      </aside>

      {/* ── Right sign-in column ── */}
      <section className="relative flex min-h-screen items-start justify-center overflow-hidden px-4 pb-20 pt-10 sm:items-center sm:pb-10 lg:min-h-0">
        {/* Soft background scene on mobile/tablet only (desktop has the brand panel) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.14] lg:hidden"
          style={{ backgroundImage: "url('/patterns/village-scene.webp')" }}
        />

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-2xl shadow-charcoal/10">
            {/* Warli art strip */}
            <div
              aria-hidden
              className="h-12 w-full bg-repeat-x"
              style={{ backgroundImage: "url('/patterns/saura-border-top.png?v=2')", backgroundSize: "auto 285%", backgroundPosition: "center 48%" }}
            />

            <div className="px-6 pb-6 pt-5 sm:px-8">
              <div className="text-center">
                {/* Logo shows here on mobile; the brand panel carries it on desktop */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Manikstu Agri Solutions" className="mx-auto h-12 w-auto lg:hidden" />
                <h1 className="mt-3 font-heading text-2xl font-bold text-charcoal lg:mt-0">Welcome back</h1>
                <p className="mt-1 text-xs text-grey">Sign in to the Manikstu admin panel</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span aria-hidden className="h-px w-12 bg-manikstu-gold/50" />
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                  <span aria-hidden className="h-px w-12 bg-manikstu-gold/50" />
                </div>
              </div>

              <div className="mt-5">
                <LoginForm notice={expired ? "Your session has ended. Please sign in again." : undefined} />
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-manikstu-green">
              <ShieldCheck className="h-4 w-4" />
              Secure Admin Access
            </p>
            <p className="mt-0.5 text-xs text-grey lg:hidden">&copy; 2026 Manikstu Agro Private Limited.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
