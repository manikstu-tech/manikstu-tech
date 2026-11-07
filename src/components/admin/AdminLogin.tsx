"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) return router.refresh()
      setError(res.status === 429 ? "Too many attempts. Wait a few minutes and try again." : "That password is not right.")
    } catch {
      setError("Could not reach the server. Check your connection and try again.")
    }
    setBusy(false)
  }

  return (
    <form className="admLogin" onSubmit={submit}>
      <h1>Manikstu admin</h1>
      <p>Sign in to edit the website's text, pictures and videos.</p>
      <label htmlFor="adm-password">Password</label>
      <input
        id="adm-password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "adm-error" : undefined}
      />
      {error && (
        <p id="adm-error" className="admError" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="admBtn primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
