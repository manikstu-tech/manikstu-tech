# Memory — Manikstu Website Development

## Project Status: IN PROGRESS — Phase 1 (Frontend Foundation)

**Last Updated:** 2026-08-23

---

## What Has Been Completed

### Documentation
- [x] PRD.MD — Project Requirements Document (updated with Laravel backend)
- [x] ARCHITECTURE.MD — Website flow, folders, tech stack (updated with Laravel)
- [x] RULES.MD — What to use, what to avoid (updated with Laravel rules)
- [x] PHASES.MD — Project phases breakdown (6 phases, updated with Laravel)
- [x] DESIGN.MD — Colors, fonts, typography + admin panel design
- [x] MEMORY.MD — This file

### Design Research
- [x] Current website analysis (manikstu.com)
- [x] Logo color extraction (#4A8C3F green, #D4342C red)
- [x] Odisha tribal art research (Saura, Pattachitra, Ikat, Ghumura, Terracotta)
- [x] Chhattisgarh tribal art research (Godna, Dhokra, Paitkar)
- [x] Kalahandi cultural heritage research
- [x] Google Stitch prompt drafted (UI/UX screens)

### Architecture Decisions
- [x] Backend changed from Sanity CMS to Laravel 11 + MySQL
- [x] Admin panel: Custom Laravel Blade (not Filament/Nova)
- [x] Auth: Multi-role (Staff, Dealer, Farmer) with Sanctum
- [x] API: REST JSON endpoints
- [x] Frontend: Next.js 14 deployed on Vercel
- [x] Backend: Laravel on VPS/hosting

### Frontend (Phase 1)
- [x] Next.js 14 project initialized
- [x] Tailwind CSS configured with custom color palette
- [x] Path aliases (`@/`) configured
- [x] Root layout with fonts (Playfair Display + Inter, self-hosted via next/font)
- [x] `cn()` utility (clsx + tailwind-merge)
- [x] Header component (responsive, mobile slide-out nav)
- [x] Footer component (4-column, dark green)
- [x] Homepage with all 10 sections (hero, mission, stats, flagship, associations, mobile app, news, testimonials, newsletter, footer)
- [x] globals.css (custom properties, button utilities, dark mode overrides, marquee animations)
- [x] Dark mode toggle (localStorage persistence)
- [x] SVG pattern library (6 inline React components)
  - [x] SauraBorder.tsx — Tribal stick-figure geometric border
  - [x] GodnaBorder.tsx — Concentric circle tattoo border
  - [x] CulturalDivider.tsx — Gold diamond divider
  - [x] DiamondAccent.tsx — Gold diamond for pill labels
  - [x] PaperTexture.tsx — Tileable paper grain
  - [x] CornerOrnament.tsx — Saura corner decorations
- [x] Associations section with cultural design system
  - [x] Two-lane marquee (opposite directions)
  - [x] Pill-style category labels with gold diamond accents
  - [x] Museum-style cards with hover effects
  - [x] `prefers-reduced-motion` support
  - [x] Accessibility (aria-hidden, pointer-events-none)

---

## What Is Currently Being Worked On

**Current Phase:** Phase 1 — Foundation (frontend layout + cultural design system done, pending backend)
**Next Step:** API client, TypeScript interfaces, .env.local configuration

---

## AI Agent Team

| # | Agent | Role | Status |
|---|-------|------|--------|
| 1 | CEO Agent | Strategic decisions, scope, priorities | READY |
| 2 | Design Agent | UI/UX specs, tribal art integration | READY |
| 3 | Laravel Agent | Backend: models, controllers, migrations, API | READY |
| 4 | Blade Admin Agent | Admin panel: Blade views, layouts, forms | READY |
| 5 | Code Writer (Next.js) | Frontend: components, pages, hooks | READY |
| 6 | Code Reviewer | Reviews ALL code (Laravel + Next.js) | READY |
| 7 | Bug Fixer | Debug & fix both codebases | READY |
| 8 | API Integration Agent | Connects Next.js to Laravel API | READY |
| 9 | SEO Analyst | SEO for frontend pages | READY |
| 10 | Content Writer | Copy, product descriptions, legal pages | READY |
| 11 | Performance Optimizer | Lighthouse 90+, Core Web Vitals | READY |
| 12 | Accessibility Agent | WCAG 2.1 AA compliance | READY |
| 13 | Testing Agent | QA testing (frontend + API) | READY |
| 14 | DevOps Agent | Deploy frontend (Vercel) + backend (VPS) | READY |
| 15 | Project Manager | Orchestrates all agents, tracks progress | READY |

---

## File Progress

### Documentation Files
| File | Status | Notes |
|------|--------|-------|
| PRD.MD | DONE | Updated with Laravel backend |
| ARCHITECTURE.MD | DONE | Updated with Laravel + Blade admin |
| RULES.MD | DONE | Updated with Laravel rules |
| PHASES.MD | DONE | Updated with Laravel phases |
| DESIGN.MD | DONE | Updated with admin panel design |
| MEMORY.MD | DONE | This file |

### Frontend Files
| File/Dir | Status | Phase |
|----------|--------|-------|
| frontend/package.json | DONE | Phase 1 |
| frontend/next.config.mjs | DONE | Phase 1 |
| frontend/tailwind.config.ts | DONE | Phase 1 |
| frontend/tsconfig.json | DONE | Phase 1 |
| frontend/.env.local | PENDING | Phase 1 |
| frontend/src/app/layout.tsx | DONE | Phase 1 |
| frontend/src/app/page.tsx | DONE | Phase 1 (updated with cultural associations section) |
| frontend/src/app/globals.css | DONE | Phase 1 (updated with cultural design, @layer components) |
| frontend/src/components/layout/Header.tsx | DONE | Phase 1 |
| frontend/src/components/layout/Footer.tsx | DONE | Phase 1 |
| frontend/src/components/layout/ThemeProvider.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/SauraBorder.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/GodnaBorder.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/CulturalDivider.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/DiamondAccent.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/PaperTexture.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/CornerOrnament.tsx | DONE | Phase 1 |
| frontend/src/lib/utils.ts | DONE | Phase 1 |
| frontend/src/lib/api.ts | PENDING | Phase 1 |
| frontend/src/types/index.ts | PENDING | Phase 1 |
| frontend/src/app/about/page.tsx | PENDING | Phase 2 |
| frontend/src/app/team/page.tsx | PENDING | Phase 2 |
| frontend/src/app/services/page.tsx | PENDING | Phase 2 |
| frontend/src/app/products/page.tsx | PENDING | Phase 3 |
| frontend/src/app/shop/page.tsx | PENDING | Phase 3 |
| frontend/src/app/collaborate/page.tsx | PENDING | Phase 4 |
| frontend/src/app/training/page.tsx | DONE | Phase 4 (renamed from Training_Awareness to match /training URL) |
| frontend/src/app/impact/page.tsx | PENDING | Phase 4 |
| frontend/src/app/blog/page.tsx | PENDING | Phase 5 |
| frontend/src/app/gallery/page.tsx | PENDING | Phase 5 |
| frontend/src/app/contact/page.tsx | PENDING | Phase 5 |
| frontend/src/app/careers/page.tsx | PENDING | Phase 5 |

### Backend Files (Laravel — Not Yet Started)
| File/Dir | Status | Phase |
|----------|--------|-------|
| backend/composer.json | PENDING | Phase 1 |
| backend/.env | PENDING | Phase 1 |
| backend/config/manikstu.php | PENDING | Phase 1 |
| backend/routes/api.php | PENDING | Phase 1 |
| backend/routes/admin.php | PENDING | Phase 1 |
| backend/database/migrations/* | PENDING | Phase 1 |
| backend/database/seeders/* | PENDING | Phase 1 |
| backend/app/Models/* | PENDING | Phase 1 |
| backend/app/Enums/* | PENDING | Phase 1 |
| backend/app/Http/Controllers/Api/* | PENDING | Phase 2 |
| backend/app/Http/Controllers/Admin/* | PENDING | Phase 2 |
| backend/app/Http/Middleware/* | PENDING | Phase 1 |
| backend/app/Http/Requests/* | PENDING | Phase 3 |
| backend/app/Services/* | PENDING | Phase 3 |
| backend/resources/views/admin/* | PENDING | Phase 1 |
| backend/resources/views/auth/* | PENDING | Phase 1 |

---

## Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-08-20 | Next.js 14 App Router | SSR/SSG, SEO, React ecosystem |
| 2026-08-20 | Laravel 11 backend | Full control, PHP ecosystem, India hosting |
| 2026-08-20 | MySQL database | Standard with Laravel, wide hosting support |
| 2026-08-20 | Custom Blade admin | Full control, no vendor lock-in |
| 2026-08-20 | Sanctum auth | Multi-role (Staff/Dealer/Farmer) |
| 2026-08-20 | REST API | Standard JSON, easy Next.js integration |
| 2026-08-20 | Razorpay | India-first payment gateway |
| 2026-08-20 | Tailwind CSS | Rapid styling, no CSS bloat |
| 2026-08-20 | Vercel (frontend) | Native Next.js hosting |
| 2026-08-20 | VPS (backend) | Full control, SSH, cron jobs |
| 2026-08-20 | Saura as primary art | Directly from Odisha, sacred, distinctive |
| 2026-08-20 | Logo colors extracted | #4A8C3F green, #D4342C red |
| 2026-08-20 | Self-hosted fonts | NOT Google Fonts CDN (performance) |
| 2026-08-21 | Inline React SVG components | Per RULES.MD:45 — tribal art as React components, not external files |
| 2026-08-21 | @layer components for CSS | Per RULES.MD:58 — custom classes via @layer only |
| 2026-08-21 | Two-lane marquee | Thematic split: Lane 1 → (Operational, Incubation, Supporting), Lane 2 ← (CSR, Investing, Banking) |
| 2026-08-21 | Museum-style cards | Gold top-line on hover, subtle shadow lift, backdrop-blur |
| 2026-08-21 | Pill-style category labels | Rounded-full with gold diamond accents, uppercase tracking |
| 2026-08-23 | Renamed `app/Training_Awareness/` → `app/training/` | Next.js kebab-lowercase URL convention; matches PRD.MD `/training` spec; updated Header + Footer nav hrefs from `/Training_Awareness` → `/training` |
| 2026-08-23 | Tailwind `darkMode: "class"` | Previously unset → defaulted to `media`, so every `dark:*` utility fired from OS `prefers-color-scheme: dark`, overriding the in-app light/dark toggle (header + Associations rendered dark even in light mode). Class strategy makes `dark:*` respect ThemeProvider's `.dark` on `<html>`. |
| 2026-08-23 | Footer copyright uses `/logo.png` (was `lucide-react` Leaf icon) | Brand consistency — the copyright bar now carries the actual Manikstu logo instead of a generic leaf glyph. Dropped unused `Leaf` import. |
| 2026-08-23 | Removed hero green-wave decoration | The right-side `absolute` SVG wave (opacity-10 green) leaked visible edges next to the "Watch Our Story" card and cluttered the hero. Deleted the decoration `<div>`; hero is now clean white. |
| 2026-08-23 | Added `hero-motif.png` tribal-mandala hero background | User-provided PNG (public/hero-motif.png) — placed as absolutely-positioned decorative `<Image>` fully inside the hero (right: 16px, h-[95%] w-auto → complete mandala visible, no bleed into the section below), opacity 0.14 (0.18 in dark mode), pointer-events-none / aria-hidden so it stays decorative and text remains readable. Wrapped in `absolute inset-0 overflow-hidden` container as extra safety. Loaded with `priority` for LCP. |
| 2026-08-23 | Added `patterns/tribal-border.png` as Associations top/bottom border | User-provided horizontal Saura-style tribal border. Source PNG (2172×724) had ~90% transparent whitespace and the full-width version tiled with visible seams. Auto-detected the pattern's horizontal repeat period via column-darkness autocorrelation (period = 138 px), then cropped to a single seamless tile (2172×724 → 138×73) starting at column 262 (chosen for minimum left/right edge diff + low content — a natural gap). Rendered as two 32px CSS-background `<div>` bands with `background-size: auto 100%` + `background-repeat: repeat-x` (~21 tiles across a 1265 px section, no visible seams). Bottom uses `-scale-y-100` to mirror inward. |
| 2026-08-23 | Removed green gradient underline under "Our Associations" heading | The `h-0.5 w-24 bg-gradient-to-r … via-manikstu-green` divider looked like a flare/underscore beneath the heading and competed with the new tribal borders framing the section. Deleted. |
| 2026-08-23 | Associations heading + subtitle scale | `<h2>Our Associations</h2>` sits at `text-3xl sm:text-4xl lg:text-5xl` (48 px desktop) — bigger than the original but not overpowering. `<p>` subtitle at `text-xs sm:text-sm mt-2` for a compact caption feel. |
| 2026-08-23 | Added `patterns/village-figures.png` at Mobile App section footer | User-provided Warli-style tribal village scene (dancers, drum, goat, bird, tree, hut). Placed twice at the bottom of the Goat Bank Mobile App section, arranged for outward-symmetry: left instance mirrored (`-scale-x-100`) so the hut sits at the outer left edge, right instance natural so the hut sits at the outer right edge. Each at `w-[45%]`, `opacity-70`, `bottom-[-40px]` (shifted down so the bottom of the figure image sits below the section boundary and gets clipped by `overflow-hidden` — figures read as a small silhouette line rather than a full band). Section is `relative overflow-hidden`; content wrapper set `relative` to layer above. |
| 2026-08-23 | Redesigned partner-category sub-headings (Operational Partners, etc.) | Replaced the boxed pill (border + white bg) with an ornamental line-diamond-text-diamond-line layout: two 8px lines flanking a small rotated square (diamond) on each side of the text. Text in `manikstu-leaf` (dark green); diamonds + lines in `manikstu-gold` (#C4952A) for a premium bronze/gold accent. Applied to both mobile stacked and desktop 3-column variants. Matches the tribal/ornamental language of the newly-added borders. |
| 2026-08-23 | Partner logo cards: earth-toned top accent | Added a 3px `border-t-saura-red/80` (terracotta `#9F5233` at 80% opacity) on top of each card while keeping the other three sides thin light-grey. Dark mode uses `manikstu-gold`. The earth stripe echoes the tribal palette (Saura red is Odisha tribal art) without shouting like a full brand border. |
| 2026-08-23 | Uniform responsive margins across all screen sizes | Section-padding standardized to `px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20` — matches Header and Footer horizontal padding at every breakpoint (16 → 24 → 32 px), instead of ballooning to `lg:px-16 xl:px-24`. All content containers switched from `max-w-6xl` to `max-w-7xl` so every section aligns to the same left/right edges as the header/footer at every viewport. Verified with no horizontal scroll at 320, 375, 640, 768, 1280, 1920. Also: hero motif height/opacity scaled down on mobile (`h-[70%] sm:h-[85%] lg:h-[95%]`, `opacity-[0.10] sm:opacity-[0.14]`), and footer copyright bar wraps to a vertical stack below `md`. |
| 2026-08-23 | Associations partner categories: 3-col grid on tablet+ (was desktop+) | Breakpoint for the stacked-vs-grid switch moved from `md` (768 px) to `sm` (640 px). Only true mobile (< 640 px) still stacks; every tablet/desktop viewport uses the same 3-column layout the user wants everywhere except phones. |
| 2026-08-23 | Installed `sharp` dependency | Next.js 14 image optimizer's fallback (Squoosh WASM) refused the new tribal-border PNG with "isn't a valid image ... received null". Sharp 0.35 fixed decoding. Standard Next.js recommendation for production/dev image optimization. |
| 2026-08-23 | Force-eager loading on Associations border images | `<Image>` defaults to `loading="lazy"`, but the borders sit inside a 64px `overflow-hidden` container that clips ~85% of the underlying image; Chromium's lazy-load heuristic then decided the image was off-screen and never fetched it. Explicit `loading="eager"` makes both borders paint on first render. |

---

## Blockers

_None currently_

---

## Notes

- 70%+ of target users are mobile-first (rural India)
- 80% of Manikstu's field staff are women
- Company is based in Kalahandi, Odisha — art must reflect this region
- Current site has 4 empty pages, typos everywhere, lorem ipsum on live site
- All content from current site to be rewritten and migrated
- Privacy policy must comply with DPDP Act 2023
- Backend hosting not yet decided — recommend DigitalOcean VPS ₹500/month
- All 6 documentation files updated with Laravel backend architecture
