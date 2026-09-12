# Project Memory & Architecture (MEMORY.md)

## Overview
**Manikstu Agro** is a tech-enabled social enterprise revolutionizing the goat farming ecosystem in rural India (headquartered in Odisha). The platform combines digital tools (Goat Care mobile app, web platform, telecalling CRM, admin management portal) with grassroots capacity building, breed improvement, livestock insurance, and market access (e.g., Project AJAH, Goat Bank).

---

## Tech Stack & Architecture

### 1. Frontend: Next.js 14 (App Router)
- **Framework**: Next.js 14 (TypeScript, App Router, React Server Components & Server Actions).
- **Internationalization**: `next-intl` multi-language routing across 14 supported locales under `[locale]`.
- **Styling**: Tailwind CSS, Lucide React, Framer Motion, Vanilla CSS custom animations.
- **Admin & Telecalling**: Migrated entirely into Next.js (`/admin/*`), communicating directly with Laravel API via Sanctum bearer tokens.

### 2. Backend: Laravel 11/13 REST API (Standalone Repo)
- **Standalone Location**: `C:\Users\biswa\.gemini\antigravity-ide\scratch\manikstu-backend`
- **API Server**: Laravel REST API serving both public customer-facing queries and internal staff operations.
- **Auth & Session**: Laravel Sanctum with dual guards (`sanctum` for customers, `auth:admin-api` for staff/admin users).
- **Database**: SQLite (local) / MySQL (production) with Eloquent ORM.
- **Media Optimization Engine (`MediaOptimizer.php`)**:
  - **Photos (Up to 10MB upload)**: High-fidelity preservation up to 2560px 2K QHD, natural sharpness edge restoration, & auto-conversion to WebP (92% quality), maintaining visually lossless original clarity while reducing 5MB-10MB files to ~300KB-700KB (85%+ storage saving).
  - **Videos (Up to 100MB upload)**: Automatic H.264/AAC compression via FFmpeg (CRF 24, 1080p max, `+faststart` progressive streaming atom), reducing video sizes by 60%-80% while enabling instant web playback without buffering.

### 3. Design Tokens & Styling
- `manikstu-green`: `#4A8C3F`
- `manikstu-leaf`: `#3A7030`
- `manikstu-gold`: `#C4952A`
- `manikstu-cream`: `#FDF6EC` / `#FAF4EB`
- `saura-red`: `#9F5233`
- `charcoal`: `#1A1A1A`
- `grey`: `#5A5A5A`
- **Typography**: Playfair Display (`font-heading`) & Inter (`font-body`).

---

## Credentials & Seeders Reference

| Role | Email / ID | Default Password | Environment Variable | Assigned Area |
| :--- | :--- | :--- | :--- | :--- |
| **Admin / Developer** | `admin@manikstu.com` | `password` | `ADMIN_PASSWORD` (in `backend/.env`) | `/admin/dashboard` |
| **Telecaller** | `telecalling@manikstu.com` | `password` | `TELECALLER_PASSWORD` | `/admin/telecalling` |

- **Seeders**:
  - `DatabaseSeeder.php` calls `AdminSeeder`, `TelecallerSeeder`, `ContentSeeder`, `ProductSeeder`.
  - `AdminSeeder.php`: Creates or updates `admin@manikstu.com` with role `developer`.
  - `TelecallerSeeder.php`: Creates or updates `telecalling@manikstu.com` with role `telecaller`.

---

## Authentication & Authorization Flow

### Next.js Frontend Flow
1. **Login Page**: `frontend/src/app/admin/(auth)/login/` (`/admin/login`) accepts email/password.
2. **Server Action**: `loginAction` calls `adminLogin(email, password)` in `frontend/src/lib/admin/auth.ts`.
3. **API Request**: Posts credentials to Laravel endpoint `/api/admin/login`.
4. **Token Storage**: On success, bearer token is stored securely in an `httpOnly` cookie (`ADMIN_COOKIE`).
5. **Role Redirection**:
   - `role === "telecaller"` ➔ redirected to `/admin/telecalling`
   - `role === "developer" | "admin"` ➔ redirected to `/admin/dashboard`
