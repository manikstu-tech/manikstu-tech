"use client"

import { useRef, useState, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { CONTACT_INFO } from "@/constants/site"
import { PARTNER_TYPES, validateEnquiry, type EnquiryErrors, type EnquiryKind, type EnquiryValues } from "@/lib/enquiry"
import { only } from "@/lib/fieldFilters"
import { emailError } from "@/lib/email"
import { toast } from "@/lib/toast"

type Status = "idle" | "sending" | "sent" | "failed"

const COPY: Record<EnquiryKind, { message: string; placeholder: string; sent: string }> = {
  investor: {
    message: "Message",
    placeholder: "Tell us about your fund and what you would like to support",
    sent: "Our team will read it and share our investor brief and impact data.",
  },
  partnership: {
    message: "Message",
    placeholder: "Tell us about your organisation and how you would like to partner",
    sent: "Our team will read it and get back to you about the next steps.",
  },
}

// Shown when nobody has said yet whether they are an investor or a partner (the Join Us page)
const GENERIC = { message: "Message", placeholder: "Tell us about your organisation and how you would like to work with us", sent: "Our team will read it and get back to you." }

const JOIN_AS: Record<EnquiryKind, string> = { investor: "Investor or funder", partnership: "Partner" }

const text = (data: FormData, key: string) => String(data.get(key) ?? "")

// With kind, the form is for that one type. With choose, the visitor picks Investor or Partner and kind is only the starting choice.
export function EnquiryForm({ kind, choose }: { kind?: EnquiryKind; choose?: boolean }) {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  // Checks the email as soon as the visitor leaves the field, and clears the message once it is fixed
  const checkEmail = (value: string) =>
    setErrors(({ email: _, ...rest }) => {
      const message = emailError(value)
      return message ? { ...rest, email: message } : rest
    })
  const [picked, setPicked] = useState<EnquiryKind | undefined>(kind)
  const [kindError, setKindError] = useState(false)
  const copy = picked ? COPY[picked] : GENERIC

  const invalid = (key: keyof EnquiryValues) => (errors[key] ? true : undefined)
  const describedBy = (key: keyof EnquiryValues) => (errors[key] ? `${key}-error` : undefined)
  const error = (key: keyof EnquiryValues) =>
    errors[key] && (
      <p className="fieldError" id={`${key}-error`}>
        {errors[key]}
      </p>
    )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: EnquiryValues = {
      type: picked === "partnership" ? text(data, "type") : "",
      name: text(data, "name"),
      email: text(data, "email"),
      phone: text(data, "phone"),
      org: text(data, "org"),
      message: text(data, "message"),
    }
    const found = validateEnquiry(values, picked)
    setErrors(found)
    if (!picked) {
      setKindError(true)
      form.current?.querySelector<HTMLElement>("input[name=kind]")?.focus()
      return
    }
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      form.current?.querySelector<HTMLElement>(`#${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: picked, website: text(data, "website") }),
      })
      if (response.status === 422) {
        setErrors((await response.json()).errors ?? {})
        setStatus("idle")
        return
      }
      setStatus(response.ok ? "sent" : "failed")
      if (response.ok) toast.sent("Enquiry sent")
      else toast.failed()
    } catch {
      setStatus("failed")
      toast.failed()
    }
  }

  if (status === "sent") {
    return (
      <div className="enquirySent" role="status">
        <h3>Thank you. Your message is on its way.</h3>
        <p>{copy.sent} We typically reply within 24 hours.</p>
        <button type="button" className="enquiryLink" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="enquiryGrid">
      {choose && (
        <fieldset className="field full" aria-describedby={kindError ? "kind-error" : undefined}>
          <legend>
            I am joining as <span aria-hidden="true">*</span>
          </legend>
          <div className="segment">
            {(Object.keys(JOIN_AS) as EnquiryKind[]).map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="kind"
                  value={option}
                  checked={picked === option}
                  onChange={() => {
                    setPicked(option)
                    setKindError(false)
                  }}
                />
                <span>{JOIN_AS[option]}</span>
              </label>
            ))}
          </div>
          {kindError && (
            <p className="fieldError" id="kind-error">
              Please choose whether you are an investor or a partner.
            </p>
          )}
        </fieldset>
      )}
      {picked === "partnership" && (
        <div className="field full">
          <label htmlFor="type">
            Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="type"
            name="type"
            defaultValue=""
            required
            onChange={() => errors.type && setErrors(({ type: _, ...rest }) => rest)}
            aria-invalid={invalid("type")}
            aria-describedby={describedBy("type")}
          >
            <option value="" disabled>
              Choose how you would like to partner
            </option>
            {PARTNER_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error("type")}
        </div>
      )}
      <div className="field">
        <label htmlFor="name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
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
        <label htmlFor="org" className="hasHint">
          Organisation name <span className="fieldHint">Optional</span>
        </label>
        <input
          id="org"
          name="org"
          onInput={only("org")}
          autoComplete="organization"
          placeholder="Your organisation"
          aria-invalid={invalid("org")}
          aria-describedby={describedBy("org")}
        />
        {error("org")}
      </div>
      <div className="field">
        <label htmlFor="email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
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
        <label htmlFor="phone">
          Phone number <span aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
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
      <div className="field full">
        <label htmlFor="message">
          {copy.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={copy.placeholder}
          required
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
        />
        {error("message")}
      </div>
      {/* Spam trap: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="enquiryFoot full">
        <button type="submit" className="enquirySubmit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <Arrow />
        </button>
        <p>
          By sending this form you agree to our <a href="/privacy">privacy policy</a>.
        </p>
      </div>
      {status === "failed" && (
        <p className="enquiryFailed full" role="alert">
          We could not send your message just now. Please try again, or email{" "}
          <a href={CONTACT_INFO.emailMailto}>{CONTACT_INFO.email}</a> or call{" "}
          <a href={CONTACT_INFO.phoneTel}>{CONTACT_INFO.phone}</a>.
        </p>
      )}
    </form>
  )
}
