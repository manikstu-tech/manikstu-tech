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

### 2. Collaborate Page (`frontend/src/app/collaborate/page.tsx`)
- **CollaborateHero (`CollaborateHero.tsx`)**:
  - Refined to match TrainingHero with top-right corner mandala artwork (`mandala-top-right-corner.png`), ornamental pill badge, Playfair serif typography with green highlight, and ecosystem line art.
- **PartnerTypes (`PartnerTypes.tsx`)**:
  - "Who We Partner With" -> "A Coalition for Lasting Impact".
  - Top-left & top-right corner mandalas (`mandala-corner-top.png`) and top tribal border.
  - Standardized framed double-diamond divider.
  - 6 clean partner category cards with dashed inner borders, dashed circular icon badges, title, and descriptions (bottom images removed for a clean, elegant look).
- **HowItWorks (`HowItWorks.tsx`)**:
  - "How It Works" -> "From First Conversation to Shared Impact".
  - Standardized framed double-diamond divider.
  - 4 clean step cards with step pill badges, dashed circular icon rings, title, and description (bottom images removed for a clean, focused process flow).
- **CollaborateImpact (`CollaborateImpact.tsx`)**:
  - "Our Network" -> "Collaboration That Reaches Across the Heartland" styled identically to TrainingImpact.
  - Emerald gradient background, top & bottom white tribal floral borders, side white mandala watermarks, and 4 compact glassmorphic metric cards (`50+ Partner Organizations`, `700+ Villages Reached`, `10,000+ Farmers Engaged`, `3+ States Covered`).
- **CollaborateCTA (`CollaborateCTA.tsx`)**:
  - "Get Involved" -> "Partner With Us to Build the Future of Rural Livelihoods" styled identically to TrainingCTA.
  - Warm cream background, top-left quarter mandala, right circular mandala, green "GET INVOLVED" pill, green CTA button `Become a Partner →`, 4 circular dashed-ring feature pillars (*Institutional Trust*, *Grassroots Delivery*, *Shared Governance*, *Sustainable Value*), and bottom village artwork.

### 3. Home Page (`frontend/src/app/page.tsx`)
- **Our Mission**: Standardized ornamental framed double-diamond divider under `Worldwide, fostering a prosperous and sustainable agricultural future.`
- **Project AJAH**: Standardized ornamental framed double-diamond divider under `Project AJAH` heading.
- **Impacting Lives Section (`page.tsx`)**:
  - Redesigned with compact vertical height (`pt-8 pb-14 sm:pt-9 sm:pb-16 md:pt-10 md:pb-20`), top-left & top-right corner mandalas (`mandala-corner-top.png`), top tribal floral border (`tribal-floral-border-seamless.png`), large prominent bottom village figures panoramic landscape banner (`village-figures.png` fine-tuned to `-bottom-2 sm:-bottom-2.5 md:-bottom-3 lg:-bottom-4` mirrored at left and right), and standardized framed double-diamond divider.
  - 4 impact metric cards styled with dashed inner borders, dashed circular icon rings, large serif numbers, line-diamond ornaments, and descriptive labels.
- **Our Associations Section**:
  - Redesigned to a compact section height (`py-8 sm:py-10 md:py-12`) with top and bottom tribal border strips (`tribal-border.png`).
  - Implemented continuous, smooth infinite horizontal scrolling marquee tracks with pause-on-hover (`.animate-marquee` and `.animate-marquee-reverse` in `globals.css`).
  - Retained the exact same partner card design: white rounded card with `border-b-[3px] border-b-saura-red/80`, dark mode support, and partner logos.
  - Features gradient edge fades on left and right for seamless entrance/exit.
- **Impact Stats / Mobile App / Testimonials**: Cohesive tribal and mandala design system with cultural Warli patterns and partner showcase.

### 4. Media & Stories Page (`frontend/src/app/blog/page.tsx`)
- **MediaHero (`MediaHero.tsx`)**:
  - Redesigned to match the split-grid layout of Collaborate and Training heroes with compact bottom padding.
  - Top-right corner mandala artwork (`mandala-top-right-corner.png`), gold diamond pill badge (`— ◆ MEDIA & STORIES ◆ —`), and Playfair serif typography.
  - Right-hand visual card with `aspect-[4/3] rounded-2xl border border-manikstu-gold/20 bg-manikstu-cream`, rural hills & goats landscape artwork (`/media-card.png`), gradient overlay, corner pill badge (`Grassroots Coverage`), and floating green icon badge (`Radio`).
- **Standard Framed Double-Diamond Dividers**:
  - **Moments from the Field (`GallerySection.tsx`)**: Standardized framed double-diamond divider under section heading.
  - **Stories in Motion (`VideosSection.tsx`)**: Standardized framed double-diamond divider under section heading.
  - **Latest Press & News (`blog/page.tsx`)**: Standardized framed double-diamond divider under section heading.
### 5. Careers Page (`frontend/src/app/careers/page.tsx`)
- **CareersHero (`CareersHero.tsx`)**:
  - Redesigned with top-right corner mandala artwork (`mandala-top-right-corner.png`), gold diamond pill badge (`— ◆ CAREERS AT MANIKSTU ◆ —`), two-tone Playfair serif typography (`Build Your Career. Grow Rural India.`), micro-statement with green leaf badge, and framed visual line-art panel with corner badge (`Purpose-driven work`) and floating badge (`Users`).
- **WhyJoinUs (`WhyJoinUs.tsx`)**:
  - Redesigned with top seamless tribal floral border (`tribal-floral-border-seamless.png`), top-left and top-right corner mandalas (`mandala-corner-top.png`), ornamental pill badge, Playfair heading, standard framed double-diamond divider, and 4 value cards with dashed inner borders, circular dashed icon rings, and line-diamond ornaments.
- **OpenPositions (`OpenPositions.tsx`)**:
  - Redesigned with top and bottom tribal border strips (`tribal-border.png`), corner mandalas, ornamental pill badge, standard framed double-diamond divider, and dashed empty state / job cards.
- **CareerBenefits (`CareerBenefits.tsx`)**:
  - Redesigned with ornamental pill badge, standard framed double-diamond divider, and 5 dashed benefit cards with circular icon rings and line-diamond ornaments.
- **ResumeCTA (`ResumeCTA.tsx`)**:
  - Redesigned to match CollaborateCTA & TrainingCTA with warm cream background (`#FAF4EB`), top-left quarter mandala, right circular mandala, green "GET IN TOUCH" pill, green CTA button `Send Us Your Resume →`, 4 circular dashed-ring feature pillars (*Impact-Driven Culture*, *Continuous Learning*, *Collaborative Teams*, *Inclusive Growth*), and bottom panoramic village scene artwork (`village-figures.png`).

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