6. **Middleware & Route Guards**:
   - `frontend/src/middleware.ts`: Optimistically checks cookie existence for `/admin/*` routes.
   - `requireAdmin()`: Calls `/api/admin/me`; redirects telecallers to `/admin/telecalling` and unauthenticated to `/admin/session-expired`.
   - `requireTelecaller()`: Calls `/api/admin/me`; redirects non-telecallers to `/admin/dashboard`.

### Laravel Backend API Flow (`backend/routes/api.php`)
- `POST /api/admin/login` (rate-limited via `throttle:admin-login`)
- `POST /api/admin/logout`
- `GET /api/admin/me` (rate-limited 120 req/min)
- Middleware Guards:
  - `admin.area`: Allows `developer` and `admin` roles only.
  - `telecalling.area`: Allows `telecaller` role only.
  - `role:developer`: Restricts destructive operations (DELETE) and sensitive settings/user management.

---

## Admin Portal Modules (`frontend/src/app/admin/(panel)`)

1. **Dashboard** (`/admin/dashboard`): Metrics, quick stats, recent enquiries & orders.
2. **Products** (`/admin/products`): Full product management, pricing, stock, categories, images, toggle publish.
3. **Sections CRUD** (`/admin/[section]`):
   - Categories, Team, Testimonials, Partners, Training Programs, Awareness Initiatives, Careers, Blog Posts, Press Releases, Customers, Orders.
4. **Pages & Blocks** (`/admin/pages`): Visual block editor (`BlocksEditor.tsx`) and page content management.
5. **Media Library** (`/admin/media`): Image and asset manager with upload sanitization.
6. **Site Settings** (`/admin/settings`): Developer-only global configuration and contact settings.
7. **User Management** (`/admin/users`): Developer-only staff account creation and role assignment.

---

## Telecalling Operations Portal (`frontend/src/app/admin/telecalling`)

1. **Dashboard** (`/admin/telecalling`): Quick stats, call queues, daily assignments, urgent alerts.
2. **Orders** (`/admin/telecalling/orders` & `/orders/[id]`): Order verification, customer notes, status tracking.
3. **Complaints** (`/admin/telecalling/complaints` & `/complaints/[id]`): Resolution workflows, severity tags, internal notes.
4. **Farmers** (`/admin/telecalling/farmers`): Farmer directory, goat health records, scheme enrollments.
5. **Franchise** (`/admin/telecalling/franchise` & `/franchise/[id]`): Leads, vetting pipeline, onboarding.
6. **Calls** (`/admin/telecalling/calls`): Inbound/outbound call logs, follow-up reminders.
7. **Delivery** (`/admin/telecalling/delivery`): Dispatch tracking, delivery partner coordination.
8. **Reports** (`/admin/telecalling/reports`): Call performance, complaint resolution rates, order conversions.
9. **Settings & Profile** (`/admin/telecalling/settings`): Profile updates, notification preferences, internal notes.

---

## Core UI Components & Tribal Art System

### Standard Ornamental Heading Divider
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

### Visual Assets & Motif Standards
- **Mandala Corners**: `mandala-corner-top.png`, `mandala-top-right-corner.png`, `mandala-left.png`, `mandala-right.png`.
- **Tribal Borders**: `tribal-floral-border-seamless.png`, `tribal-border.png`.
- **Village Landscape Art**: `village-figures.png`, `media-card.png`.
- **Cards**: Dashed inner borders (`border-dashed border-manikstu-gold/40`), circular dashed icon rings, soft glassmorphic backdrops.
- **Image Skeleton Loaders (`ImageWithSkeleton.tsx`)**: YouTube-style animated shimmer wave gradients with smooth `opacity-0` ➔ `opacity-100` crossfades during asset download.

---

## Operational Guidelines (MEMORY.md Sync Rule)
- **Workflow**: `Code Change → Update MEMORY.md → Commit → Push`
- **Rule**: Whenever any code, UI, backend, database, configuration, or feature change is made:
  1. Keep `MEMORY.md` updated with accurate, non-duplicated information.
  2. Verify `MEMORY.md` before every git commit/push.
