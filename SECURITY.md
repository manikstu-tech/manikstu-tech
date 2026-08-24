# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest main branch | :white_check_mark: |
| Previous releases | :x: |

This is a private repository. Only the latest deployment on `main` receives security updates. older versions are not maintained.

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
- **Admin panel** (Laravel Blade backend)
- **REST API** (Laravel + Sanctum)
- **Payment integration** (Razorpay)
- **Authentication and session management**
- **Data handling and storage**

### Out of Scope

- Social engineering attacks
- Physical attacks on Manikstu Agro facilities
- Issues in third-party services not under our control

## Security Measures

### Backend (Laravel)

- CSRF protection enabled on all routes
- Login brute-force throttling (5 attempts/minute)
- bcrypt password hashing
- Session cookies: `httpOnly`, `same_site=lax`
- HTTPS enforced in production
- `APP_DEBUG=false` in production
- Environment variables stored outside version control

### Frontend (Next.js)

- No secrets or API keys in client-side code
- Razorpay key IDs are public; key secrets stay server-side
- CORS configured for allowed origins only

### Infrastructure

- Database credentials rotated regularly
- Admin panel accessible only over HTTPS
- Regular dependency updates

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
