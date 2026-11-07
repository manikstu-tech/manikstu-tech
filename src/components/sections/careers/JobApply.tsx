"use client"

import { useEffect, useRef, useState } from "react"
import { CareerForm } from "@/components/sections/careers/CareerForm"
import { Arrow } from "@/components/ui/Arrow"

// The Apply button of one opening. It opens the application form in a pop-up with the role already filled in.
export function JobApply({ title, slug }: { title: string; slug: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) dialog.current?.showModal()
  }, [open])

  return (
    <>
      <button type="button" className="button careerApply" onClick={() => setOpen(true)}>
        Apply now <Arrow />
      </button>
      <dialog
        ref={dialog}
        className="resPlayer applyDialog"
        aria-labelledby={`${slug}-title`}
        onClose={() => setOpen(false)}
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
      >
        {/* Rendered only while open, so the form starts fresh each time */}
        {open && (
          <>
            <div className="resPlayerHead">
              <div>
                <small>Apply for</small>
                <h2 id={`${slug}-title`}>{title}</h2>
              </div>
              <button type="button" className="resClose" aria-label="Close" onClick={() => dialog.current?.close()}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="applyBody">
              <CareerForm idPrefix={slug} role={title} />
            </div>
          </>
        )}
      </dialog>
    </>
  )
}
