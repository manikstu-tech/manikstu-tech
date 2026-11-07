"use client"

import { useRef, useState, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { StateSelector } from "@/components/ui/StateSelector"
import { CATEGORIES, ENQUIRY_TYPES } from "@/constants/contact"
import { MAP_STATES } from "@/constants/indiaMap"
import { CONTACT_INFO } from "@/constants/site"
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact"
import { only } from "@/lib/fieldFilters"
import { emailError } from "@/lib/email"
import { toast } from "@/lib/toast"

type Status = "idle" | "sending" | "sent" | "failed"

const text = (data: FormData, key: string) => String(data.get(key) ?? "")

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<ContactErrors>({})
  // Checks the email as soon as the visitor leaves the field, and clears the message once it is fixed
  const checkEmail = (value: string) =>
    setErrors(({ email: _, ...rest }) => {
      const message = emailError(value)
      return message ? { ...rest, email: message } : rest
    })
  const [status, setStatus] = useState<Status>("idle")
  const [type, setType] = useState(ENQUIRY_TYPES[0])
  const [category, setCategory] = useState("")
  const [stateName, setStateName] = useState("")

  const invalid = (key: keyof ContactValues) => (errors[key] ? true : undefined)
  const describedBy = (key: keyof ContactValues) =>
    errors[key] ? `${key}-error` : undefined
  const error = (key: keyof ContactValues) =>
    errors[key] && (
      <p className="fieldError" id={`${key}-error`}>
        {errors[key]}
      </p>
    )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: ContactValues = {
      name: text(data, "name"),
      email: text(data, "email"),
      phone: text(data, "phone"),
      type: text(data, "type"),
      category: text(data, "category"),
      city: text(data, "city"),
      state: text(data, "state"),
      message: text(data, "message"),
    }
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      const first = Object.keys(found)[0]
      form.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: text(data, "website") }),
      })
      if (response.status === 422) {
        const body = await response.json()
        setErrors(body.errors ?? {})
        setStatus("idle")
        return
      }
      setStatus(response.ok ? "sent" : "failed")
      if (response.ok) toast.sent("Message sent")
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
        <p>
          Our team will read it and get back to you. We typically reply within
          24 hours.
        </p>
        <button
          type="button"
          className="enquiryLink"
          onClick={() => {
            setCategory("")
            setStateName("")
            setStatus("idle")
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="enquiryGrid">
      <div className="field">
        <label htmlFor="name">
          Full name <span aria-hidden="true">*</span>
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
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          onInput={only("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          aria-invalid={invalid("phone")}
          aria-describedby={describedBy("phone")}
        />
        {error("phone")}
      </div>
      <fieldset className="field">
        <legend>
          Type <span aria-hidden="true">*</span>
        </legend>
        <div className="segment">
          {ENQUIRY_TYPES.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => {
                  setType(option)
                  // A category from the other type is not offered any more
                  if (!CATEGORIES[option].includes(category)) setCategory("")
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field full">
        <label htmlFor="category">
          Category <span aria-hidden="true">*</span>
        </label>
        <StateSelector
          id="category"
          name="category"
          options={CATEGORIES[type]}
          value={category}
          onChange={setCategory}
          placeholder="Select category"
          searchable={false}
          required
          invalid={!!errors.category}
          describedBy={describedBy("category")}
        />
        {error("category")}
      </div>
      <div className="field">
        <label htmlFor="city">City</label>
        <input id="city" name="city" autoComplete="address-level2" placeholder="Your city" onInput={only("place")} />
        {error("city")}
      </div>
      <div className="field">
        <label htmlFor="state">State</label>
        <StateSelector
          id="state"
          name="state"
          options={MAP_STATES.map(({ name }) => name)}
          value={stateName}
          onChange={setStateName}
          placeholder="Select state"
        />
        {error("state")}
      </div>
      <div className="field full">
        <label htmlFor="message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us how we can help"
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
          By sending this form you agree to our{" "}
          <a href="/privacy">privacy policy</a>.
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
