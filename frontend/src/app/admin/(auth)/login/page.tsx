import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-manikstu-cream via-[#F6EDDD] to-[#FBF3E6] px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-xl shadow-charcoal/5">
        <div className="h-1.5 bg-gradient-to-r from-manikstu-green via-manikstu-gold to-manikstu-leaf" />
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Manikstu Agro" className="mx-auto h-14 w-auto" />
            <h1 className="mt-5 text-2xl font-bold text-charcoal">Admin Panel</h1>
            <p className="mt-1 text-sm text-grey">Manikstu Agro Management System</p>
          </div>
          <LoginForm notice={expired ? "Your session has ended. Please sign in again." : undefined} />
        </div>
      </div>
    </main>
  );
}
