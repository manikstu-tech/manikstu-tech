# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest main branch | :white_check_mark: |
| Previous releases | :x: |

This is a private repository. Only the latest deployment on `main` receives security updates. Older versions are not maintained.

## Reporting a Vulnerability

If you discover a security vulnerability in any Manikstu Agro product, service, or infrastructure, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

### How to Report

Email: **security@manikstu.com**

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to Expect

| Step | Timeline |
|------|----------|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix or mitigation | Depends on severity, typically within 30 days |
| Disclosure | Coordinated with reporter after fix is deployed |

We will confirm receipt, provide an estimated timeline, and keep you updated throughout the process.

### Scope

This policy covers:

- **manikstu.com** (customer-facing website)
- **api.manikstu.com** (REST API)
- **Admin panel** (Laravel Blade backend)
- **Telecalling module** (staff interface)
- **REST API** (Laravel + Sanctum)
- **Authentication and session management**
- **Data handling and storage**
- **Hostinger hosting panel**

### Out of Scope

- Social engineering attacks
- Physical attacks on Manikstu Agro facilities
- Issues in third-party services not under our control

## Security Measures

### Backend (Laravel 13)

#### Headers & Transport

- **SecurityHeaders middleware** applied to all responses:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (production only)
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'` (production only)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- HTTPS enforced in production via `AppServiceProvider`
- `SESSION_SECURE_COOKIE=true` in production

#### Authentication & Authorization

- CSRF protection enabled on all web routes (no exceptions)
- Login brute-force throttling: 5 attempts/minute
- Admin area throttling: 120 requests/minute
- bcrypt password hashing
- Session cookies: `httpOnly`, `same_site=lax`
- Role-based access control: Admin, Developer, Telecaller
- Area guard middleware (`area:admin`, `area:telecalling`) prevents cross-area access
- DELETE operations restricted to `role:developer` only
- User administration restricted to `role:developer` only
- Password reset flow with rate limiting (5 requests/minute)

#### Input Validation & Sanitization

- Locale whitelist validation in ApiController (14 allowed locales)
- `per_page` parameter clamped to 1–100 in all paginated endpoints
- Server-side order total calculation (client price never trusted)
- Filename sanitization: `strip_tags()` on upload names
- LIKE query escaping: `addcslashes()` on search inputs
- File upload validation: type whitelist (jpg, jpeg, png, gif, webp, pdf), max 10MB
- SVG upload disabled (XML-based stored XSS prevention)
- Path traversal protection in MediaController destroy (realpath + directory whitelist)

#### Configuration

- `APP_DEBUG=false` in production (no stack traces, env, or queries exposed)
- CORS origins configurable via `CORS_ORIGINS` environment variable (not hardcoded)
- `.env` file outside version control
- Admin password read from `ADMIN_PASSWORD` env var (not hardcoded in seeder)
- HTML purification via `mews/purifier` for rich text content

### Frontend (Next.js 14)

- No secrets or API keys in client-side code
- Razorpay integration removed from frontend (backend models exist but keys not exposed)
- `next/image` used for all images (automatic optimization, no external image rendering risks)
- `robots.ts` auto-generated: blocks `/api/` and `/admin/` paths
- `sitemap.ts` with hreflang alternates for all 14 locales
- `metadataBase` set to `https://manikstu.com` for correct OG/Twitter URLs
- JSON-LD structured data (Organization, WebSite, Product, FAQPage) — no sensitive data exposed

### Infrastructure

- Hostinger shared hosting with PHP 8.5+
- MySQL database with separate credentials from application secrets
- `proc_open` disabled on Hostinger PHP (limits CLI-based attacks)
- Database credentials stored in `.env` (not in version control)
- Admin panel accessible only over HTTPS
- Storage symlink for public file access
- Git-based deployment with automatic builds

## Safe Harbor

We support safe security research. If you make a good faith effort to comply with this policy, we will not pursue legal action against you for accidental violations.

## Contact

| Channel | Address |
|---------|---------|
| Security reports | security@manikstu.com |
| General inquiries | info@manikstu.com |
| Repository | github.com/manikstu-tech/manikstu-tech |

---

*Manikstu Agro Private Limited*
*Founded 2015, Kalahandi, Odisha, India*
