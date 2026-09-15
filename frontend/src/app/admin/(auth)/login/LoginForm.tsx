"use client";

import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeOff, Heart, Loader2, Lock, Mail, ShieldCheck, Users } from "lucide-react";
import { loginAction } from "./actions";
import type { LoginState } from "@/lib/admin/types";

const ROLES = [
  { key: "admin", label: "Admin", Icon: ShieldCheck },
  { key: "farmers", label: "Farmers Connect", Icon: Users },
  { key: "hr", label: "HR", Icon: Heart },
] as const;

export default function LoginForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>("admin");

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="role" value={role} />

      {notice && !state.error && (
        <p className="rounded-lg border border-manikstu-gold/30 bg-manikstu-gold/10 px-4 py-3 text-sm text-[#8A6414]">
          {notice}
        </p>
      )}
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-center text-sm font-semibold text-manikstu-red"
        >
          {state.error}
        </p>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-manikstu-green" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            defaultValue={state.email}
            className="h-11 w-full rounded-xl border border-[#E8E2D6] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
            placeholder="you@manikstu.com"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-manikstu-green" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="h-11 w-full rounded-xl border border-[#E8E2D6] bg-white pl-10 pr-11 text-sm outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
            placeholder="Enter your password"
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

      {/* Role selector */}
      <div>
        <p className="mb-2 text-sm font-semibold text-charcoal">Select Your Role</p>
        <div className="grid grid-cols-3 gap-3">
          {ROLES.map(({ key, label, Icon }) => {
            const active = role === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-center transition ${
                  active
                    ? "border-manikstu-green bg-manikstu-green/5 ring-1 ring-manikstu-green/30"
                    : "border-[#E8E2D6] bg-white hover:border-manikstu-green/40"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    active ? "bg-manikstu-green text-white" : "bg-manikstu-green/10 text-manikstu-green"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold leading-tight text-charcoal">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Remember me + forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-grey">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-[#D8D2C4] text-manikstu-green focus:ring-manikstu-green"
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-semibold text-manikstu-green hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-manikstu-green text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/25 transition hover:bg-manikstu-leaf disabled:cursor-wait disabled:opacity-70"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Signing in…" : "Sign In"}
        {!pending && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
