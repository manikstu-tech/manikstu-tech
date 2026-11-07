// The footer's text, shown on every page and editable from /admin ("Whole site: Footer").
export const FOOTER = {
  columns: [
    {
      // Curated for an investor audience: a research + verification agent confirmed every route and content claim
      // (Nov 2026) before this list was applied. The two home-page anchor links ("Our impact", "Market outlook")
      // were dropped after an actual browser test showed clicking "/#impact" from another page lands at the top
      // of the home page instead of scrolling to the section (untested whether other "/#id" links share this).
      // See that review for what else was deliberately left out (About us, Products, Contact — covered elsewhere;
      // Recognition — still a "coming soon" stub).
      title: "Quick Links",
      links: [
        { label: "Our investors", href: "/investors" },
        { label: "Our teams", href: "/teams" },
        { label: "Our partners", href: "/partners" },
        { label: "Our Media", href: "/blogs" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Project AJAH", href: "/projects/ajah" },
        { label: "Aangan Lakshmi", href: "/projects/aangan-lakshmi" },
        { label: "Sujalam Suphalam", href: "/projects/sujalam-suphalam" },
      ],
    },
    {
      // "Partners & Investors" was renamed to "Partners": an audit agent (Nov 2026) found "Investors" here was
      // redundant and inaccurate now that Quick Links covers that audience separately, and /join (no query param)
      // already defaults to the partner-framed form, not investor copy — see that review for the full reasoning.
      title: "Work with us",
      links: [
        { label: "Franchise", href: "/franchise" },
        { label: "FPO Connect", href: "/fpo" },
        { label: "Partners", href: "/join" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ],
  kicker: "Got a question or a project in mind?",
  big: "Let's talk",
  callUs: "Call us",
  legal: [
    { label: "Cookies Policy", href: "/cookies" },
    { label: "Legal Terms", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  // Shown after "© <year>"
  copyright: "Manikstu Agro Private Limited. All rights reserved.",
  registration: "CIN: U74900PN2015PTC154344 · GSTIN: 21AAJCM6881B1ZM",
}
