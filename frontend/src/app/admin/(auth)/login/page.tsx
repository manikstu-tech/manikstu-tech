import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FBF3E6] px-4 pt-10 pb-36">
      {/* Background rural line-art scene — fixed so it stays put while the card scrolls */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.18]"
        style={{ backgroundImage: "url('/patterns/village-scene.png')" }}
      />

      {/* Footer — layered green hills for depth */}
      <svg
        aria-hidden
        viewBox="0 0 1440 170"
        preserveAspectRatio="none"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-28 w-full sm:h-32"
      >
        <path fill="#4A8C3F" fillOpacity="0.45" d="M0 74C240 38 470 102 720 72S1200 96 1440 62V170H0Z" />
        <path fill="#3A7030" d="M0 100C270 70 520 122 780 96S1240 106 1440 90V170H0Z" />
        <path fill="#2D5016" d="M0 126C300 106 560 138 820 120S1260 130 1440 118V170H0Z" />
      </svg>

      {/* Login card + trust badge */}
      <div className="relative z-10 flex w-full max-w-sm -translate-y-6 flex-col items-center">
        {/* Login card */}
        <div className="w-full overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-2xl shadow-charcoal/10">
        {/* Warli art strip above the card body */}
        <div
          aria-hidden
          className="h-12 w-full bg-repeat-x"
          style={{
            backgroundImage: "url('/patterns/saura-border-top.png')",
            backgroundSize: "auto 285%",
            backgroundPosition: "center 48%",
          }}
        />

        <div className="px-6 pb-6 pt-5 sm:px-8">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Manikstu Agro" className="mx-auto h-11 w-auto" />
            <h1 className="mt-3 font-heading text-2xl font-bold text-charcoal">Admin Panel</h1>
            <p className="mt-1 text-xs text-grey">Manikstu Agro Management System</p>
            {/* Ornamental divider */}
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

        {/* Secure Admin Access badge */}
        <div className="mt-5 text-center">
          <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-manikstu-green">
            <ShieldCheck className="h-4 w-4" />
            Secure Admin Access
          </p>
          <p className="mt-0.5 text-xs text-grey">Protected by Manikstu Agro</p>
        </div>
      </div>

      {/* Footer content — copyright */}
      <p className="pointer-events-none fixed inset-x-0 bottom-3 z-10 px-4 text-center text-xs font-semibold tracking-wide text-white">
        &copy; 2026 Manikstu Agro Private Limited. All Rights Reserved.
      </p>
    </main>
  );
}
