"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, ArrowRight, Link2, Headphones, ChevronRight, Send, MapPin } from "lucide-react";
import { getSettings, getFooter } from "@/lib/api";
import type { FooterLink } from "@/types";

const fallbackQuickLinks: FooterLink[] = [
  { id: 1, group: "quick", label: "About Us", url: "/about", order: 1, is_active: true },
  { id: 2, group: "quick", label: "Our Services", url: "/services", order: 2, is_active: true },
  { id: 3, group: "quick", label: "Our Products", url: "/products", order: 3, is_active: true },
  { id: 4, group: "quick", label: "Media", url: "/blog", order: 4, is_active: true },
  { id: 5, group: "quick", label: "Collaborate", url: "/collaborate", order: 5, is_active: true },
  { id: 6, group: "quick", label: "Training & Awareness", url: "/training", order: 6, is_active: true },
];

const fallbackSupportLinks: FooterLink[] = [
  { id: 7, group: "support", label: "Help Center", url: "/help", order: 1, is_active: true },
  { id: 8, group: "support", label: "Contact Us", url: "/contact", order: 2, is_active: true },
  { id: 9, group: "support", label: "Privacy Policy", url: "/privacy", order: 3, is_active: true },
  { id: 10, group: "support", label: "Terms & Conditions", url: "/terms", order: 4, is_active: true },
];

const fallbackSettings: Record<string, string> = {
  brand_tagline: "Building a prosperous and sustainable agricultural future through innovation, collaboration and empowerment.",
  phone: "+91 82703 31856",
  email_sales: "sales@manikstu.com",
  email_info: "info@manikstu.com",
  address_registered: "Row House No - 94, Ravi Garden, Pune Solapur Road, Manjri Budruk, Hadapsar, Pune - 412307",
  address_corporate: "Plot No-754, 14, Gangadhar Meher Marg, near Pabitra Guest House, Jayadev Vihar, Bhubaneswar, Odisha 751013",
  address_farm: "At/Po: Salebhata, P.S: Kegaon, via: Borda, Kalahandi, Odisha - 766036",
  address_regional: "CMTC Campus, Serikhedi, Chhattisgarh - 492012",
  gstin: "21AAJCM6881B1ZM",
  cin: "U74900PN2015PTC154344",
};

export default function Footer() {
  const [settings, setSettings] = useState(fallbackSettings);
  const [quickLinks, setQuickLinks] = useState(fallbackQuickLinks);
  const [supportLinks, setSupportLinks] = useState(fallbackSupportLinks);
  const t = useTranslations("Footer");
  const tCommon = useTranslations("Common");

  useEffect(() => {
    getSettings()
      .then((res) => setSettings(res.data))
      .catch(() => {});
    getFooter()
      .then((res) => {
        if (res.data.quick) setQuickLinks(res.data.quick);
        if (res.data.support) setSupportLinks(res.data.support);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-white border-t border-light-grey">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-3 sm:py-12 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Manikstu Agro"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-grey">
              {settings.brand_tagline || t("brandTagline")}
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: settings.facebook || "https://www.facebook.com/ManikstuAgroPrivateLimited?mibextid=ZbWKwL" },
                { Icon: Instagram, label: "Instagram", href: settings.instagram || "#" },
                { Icon: Linkedin, label: "LinkedIn", href: settings.linkedin || "#" },
                { Icon: Youtube, label: "YouTube", href: settings.youtube || "#" },
              ].map(({ Icon, label, href }, i) => {
                const external = href !== "#";
                return (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green hover:bg-manikstu-green hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Link2 className="h-3.5 w-3.5" />
              </span>
              {t("quickLinks")}
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="flex items-center gap-1 text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0 text-manikstu-green" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Headphones className="h-3.5 w-3.5" />
              </span>
              {t("support")}
            </h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="flex items-center gap-1 text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0 text-manikstu-green" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Phone className="h-3.5 w-3.5" />
              </span>
              {t("contactUs")}
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-2 text-sm text-grey">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                {settings.phone}
              </li>
              <li className="flex items-start gap-2 text-sm text-grey">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span>{settings.email_sales}<br /><span className="text-xs text-grey/70">{t("forSalesEnquiry")}</span></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-grey">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Send className="h-3.5 w-3.5" />
                </span>
                <span>{settings.email_info}<br /><span className="text-xs text-grey/70">{t("forOtherEnquiry")}</span></span>
              </li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-manikstu-green px-4 py-2 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
              >
                {t("careers")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/get-in-touch"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-manikstu-green bg-white px-4 py-2 text-sm font-semibold text-manikstu-green hover:bg-manikstu-green hover:text-white transition-colors"
              >
                {t("getInTouch")} <Phone className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Mail className="h-3.5 w-3.5" />
              </span>
              {t("stayUpdated")}
            </h3>
            <p className="mt-3 text-sm text-grey leading-relaxed">
              {t("newsletterDesc")}
            </p>
            <input
              type="email"
              placeholder={tCommon("enterEmail")}
              className="mt-3 w-full rounded-lg border border-light-grey px-4 py-2.5 text-sm text-charcoal placeholder:text-grey/50 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green"
            />
            <button className="mt-3 w-full rounded-lg bg-manikstu-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors">
              {tCommon("subscribe")}
            </button>
          </div>
        </div>
      </div>

      {/* Our Offices */}
      <div className="mx-auto max-w-7xl px-4 pt-1 pb-6 sm:py-6 sm:px-6 md:px-8">
        <div className="rounded-xl border border-light-grey p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">{t("registeredOffice")}</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">{settings.address_registered}</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">{t("corporateOffice")}</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">{settings.address_corporate}</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">{t("farmOffice")}</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">{settings.address_farm}</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">{t("regionalOffice")}</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">{settings.address_regional}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-light-grey bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-3 text-center text-xs text-grey sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:gap-2">
            <span>&copy; {new Date().getFullYear()} {t("copyright")}</span>
            <span className="hidden sm:inline" aria-hidden>&bull;</span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
              <span>GSTIN: {settings.gstin}</span>
              <span aria-hidden>&bull;</span>
              <span>CIN: {settings.cin}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
