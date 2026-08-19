# Design Audit — Manikstu Agro Homepage

**Date:** 2026-08-20
**URL:** http://localhost:3000
**Scope:** Homepage (full page)

---

## First Impression

The site communicates **agricultural professionalism with cultural roots**. The dark green gradient hero with gold accent text feels premium and grounded. I notice the logo is clean, the nav is well-organized, and the Playfair Display heading has real personality.

**The first 3 things my eye goes to:**
1. The headline "Revolutionizing Goat Farming Ecosystem Worldwide" (strong hierarchy)
2. The gold accent on "Ecosystem Worldwide" (color contrast draws attention)
3. The two CTAs "Join Our Network" / "Explore Products" (clear next steps)

**If I had to describe this in one word:** Grounded.

---

## Design System Extraction

**Fonts:** 2 families detected
- Playfair Display (headings) — serif, expressive, good choice
- Inter (body) — clean, readable, slightly generic but appropriate

**Colors extracted:**
- `#3A7030` (dark green — hero bg, footer)
- `#4A8C3F` (manikstu green — CTAs, links)
- `#D4342C` (red — CTA button)
- `#C4952A` (gold — accent text)
- `#FDF6EC` (cream — section backgrounds)
- `#1A1A1A` (charcoal — body text)

**Heading hierarchy:** H1 → H2 → H3 — clean, no skipped levels.

---

## Findings

### HIGH Impact

**F-001: Hero section lacks visual anchor**
- The hero is text-only with a gradient overlay. No imagery, no illustration, no goat photo, no cultural pattern.
- Impact: First impression is text-heavy. Users expect a visual in the hero.
- Fix: Add a subtle Saura pattern overlay or a hero image behind the gradient.

**F-002: Services section uses generic 4-card grid**
- 4 cards in a row with icon + title + description + "Learn more →". This is the classic AI SaaS layout.
- Impact: Feels template-y, not bespoke to Manikstu.
- Fix: Vary the card layout or add images/illustrations per service.

**F-003: Testimonials section is weak**
- 3 text-only quotes in plain cards. No photos, no names styled prominently, no star ratings.
- Impact: Low trust signal. Testimonials without faces feel fabricated.
- Fix: Add avatar placeholders or at least style the names more prominently.

### MEDIUM Impact

**F-004: Stats section icons are generic**
- Heart, Users, MapPin, Award — standard Lucide icons. They don't feel agricultural.
- Fix: Use more specific icons (goat, syringe, grain, etc.) or custom SVG.

**F-005: Products section is just a list**
- 3 cards with bullet lists of product names. No images, no prices, no "Add to cart".
- Fix: This is Phase 3 (e-commerce), but even static product cards with images would help.

**F-006: CTA section background is flat green**
- Same green as the hero. The page starts and ends with the same mood.
- Fix: Use a different treatment — pattern, image, or the cream background with green text.

### POLISH

**F-007: Project cards have color bars but no images**
- The small colored bars (green, red, gold, saura red) are nice but subtle.
- Fix: Add project photos or illustrations when available.

**F-008: Footer logo uses `brightness-0 invert`**
- This makes the logo white, which loses the brand green. Works on dark bg but could be better.
- Consider: Use a white version of the logo instead of CSS filter.

**F-009: No skip-to-content link**
- Accessibility: keyboard users can't skip the nav.
- Fix: Add a visually hidden skip link.

**F-010: Mobile nav is functional but basic**
- Slide-out green panel with white text. Works but no animation, no backdrop.
- Fix: Add transition animation and backdrop blur.

---

## Score

| Category | Grade | Notes |
|----------|-------|-------|
| Visual Hierarchy | B+ | Strong hero, good heading scale |
| Typography | A- | Playfair + Inter is a solid combo |
| Color & Contrast | A | Brand colors well-applied |
| Spacing & Layout | B | Consistent, slightly uniform |
| Interaction States | B | Hover states present, no focus rings visible |
| Responsive | B | Desktop looks good, mobile needs verification |
| Content Quality | B | Good copy, testimonials need photos |
| AI Slop | B- | Services grid is the main offender |
| Motion | C | No animations yet |
| Performance | A | 97.7 kB first load, no errors |

**Design Score: B**
**AI Slop Score: B-**

---

## Quick Wins (under 30 min each)

1. **Add skip-to-content link** — 5 min, accessibility win
2. **Add hover focus rings** — 10 min, interaction polish
3. **Style testimonial names larger** — 5 min, trust signal
4. **Add subtle animation to hero** — 15 min, motion score
5. **Add Saura pattern overlay to hero** — 20 min, cultural identity

---

## Recommendations

1. **Add imagery** — The site is text-heavy. Every section would benefit from photos or illustrations.
2. **Break the symmetry** — The 4-card and 3-card grids are too uniform. Vary layouts.
3. **Add motion** — Even simple fade-in-on-scroll would improve the feel significantly.
4. **Mobile test** — Need to verify responsive behavior at 375px width.
