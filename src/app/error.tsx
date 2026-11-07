"use client"

import Link from "next/link"
import { useEffect } from "react"
import { StatusPage } from "@/components/ui/StatusPage"
import { CONTACT_INFO } from "@/constants/site"

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <StatusPage
      code="500"
      title="Something went wrong on our side"
      text={`This page did not load. Try again, and if it keeps happening, email ${CONTACT_INFO.email}.`}
      note={error.digest ? `Error reference: ${error.digest}` : undefined}
    >
      <button type="button" className="ajBtn gold" onClick={reset}>
        Try again
      </button>
      <Link className="ajBtn outline" href="/">
        Back to home
      </Link>
    </StatusPage>
  )
}
