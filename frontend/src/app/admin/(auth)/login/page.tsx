import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FBF3E6] px-4 py-12">
      {/* Background rural line-art scene — fixed so it stays put while the card scrolls */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.18]"
        style={{ backgroundImage: "url('/patterns/village-scene.png')" }}
      />

      {/* Green hills along the bottom */}
      <svg
        aria-hidden
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        className="pointer-events-none fixed inset-x-0 bottom-0 h-28 w-full sm:h-32"
      >
        <path fill="#4A8C3F" d="M0 74C240 34 480 112 720 80 960 48 1200 98 1440 64V150H0Z" />
        <path fill="#2D5016" d="M0 100C260 70 520 120 780 96 1040 72 1240 106 1440 90V150H0Z" />
      </svg>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-2xl shadow-charcoal/10">
        {/* Warli art strip above the card body */}
        <div
          aria-hidden
          className="h-9 w-full bg-repeat-x"
          style={{ backgroundImage: "url('/patterns/saura-border-top.png')", backgroundSize: "auto 100%" }}
        />

        <div className="px-8 pb-9 pt-7 sm:px-10">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Manikstu Agro" className="mx-auto h-16 w-auto" />
            <h1 className="mt-4 font-heading text-3xl font-bold text-charcoal">Admin Panel</h1>
            <p className="mt-1 text-sm text-grey">Manikstu Agro Management System</p>
            {/* Ornamental divider */}
            <div className="mt-3.5 flex items-center justify-center gap-2">
              <span aria-hidden className="h-px w-14 bg-manikstu-gold/50" />
              <span aria-hidden className="h-2 w-2 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-14 bg-manikstu-gold/50" />
            </div>
          </div>

          <div className="mt-6">
            <LoginForm notice={expired ? "Your session has ended. Please sign in again." : undefined} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="fixed bottom-3 left-0 right-0 z-10 px-4 text-center text-xs font-medium text-white">
        &copy; 2026 Manikstu Agro Private Limited. All Rights Reserved.
      </p>
    </main>
  );
}
