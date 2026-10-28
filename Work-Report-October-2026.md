# October 2026 — Work Report

**Project:** Manikstu Agro Website (manikstu-tech)
**Developer:** CodeByAftab (Frontend Lead / Full-stack)
**Period:** 1 – 31 October 2026
**Status of code:** All major work merged to `main`; final security patch in review

---

## Summary

In October I led the engineering work on the company website: completing the **Next.js 16 upgrade** across the entire multilingual frontend, closing **known security vulnerabilities (CVEs)**, building the **e-commerce checkout → real orders flow**, adding the **careers application backend with CV upload**, starting **Hindi localization**, and delivering a series of **content-credibility, performance and SEO improvements** across the site.

**Key numbers:**

| Metric | Value |
|---|---|
| Commits pushed (1–10 Oct) | 17 |
| Lines changed | ~2,200 added / ~1,000 removed |
| Files touched | ~160 |
| Static pages generated after upgrade | 425 |
| Site languages | 14 locales |
| Image payload reduction (WebP migration) | ~25 MB saved |
| Security advisories fixed | Next.js critical RCE ×3, sharp (High), source-map-js (High) |

---

## Work by Area

### 1. Next.js 16 Upgrade + Security Hardening (frontend framework)
- Upgraded the frontend from **Next.js 14 → Next.js 16** (React 18 → React 19) — App Router changes, `middleware.ts → proxy.ts` migration, async params/request APIs, and static-export compatibility fixes (`sitemap`, `robots`, root redirect).
- Verified the full **425-page static build** (14 locales) after migration, including resolving merge conflicts in the cart/checkout components.
- Closed **critical/high CVEs**: unauthenticated RCE in the Next.js Image Optimization API, App Router DoS, and `use cache` RCE — upgraded `next` to a patched release (16.4.2); bumped `sharp` (0.35.5) and pinned `source-map-js` / `postcss-selector-parser` to safe versions.
- Commit: `9d83a7cb` *Security: next 16.4.0, sharp 0.35.5, source-map-js + postcss-selector-parser pins* (patched to 16.4.2 later in the month).

### 2. E-commerce: Real Orders & Checkout Flow
- Replaced the dummy cart flow with a **real orders pipeline**: checkout now posts complete orders (items, quantities, sizes, delivery details) to the backend `/orders` API.
- Aligned checkout with the **enquiries API contract** (required email field, validation).
- Showed the order number at checkout and enabled **order tracking** (with team members).
- Commits: `9cad8332`, `27c46ec8`, `7629bbe5`, `a4f3e470`.

### 3. Careers — Application System (frontend + backend)
- Built the **job applications API** on the Laravel backend with **CV upload** support, including a database table fix.
- Human-readable job types on career detail pages.
- Commit: `ddbad29d`, `204054a0`.

### 4. Content Credibility & Brand Consistency (Phases 1–3)
- **Unified impact numbers** across every page (no more mismatched statistics).
- Corrected titles/designations (Founder-CEO / MD), unified the **Agri Solutions** brand naming, and switched all contact references to the official `contact@` mailbox (backend email setting included).
- Rewrote office/mission copy; removed the non-functional App Store badge and dead partner groups.
- Added **partner enquiry fields, team/about page wiring, newsletter subscribe**, and the **bulk enquiry** flow.
- Commits: `8652ffe0`, `aa24f2e7`, `7629bbe5`, `a4f3e470`, `b51bdec1`.

### 5. Live Data Integration
- Wired the homepage **news, partners marquee and testimonials** sections to live backend APIs with graceful fallbacks when the API is unavailable.
- Removed the dead `/partners` page and redirected traffic to `/collaborate`.
- Commits: `ce44c75c`, `ce758bb5`.

### 6. Performance & Mobile UX
- Converted site imagery to **WebP (~25 MB payload reduction)**.
- Restored visible H1 headings on mobile (SEO) and removed placeholder logos.
- Centered the Goat Care download cluster.
- Commit: `982534b4`.

### 7. Hindi Localization (i18n groundwork)
- Created the **Hindi (`hi.json`) translation draft** and imported reviewed, team-corrected Hindi strings.
- Unified Investors-page and timeline numbers across languages (feature intentionally behind a flag until sign-off).
- Cleaned dead LanguageSwitcher strings from the English catalog.
- Commits: `3d20b23a`, `1aec0673`, `60b722e`.

### 8. Documentation & Maintenance
- Documented the backend API map for the team, and cleaned up unused code paths.
- Commit: `b51bdec1`.

---

## Detailed Commit Log (1–10 October)

| Date | Commit | Description |
|---|---|---|
| 01 Oct | `204054a0` | Human-readable job type on career detail page |
| 01 Oct | `ce758bb5` | Remove partners page + admin editor; redirect to /collaborate |
| 01 Oct | `60b7227e` | Remove dead LanguageSwitcher strings |
| 01 Oct | `ce44c75c` | Homepage news / partners marquee / testimonials → live APIs with fallbacks |
| 02 Oct | `982534b4` | WebP images (~25 MB saved), mobile H1 fix, placeholder logo removal |
| 03 Oct | `8652ffe0` | Credibility phase 1: unified numbers, titles, brand, contact@ email |
| 03 Oct | `aa24f2e7` | Goat Care download cluster centering; backend contact email |
| 05 Oct | `7629bbe5` | Trust phase 2: real checkout orders, office/mission copy, apply prefill, bulk enquiry |
| 05 Oct | `a4f3e470` | Phase 3: partner enquiry fields, team/about wiring, newsletter |
| 05 Oct | `27c46ec8` | Checkout email field aligned with enquiries API contract |
| 05 Oct | `9cad8332` | Checkout posts full orders to /orders with delivery details |
| 10 Oct | `b51bdec1` | Cleanup: dead partner group removed, news fallback ordered, backend map docs |
| 10 Oct | `9d83a7cb` | Security: next 16.4.0, sharp 0.35.5, source-map-js + postcss pins |
| 10 Oct | `3d20b23a` | Hindi translation draft (hi.json), unified Investors/timeline numbers |
| 10 Oct | `ddbad29d` | Careers backend: job applications API with CV upload |
| 10 Oct | `1aec0673` | Hindi reviewed import (team-corrected strings) |

---

## In Progress (end of month)

- **Next.js 16.4.2 patch** upgrading away from 3 critical Next.js advisories — build verified (425 pages), ready to commit.
- Final `npm audit` sweep: only remaining findings are build-time-only tooling advisories with zero exposure on the shipped site.
- Hindi localization is staged and awaiting content sign-off before enabling publicly.

---

*Report prepared on 23 October 2026 from the project git history.*
