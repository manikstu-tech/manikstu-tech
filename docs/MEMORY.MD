# Memory — Manikstu Website Development

## Project Status: IN PROGRESS — Phase 1 (Frontend Foundation)

**Last Updated:** 2026-08-20

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
- [x] Homepage with all 7 sections (hero, stats, services, projects, products, testimonials, CTA)
- [x] globals.css (custom properties, button utilities)

---

## What Is Currently Being Worked On

**Current Phase:** Phase 1 — Foundation (frontend layout done, pending backend + patterns)
**Next Step:** SVG tribal art patterns, API client, TypeScript interfaces

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
| frontend/src/app/page.tsx | DONE | Phase 1 |
| frontend/src/app/globals.css | DONE | Phase 1 |
| frontend/src/components/layout/Header.tsx | DONE | Phase 1 |
| frontend/src/components/layout/Footer.tsx | DONE | Phase 1 |
| frontend/src/components/patterns/* | PENDING | Phase 1 |
| frontend/src/lib/utils.ts | DONE | Phase 1 |
| frontend/src/lib/api.ts | PENDING | Phase 1 |
| frontend/src/types/index.ts | PENDING | Phase 1 |
| frontend/src/app/about/page.tsx | PENDING | Phase 2 |
| frontend/src/app/team/page.tsx | PENDING | Phase 2 |
| frontend/src/app/services/page.tsx | PENDING | Phase 2 |
| frontend/src/app/products/page.tsx | PENDING | Phase 3 |
| frontend/src/app/shop/page.tsx | PENDING | Phase 3 |
| frontend/src/app/collaborate/page.tsx | PENDING | Phase 4 |
| frontend/src/app/training/page.tsx | PENDING | Phase 4 |
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
