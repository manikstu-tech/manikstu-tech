"use client"

import { useRef, useState, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { HR_EMAIL } from "@/constants/careers"
import {
  RESUME_TYPES,
  resumeError,
  validateApplication,
  type ApplicationErrors,
  type ApplicationValues,
} from "@/lib/application"
import { only } from "@/lib/fieldFilters"
import { emailError } from "@/lib/email"
import { toast } from "@/lib/toast"

type Status = "idle" | "sending" | "sent" | "failed"
type Field = keyof ApplicationErrors

const text = (data: FormData, key: string) => String(data.get(key) ?? "")

// Sends the details and the resume straight to HR. Used at the top of the Careers page for anyone,
// and in the Apply pop-up of each opening with the role filled in. idPrefix keeps field ids unique on the page.
export function CareerForm({ idPrefix = "apply", role = "" }: { idPrefix?: string; role?: string }) {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<ApplicationErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  // Checks the email as soon as the visitor leaves the field, and clears the message once it is fixed
  const checkEmail = (value: string) =>
    setErrors(({ email: _, ...rest }) => {
      const message = emailError(value)
      return message ? { ...rest, email: message } : rest
    })
  const resumeInput = useRef<HTMLInputElement>(null)
  // The chosen resume's name, so the remove button shows only when there is a file to remove
  const [resumeName, setResumeName] = useState("")

  function removeResume() {
    if (resumeInput.current) resumeInput.current.value = ""
    setResumeName("")
    setErrors(({ resume: _, ...rest }) => rest)
    resumeInput.current?.focus()
  }

  const invalid = (key: Field) => (errors[key] ? true : undefined)
  const describedBy = (key: Field, hint?: string) =>
    [errors[key] ? `${idPrefix}-${key}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined
  const error = (key: Field) =>
    errors[key] && (
      <p className="fieldError" id={`${idPrefix}-${key}-error`}>
        {errors[key]}
      </p>
    )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: ApplicationValues = {
      name: text(data, "name"),
      email: text(data, "email"),
      phone: text(data, "phone"),
      role: text(data, "role"),
      city: text(data, "city"),
      message: text(data, "message"),
    }
    const resume = data.get("resume")
    const found = validateApplication(values)
    const fileProblem = resumeError(resume instanceof File ? resume : null)
    if (fileProblem) found.resume = fileProblem
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      form.current?.querySelector<HTMLElement>(`#${idPrefix}-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus("sending")
    try {
      // Sent as form data so the resume file travels with the details
      const response = await fetch("/api/careers", { method: "POST", body: data })
      if (response.status === 422) {
        const body = await response.json()
        setErrors(body.errors ?? {})
        setStatus("idle")
        return
      }
      setStatus(response.ok ? "sent" : "failed")
      if (response.ok) toast.sent("Application sent")
      else toast.failed()
    } catch {
      setStatus("failed")
      toast.failed()
    }
  }

  if (status === "sent") {
    return (
      <div className="enquirySent" role="status">
        <h3>Thank you. Your application is on its way.</h3>
        <p>Our HR team will review your details and resume and contact you if a suitable role opens up.</p>
        <button
          type="button"
          className="enquiryLink"
          onClick={() => {
            setResumeName("")
            setStatus("idle")
          }}
        >
          Send another application
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="enquiryGrid">
      <div className="field">
        <label htmlFor={`${idPrefix}-name`}>
          Full name <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          onInput={only("name")}
          autoComplete="name"
          placeholder="Your name"
          required
          aria-invalid={invalid("name")}
          aria-describedby={describedBy("name")}
        />
        {error("name")}
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-email`}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          onInput={only("email")}
          onBlur={(event) => checkEmail(event.currentTarget.value)}
          onChange={(event) => errors.email && checkEmail(event.currentTarget.value)}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          aria-invalid={invalid("email")}
          aria-describedby={describedBy("email")}
        />
        {error("email")}
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-phone`}>
          Phone <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          onInput={only("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          required
          aria-invalid={invalid("phone")}
          aria-describedby={describedBy("phone")}
        />
        {error("phone")}
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-city`}>City</label>
        <input
          id={`${idPrefix}-city`}
          name="city"
          onInput={only("place")}
          autoComplete="address-level2"
          placeholder="Your city"
          aria-invalid={invalid("city")}
          aria-describedby={describedBy("city")}
        />
        {error("city")}
      </div>
      <div className="field full">
        <label htmlFor={`${idPrefix}-role`}>Role or area of interest</label>
        <input
          id={`${idPrefix}-role`}
          name="role"
          defaultValue={role}
          placeholder="For example: field operations, veterinary, sales, technology"
          aria-invalid={invalid("role")}
          aria-describedby={describedBy("role")}
        />
        {error("role")}
      </div>
      <div className="field full">
        <label htmlFor={`${idPrefix}-message`}>About you</label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          placeholder="Your experience, and why you would like to work with Manikstu"
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
        />
        {error("message")}
      </div>
      <div className="field full">
        <label htmlFor={`${idPrefix}-resume`}>
          Resume <span aria-hidden="true">*</span>
        </label>
        <div className={resumeName ? "fileRow has" : "fileRow"}>
          <input
            ref={resumeInput}
            id={`${idPrefix}-resume`}
            name="resume"
            type="file"
            accept={RESUME_TYPES.join(",")}
            required
            aria-invalid={invalid("resume")}
            aria-describedby={describedBy("resume", `${idPrefix}-resume-hint`)}
            onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? "")}
          />
          {resumeName && (
            <button type="button" className="fileRemove" aria-label={`Remove ${resumeName}`} onClick={removeResume}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
        <p className="fieldHint" id={`${idPrefix}-resume-hint`}>
          PDF or Word, up to 4 MB
        </p>
        {error("resume")}
      </div>
      {/* Spam trap: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="enquiryFoot full">
        <button type="submit" className="enquirySubmit careerSubmit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send application"} <Arrow />
        </button>
        <p>
          By sending this form you agree to our <a href="/privacy">privacy policy</a>.
        </p>
      </div>
      {status === "failed" && (
        <p className="enquiryFailed full" role="alert">
          We could not send your application just now. Please try again, or email your resume to{" "}
          <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a>.
        </p>
      )}
    </form>
  )
}
