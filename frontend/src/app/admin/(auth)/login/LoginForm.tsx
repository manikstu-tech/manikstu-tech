"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { loginAction } from "./actions";
import type { LoginState } from "@/lib/admin/types";

export default function LoginForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {notice && !state.error && (
        <p className="rounded-lg border border-manikstu-gold/30 bg-manikstu-gold/10 px-4 py-3 text-sm text-[#8A6414]">
          {notice}
        </p>
      )}
      {state.error && (
        <p role="alert" className="rounded-lg border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-sm font-medium text-manikstu-red">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            defaultValue={state.email}
            className="h-12 w-full rounded-xl border border-[#E8E2D6] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
            placeholder="you@manikstu.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-xl border border-[#E8E2D6] bg-white pl-10 pr-11 text-sm outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-grey hover:text-manikstu-green"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/25 transition hover:-translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
