"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    type: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", city: "", state: "", type: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          background={
            <>
              {/* Default top-right mandala */}
              <Image
                src="/patterns/mandala-top-right-corner.png"
                alt=""
                aria-hidden
                width={504}
                height={560}
                className="pointer-events-none select-none absolute right-0 top-0 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] opacity-[0.10] sm:opacity-[0.14] dark:opacity-[0.18]"
              />
              {/* Left-side mandala */}
              <Image
                src="/patterns/mandala-right.png"
                alt=""
                aria-hidden
                width={768}
                height={768}
                className="pointer-events-none select-none absolute -left-12 top-1/2 -translate-y-1/2 h-auto w-32 sm:w-44 md:w-56 lg:w-64 opacity-[0.14] sm:opacity-[0.18] -scale-x-100"
              />
            </>
          }
        >
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Get In Touch
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
              Contact <span className="text-manikstu-green">Us</span>
            </h1>

            {/* Framed-diamond divider */}
            <div className="mt-4 flex items-center gap-2">
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <div aria-hidden className="relative flex items-center justify-center">
                <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              </div>
              <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
              <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
            </div>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-grey">
              Have a question, want to partner, or need support? We would love
              to hear from you.
            </p>
          </div>

          {/* Right — contact cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: Phone,
                title: "Call Us",
                value: "+91 8270331856",
                subtitle: "Mon – Sat | 9:00 AM – 6:00 PM",
              },
              {
                icon: Mail,
                title: "Email Us",
                value: "contact@manikstu.com",
                subtitle: "We typically reply within 24 hours",
              },
            ].map(({ icon: Icon, title, value, subtitle }) => (
              <div
                key={title}
                className="group flex items-center gap-5 rounded-2xl border border-manikstu-gold/25 bg-manikstu-cream/60 p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-manikstu-green/20">
                  <Icon className="h-6 w-6 text-manikstu-green" />
                </span>
                <span
                  aria-hidden
                  className="hidden h-12 w-px bg-manikstu-gold/30 sm:block"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-base font-bold text-charcoal">
                    {title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-manikstu-green break-words">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-grey">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visit Us — spans full hero width so it captures the left empty area */}
          <div className="rounded-2xl border border-manikstu-gold/25 bg-manikstu-cream/60 p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-manikstu-green/20">
                <MapPin className="h-6 w-6 text-manikstu-green" />
              </span>
              <p className="font-heading text-base font-bold text-charcoal">
                Visit Us
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Registered Office",
                  address:
                    "Row House No - 94, Ravi Garden, Pune Solapur Road, Manjri Budruk, Hadapsar, Pune – 412307",
                },
                {
                  label: "Corporate Office",
                  address:
                    "Plot No-754, 14, Gangadhar Meher Marg, near Pabitra Guest House, Jayadev Vihar, Bhubaneswar, Odisha – 751013",
                },
                {
                  label: "Farm Office",
                  address:
                    "At/Po: Salebhata, P.S: Kegaon, via: Borda, Kalahandi, Odisha – 766036",
                },
                {
                  label: "Regional Office",
                  address:
                    "CMTC Campus, Serikhedi, Chhattisgarh – 492012",
                },
              ].map((office) => (
                <div
                  key={office.label}
                  className="rounded-xl border border-light-grey/70 bg-white/70 p-3"
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-manikstu-green" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-manikstu-green">
                      {office.label}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-grey">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageHero>

        <section className="relative section-padding bg-manikstu-cream dark:bg-gray-900 overflow-hidden">
          {/* Top tribal border */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 h-6 sm:h-7 bg-repeat-x opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />
          {/* Bottom tribal border (flipped) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
            }}
          />

          {/* Top-left mandala corner */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute left-0 top-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18]"
          />

          {/* Bottom-right mandala corner */}
          <Image
            src="/patterns/mandala-corner-top.png"
            alt=""
            aria-hidden
            width={1370}
            height={1155}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-auto w-40 sm:w-56 md:w-72 lg:w-80 opacity-[0.14] sm:opacity-[0.18] -scale-x-100 -scale-y-100"
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Section header — matches Training "What We Do" */}
            <div className="text-center">
              {/* Ornamental pill heading */}
              <div className="flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  Send a Message
                </p>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                <span aria-hidden className="h-px w-10 bg-manikstu-gold/60" />
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl dark:text-white">
                We&apos;d Love to{" "}
                <span className="text-manikstu-green">Hear From You</span>
              </h2>

              {/* Framed diamond divider */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <div aria-hidden className="relative flex items-center justify-center">
                  <span className="h-3.5 w-3.5 rotate-45 border border-manikstu-gold bg-transparent" />
                  <span className="absolute h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
                </div>
                <span aria-hidden className="h-1 w-1 rounded-full bg-manikstu-gold/80" />
                <span aria-hidden className="h-px w-14 sm:w-20 bg-manikstu-gold/70" />
              </div>

              <p className="mx-auto mt-6 max-w-2xl text-grey leading-relaxed dark:text-gray-300">
                Drop us a line — questions, partnership ideas, feedback or
                anything else. Our team responds within a working day.
              </p>
            </div>

            {/* Ornate form card — matches Training program card */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border-2 border-saura-red/50 bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
              {/* Inner dashed border */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-saura-red/40"
              />
              <div className="relative">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-manikstu-green/10">
                    <Send className="h-7 w-7 text-manikstu-green" />
                  </div>
                  <h2 className="mt-6 font-heading text-2xl font-bold text-charcoal">
                    Message Sent
                  </h2>
                  <p className="mt-3 text-grey">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-charcoal">
                        Enquiry Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      >
                        <option value="">Select type</option>
                        <option value="general">General</option>
                        <option value="partnership">Partnership</option>
                        <option value="training">Training</option>
                        <option value="careers">Careers</option>
                        <option value="support">Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-charcoal">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-charcoal">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={form.state}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-light-grey px-3 py-2.5 text-sm text-charcoal focus:border-manikstu-green focus:ring-1 focus:ring-manikstu-green outline-none resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-manikstu-red">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
