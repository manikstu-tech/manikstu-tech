# Manikstu Agro — Deployment & Usability Fix Plan

Updated: 2026-08-29

---

## Part 1: Deployment (Shared Hosting + Vercel)

### Architecture
```
manikstu.com (GoDaddy DNS)
    ├── manikstu.com → Vercel (Next.js frontend)
    ├── www.manikstu.com → Vercel (Next.js frontend)
    └── api.manikstu.com → Hostinger Shared Hosting (Laravel API)
```

### Why This Setup?
- **Shared hosting** can't run Node.js → Next.js needs Vercel (free)
- **Laravel** runs fine on shared hosting (PHP + MySQL)
- **Vercel** provides free SSL, CDN, and auto-deploys for Next.js

### Deployment Files
See `deploy/` folder for step-by-step guides:
1. `01-DEPLOYMENT-GUIDE.md` — Overview
2. `02-HOSTINGER-BACKEND.md` — Laravel deployment
3. `03-VERCEL-FRONTEND.md` — Next.js deployment
4. `04-GODADDY-DNS.md` — DNS configuration
5. `05-FINAL-CHECKS.md` — Go-live checklist
6. `.env.production` — Backend environment template

---

## Part 2: 15 Usability Fixes

### Issue 1: No consistent type scale (12 distinct font sizes)
- **Severity:** Minor
- **File:** `tailwind.config.ts` + various components
- **Fix:** Consolidate to ~8 sizes via `fontSize` tokens. Map ad-hoc sizes (`text-[10px]`, `text-[9px]`) to nearest token.

### Issue 2: Inconsistent corner radii (7 distinct)
- **Severity:** Minor
- **Files:** Multiple
- **Fix:** Standardize to: `rounded-sm` (0.25rem), `rounded-lg` (0.5rem), `rounded-xl` (0.75rem), `rounded-2xl` (1rem), `rounded-full`. Remove ad-hoc like `rounded-[2.5rem]`.

### Issue 3: Long all-caps text
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:323`
- **Fix:** Reduce `tracking-[0.25em]` to `tracking-[0.15em]` on pill text, or shorten copy.

### Issue 4: Footer columns inconsistent spacing
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:62`
- **Fix:** Change `gap-6 sm:gap-8` → `gap-6 sm:gap-8 lg:gap-10`. Add `lg:pr-8` to Stay Updated column.

### Issue 5: Social proof line offset
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:266`
- **Fix:** Adjust `mt-5 sm:mt-8` → `mt-5 sm:mt-6` for better alignment with H1/button left edge.

### Issue 6: Empty avatar circles
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:271-278`
- **Fix:** Add initials inside circles or remove entirely. Simplest: add letter "F" with `bg-manikstu-green/20`.

### Issue 7: Partner logos too small in cards (MAJOR)
- **Severity:** Major
- **File:** `app/[locale]/page.tsx:700`
- **Fix:** Change `max-h-10 w-auto max-w-[100px]` → `max-h-12 w-auto max-w-[120px]` and card `w-32 sm:w-36` → `w-36 sm:w-40`.

### Issue 8: Marquee clips harshly at edges
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:680-686`
- **Fix:** Widen fade gradients from `w-12 sm:w-28` → `w-16 sm:w-32`. (Already has gradients, just needs widening.)

### Issue 9: Office addresses uneven padding
- **Severity:** Suggestion
- **File:** `components/layout/Footer.tsx:205`
- **Fix:** Change `p-4 sm:p-6` → `p-5 sm:p-6` on offices container.

### Issue 10: Redundant nav rendered mid-page (MAJOR)
- **Severity:** Major
- **File:** `components/layout/Header.tsx`
- **Fix:** The mobile nav (`lg:hidden`) is showing when it shouldn't. Verify `hidden lg:flex` on desktop nav and `lg:hidden` on mobile nav are correctly applied. Check if viewport triggers mobile nav unexpectedly.

### Issue 11: Learn More button too thin
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:260`
- **Fix:** Change `border-2 border-charcoal` → `border-2 border-charcoal bg-charcoal/5` for subtle background tint.

### Issue 12: Auto-scroll marquee distracting
- **Severity:** Minor
- **File:** `globals.css`
- **Fix:** Add `@media (prefers-reduced-motion: reduce) { .animate-marquee, .animate-marquee-reverse { animation: none; } }` to respect user motion preferences.

### Issue 13: Video placeholder lacks play signifier (MAJOR)
- **Severity:** Major
- **File:** `app/[locale]/page.tsx:286-288`
- **Fix:** Replace generic `<Users>` icon with a play button overlay or actual thumbnail image.

### Issue 14: Newsletter input gap too large
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:188-194`
- **Fix:** Change `mt-3` on `<p>` to `mt-2` and `mt-3` on `<input>` to `mt-2`.

### Issue 15: Careers button too dominant in footer
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:166-169`
- **Fix:** Change solid green to outline: `bg-manikstu-green text-white` → `border border-manikstu-green text-manikstu-green hover:bg-manikstu-green hover:text-white`.

---

## Files to Modify

| File | Issues |
|------|--------|
| `tailwind.config.ts` | #1, #2 |
| `app/[locale]/page.tsx` | #3, #5, #6, #7, #8, #11, #13 |
| `components/layout/Footer.tsx` | #4, #9, #14, #15 |
| `components/layout/Header.tsx` | #10 |
| `src/app/globals.css` | #12 |
| `config/cors.php` (backend) | Deployment |
| `frontend/.env.local` | Deployment |
| `backend/.env` | Deployment |
