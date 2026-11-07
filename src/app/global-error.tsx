"use client"

import { StatusPage } from "@/components/ui/StatusPage"
import "./globals.css"

// Replaces the root layout when the layout itself fails, so it brings its own <html>, <body> and styles
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <StatusPage code="500" title="The site hit a problem" text="Please reload the page. If this keeps happening, try again in a few minutes.">
          <button type="button" className="ajBtn gold" onClick={reset}>
            Reload
          </button>
        </StatusPage>
      </body>
    </html>
  )
}
