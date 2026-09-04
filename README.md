# Manikstu Agro — Website

> Revolutionizing Goat Farming Ecosystem Worldwide

## Overview

Complete website for [manikstu.com](https://manikstu.com) — a goat farming ecosystem platform for Manikstu Agro Private Limited, founded 2015 in Kalahandi, Odisha, India.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + TypeScript |
| Backend | Laravel 13 (requires PHP 8.3+) + Blade admin panel |
| Database | SQLite (local dev) / MySQL 8 (production) |
| Auth | Laravel Sanctum (Admin / Developer / Telecaller roles) |
| i18n | next-intl v4.13 — 14 languages, `[locale]` URL routing |
| Images | sharp (next/image optimization) |
| Hosting | Hostinger (frontend + backend) |
| DNS | GoDaddy (manikstu.com) |

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Admin panel: [http://localhost:8000/admin/login](http://localhost:8000/admin/login)

Default admin credentials: `admin@manikstu.com` / `password` (change for production).

## Project Structure

```
manikstu-tech/
├── docs/                               # Project documentation
│   ├── PRD.MD                          # Requirements, features, target users
│   ├── ARCHITECTURE.MD                 # System design, API endpoints, DB schema
│   ├── RULES.MD                        # Laravel + Next.js conventions
│   ├── PHASES.MD                       # Development phases with tasks
│   ├── DESIGN.MD                       # Colors, typography, component specs
│   └── MEMORY.MD                       # Progress tracker, decisions log
├── frontend/                           # Next.js 14 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/               # i18n routed pages (14 locales)
│   │   │   │   ├── layout.tsx          # Locale layout (fonts, metadata)
│   │   │   │   ├── page.tsx            # Homepage
│   │   │   │   ├── about/              # About page
│   │   │   │   ├── services/           # Services page
│   │   │   │   ├── products/           # Product catalog
│   │   │   │   ├── careers/            # Job listings
│   │   │   │   ├── collaborate/        # Collaboration (includes /ajah)
│   │   │   │   ├── training/           # Training programs
│   │   │   │   ├── blog/               # Blog posts
│   │   │   │   ├── help/               # Help center
│   │   │   │   ├── contact/            # Contact form
│   │   │   │   ├── privacy/            # Privacy policy
│   │   │   │   └── terms/              # Terms of service
│   │   │   ├── robots.ts               # SEO: robots.txt generation
│   │   │   ├── sitemap.ts              # SEO: sitemap.xml with hreflang
│   │   │   └── globals.css             # Tailwind + dark mode overrides
│   │   ├── components/
│   │   │   ├── layout/                 # Header, Footer, ThemeProvider
│   │   │   ├── patterns/               # 6 SVG cultural patterns
│   │   │   └── seo/                    # JsonLd structured data component
│   │   ├── i18n/
│   │   │   ├── request.ts              # next-intl request config
│   │   │   └── routing.ts              # 14 locale routing definition
│   │   ├── lib/
│   │   │   └── utils.ts                # cn(), formatPrice()
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript interfaces
│   │   └── middleware.ts               # next-intl locale middleware
│   ├── messages/                       # Translation files (14 locales)
│   │   ├── en.json, hi.json, bn.json, ta.json, te.json,
│   │   ├── mr.json, gu.json, kn.json, ml.json, or.json,
│   │   ├── ja.json, de.json, fr.json, es.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── package.json
├── backend/                            # Laravel 13
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── ApiController.php       # Public REST API
│   │   │   │   ├── Admin/                  # Admin panel controllers
│   │   │   │   └── Telecalling/            # Telecalling module
│   │   │   └── Middleware/
│   │   │       ├── SecurityHeaders.php     # HSTS, CSP, X-Frame-Options, etc.
│   │   │       ├── EnsureUserRole.php      # Role-based access
│   │   │       ├── RoleArea.php            # Area guard (admin/telecalling)
│   │   │       └── VerifyCaptcha.php       # CAPTCHA verification
│   │   └── Models/                         # Eloquent models
│   ├── config/cors.php                     # Env-based CORS origins
│   ├── routes/
│   │   ├── web.php                         # Admin + Telecalling routes
│   │   └── api.php                         # Public REST API routes
│   ├── bootstrap/app.php                   # Middleware registration
│   └── deploy/                             # Deployment guides
├── README.md
├── SECURITY.md
└── .gitignore
```

## Pages (13)

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/{locale}` | Hero, mission, stats, flagship, associations, mobile app, news, testimonials, newsletter |
| About | `/{locale}/about` | Company history, team, values |
| Services | `/{locale}/services` | Goat farming services |
| Products | `/{locale}/products` | Product catalog with categories |
| Careers | `/{locale}/careers` | Job openings |
| Collaborate | `/{locale}/collaborate` | Partnership opportunities |
| AJAH | `/{locale}/collaborate/ajah` | AJAH collaboration program |
| Training | `/{locale}/training` | Training programs |
| Blog | `/{locale}/blog` | Blog posts with categories |
| Help | `/{locale}/help` | Help center |
| Contact | `/{locale}/contact` | Contact form (enquiry submission) |
| Privacy | `/{locale}/privacy` | Privacy policy |
| Terms | `/{locale}/terms` | Terms of service |

## Internationalization (i18n)

14 languages supported via `next-intl`:

| Code | Language | Code | Language |
|------|----------|------|----------|
| en | English | kn | Kannada |
| hi | Hindi | ml | Malayalam |
| bn | Bengali | or | Odia |
| ta | Tamil | ja | Japanese |
| te | Telugu | de | German |
| mr | Marathi | fr | French |
| gu | Gujarati | es | Spanish |

- Default locale: `en`
- URL format: `https://manikstu.com/hi/products`
- Middleware auto-detects browser locale and redirects

## SEO

- `metadataBase` set to `https://manikstu.com`
- `robots.ts` — auto-generated, blocks `/api/` and `/admin/`
- `sitemap.ts` — 182 URLs (13 routes x 14 locales), with hreflang alternates
- JSON-LD structured data: Organization, WebSite, Product, FAQPage
- `next/image` used for all images (automatic optimization)
- Twitter cards and Open Graph metadata per page

## API Endpoints

Public REST API at `api.manikstu.com/api`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/settings` | GET | Site settings |
| `/navigation` | GET | Navigation menus (locale-aware) |
| `/footer` | GET | Footer links (locale-aware) |
| `/pages/{slug}` | GET | Page content with blocks |
| `/blog` | GET | Blog posts (paginated, filterable) |
| `/blog/{slug}` | GET | Single blog post |
| `/blog/categories` | GET | Blog categories |
| `/press` | GET | Press releases |
| `/press/{slug}` | GET | Single press release |
| `/products` | GET | Products (paginated, filterable) |
| `/products/{slug}` | GET | Single product |
| `/categories` | GET | Categories (filterable by type) |
| `/testimonials` | GET | Testimonials |
| `/team` | GET | Team members |
| `/careers` | GET | Job openings |
| `/training` | GET | Training programs |
| `/awareness` | GET | Awareness initiatives |
| `/stats` | GET | Impact statistics |
| `/gallery` | GET | Gallery images (paginated) |
| `/partners` | GET | Partners |
| `/enquiries` | POST | Submit enquiry |
| `/orders` | POST | Create order (Sanctum auth) |

## Backend Features

- **Admin Panel** — Laravel Blade with dashboard, CRUD for all content types
- **Telecalling Module** — Separate area for telecallers (farmers, orders, complaints, franchise, reports)
- **Role-based Access** — Admin, Developer (destructive ops), Telecaller
- **Password Reset** — Email-based password reset flow
- **Media Management** — File upload with type/size validation
- **Category System** — Type-filterable categories (blog, product, press)

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Manikstu Green | `#4A8C3F` | Primary buttons, links |
| Manikstu Red | `#D4342C` | CTA buttons, urgency |
| Leaf Dark | `#3A7030` | Header, footer, dark backgrounds |
| Forest Green | `#2D5016` | Deep accents |
| Cream Silk | `#FDF6EC` | Warm section backgrounds |
| Bamboo Gold | `#C4952A` | Accents, highlights |
| Saura Red | `#9F5233` | Tribal art accents |
| Charcoal | `#1A1A1A` | Dark backgrounds |
| Grey | `#5A5A5A` | Secondary text |

## Deployment

### Architecture

```
manikstu.com (GoDaddy DNS)
    ├── manikstu.com → Hostinger (Next.js frontend)
    └── api.manikstu.com → Hostinger (Laravel API + MySQL)
```

### Frontend (Hostinger)

- Deployed via Hostinger Git integration (auto-deploys from `main` branch)
- Build: `next build` with production optimizations
- Performance score: 96 (desktop)

### Backend (Hostinger)

- Files at: `/home/u304297356/domains/api.manikstu.com/public_html/`
- MySQL: `u304297356_manikstu` database
- `proc_open` disabled on Hostinger PHP — CLI commands unavailable
- Web-based `setup.php` for migrations/seeders (delete after use)

### Deployment Guides

| Document | Description |
|----------|-------------|
| `deploy/01-DEPLOYMENT-GUIDE.md` | Architecture overview |
| `deploy/02-HOSTINGER-BACKEND.md` | Backend deployment steps |
| `deploy/03-VERCEL-FRONTEND.md` | Frontend deployment (legacy, now on Hostinger) |
| `deploy/04-GODADDY-DNS.md` | DNS configuration |
| `deploy/05-FINAL-CHECKS.md` | Pre-launch checklist |

## Documentation

| Document | Description |
|----------|-------------|
| [PRD.MD](./docs/PRD.MD) | Requirements, features, target users |
| [ARCHITECTURE.MD](./docs/ARCHITECTURE.MD) | System design, API endpoints, DB schema |
| [RULES.MD](./docs/RULES.MD) | Laravel + Next.js conventions |
| [PHASES.MD](./docs/PHASES.MD) | Development phases with tasks |
| [DESIGN.MD](./docs/DESIGN.MD) | Colors, typography, admin panel design |
| [MEMORY.MD](./docs/MEMORY.MD) | Progress tracker, agent team, decisions |

## Security

See [SECURITY.md](./SECURITY.md) for the full security policy.

Key measures:
- SecurityHeaders middleware (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- CORS env-based origins (not hardcoded)
- Login throttling (5 attempts/minute)
- Role-based route access (DELETE ops behind `role:developer`)
- Server-side order total calculation
- Filename sanitization and path traversal protection
- SVG upload disabled (stored XSS prevention)
- `APP_DEBUG=false` in production
- `robots.txt` blocks `/api/` and `/admin/`

## License

Private — Manikstu Agro Private Limited
