# Project Memory & Architecture (MEMORY.md)

## Overview
**Manikstu Agro** is a tech-enabled social enterprise revolutionizing the goat farming ecosystem in rural India (headquartered in Odisha). The platform combines digital tools (Goat Care mobile app, web platform) with grassroots capacity building, breed improvement, livestock insurance, and market access (e.g., Project AJAH, Goat Bank).

---

## Tech Stack & Structure
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: FastAPI / Python backend (`backend/` directory).
- **Styling Tokens**:
  - `manikstu-green`: `#4A8C3F`
  - `manikstu-leaf`: `#3A7030`
  - `manikstu-gold`: `#C4952A`
  - `manikstu-cream`: `#FDF6EC` / `#FAF4EB`
  - `saura-red`: `#9F5233`
  - `charcoal`: `#1A1A1A`
  - `grey`: `#5A5A5A`
- **Fonts**:
  - Heading: Playfair Display / Serif (`font-heading`)
  - Body: Inter / Sans-serif (`font-body`)

---

## Core UI Components & Recent Enhancements

### 1. Training & Awareness Page (`frontend/src/app/training/page.tsx`)
- **TrainingHero (`TrainingHero.tsx`)**: Hero introducing capability building and transformation.
- **TrainingPrograms (`TrainingPrograms.tsx`)**: 6 program cards with Warli illustration panels and the double-diamond ornamental divider.
- **AwarenessInitiatives (`AwarenessInitiatives.tsx`)**: Reaching Every Village & Household with community drives, vet camps, demo plots, and the standard framed double-diamond divider.
- **TrainingImpact (`TrainingImpact.tsx`)**:
  - Redesigned "Our Reach" section with emerald gradient background (`#23581D` → `#4A8C3F` → `#1F4E1A`).
  - Top header pill: `— ◆ OUR REACH ◆ —` in gold uppercase tracking.
  - Heading: `Knowledge That Scales Across the Heartland` with **"Scales"** highlighted in gold.
  - Ornamental framed double-diamond divider with dots and lines.
  - Seamless top and bottom white tribal floral borders (`tribal-floral-border-seamless.png`).
  - Left & right subtle white mandala line art watermarks (`mandala-left.png`, `mandala-right.png`).
  - 4 compact glassmorphic stat cards (`10,000+ Farmers Trained`, `700+ Villages Reached`, `3+ States Covered`, `7,00,000+ Goats Impacted`) with white line art icon badges.
- **TrainingCTA (`TrainingCTA.tsx`)**:
  - Redesigned "Get Involved" section on warm cream background (`#FAF4EB`).
  - Header pill: `— ◆ GET INVOLVED ◆ —` with green text (`text-manikstu-green`).
  - Heading: `Partner With Us to Train the Next Generation of Farmers` with "Partner With Us" in dark green.
  - Pill button: `Request a Training Program →` in solid green with hover elevation.
  - 4 circular feature pillars with gold dashed-border rings and clean icons:
    1. *Empowering Communities* (`Users`)
    2. *Practical Training* (`GraduationCap`)
    3. *Stronger Partnerships* (`Handshake`)
    4. *Sustainable Impact* (`Sprout`)
  - Framed by large top-left quarter-mandala (`mandala-top-right.png`), right circular mandala (`mandala-right.png`), bottom-left tree/goat illustration, bottom-right village figures/hut, and bottom continuous tribal border.

### 2. Home Page (`frontend/src/app/page.tsx`)
- **Our Mission**: Standardized ornamental framed double-diamond divider under `Worldwide, fostering a prosperous and sustainable agricultural future.`
- **Project AJAH**: Standardized ornamental framed double-diamond divider under `Project AJAH` heading.
- **Our Associations Section**:
  - Redesigned to a compact section height (`py-8 sm:py-10 md:py-12`) with top and bottom tribal border strips (`tribal-border.png`).
  - Implemented continuous, smooth infinite horizontal scrolling marquee tracks with pause-on-hover (`.animate-marquee` and `.animate-marquee-reverse` in `globals.css`).
  - Retained the exact same partner card design: white rounded card with `border-b-[3px] border-b-saura-red/80`, dark mode support, and partner logos.
  - Features gradient edge fades on left and right for seamless entrance/exit.
- **Impact Stats / Mobile App / Testimonials**: Cohesive tribal and mandala design system with cultural Warli patterns and partner showcase.

---

## Design System & Divider Standard
The standard heading ornament divider across the site consists of:
```tsx
{/* Ornamental Divider with Framed Diamond */}
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
```

---

## Operational Guidelines (MEMORY.md Sync Rule)
- **Workflow**: `Code Change → Update MEMORY.md → Commit → Push`
- **Rule**: Whenever any code, UI, backend, database, configuration, or feature change is made:
  1. Keep `MEMORY.md` updated with accurate, non-duplicated information.
  2. Verify `MEMORY.md` before every git commit/push.
