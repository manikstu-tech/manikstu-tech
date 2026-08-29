# Manikstu Agro — Deployment Guide

## Architecture

```
manikstu.com (GoDaddy DNS)
    ├── www.manikstu.com → Vercel (Next.js frontend)
    ├── manikstu.com → Vercel (Next.js frontend)
    └── api.manikstu.com → Hostinger Shared Hosting (Laravel API)
```

## Hosting Breakdown

| Component | Host | Why |
|-----------|------|-----|
| Next.js Frontend | **Vercel** (free tier) | Zero-config Next.js hosting, global CDN, automatic deploys |
| Laravel Backend | **Hostinger Shared Hosting** | PHP/MySQL support, already have hosting plan |
| Domain DNS | **GoDaddy** | Domain registrar, manages DNS records |
| Database | **Hostinger MySQL** | Included with hosting plan |

## Deployment Steps (in order)

### Step 1: Deploy Backend to Hostinger
Follow `02-HOSTINGER-BACKEND.md`

### Step 2: Deploy Frontend to Vercel
Follow `03-VERCEL-FRONTEND.md`

### Step 3: Configure GoDaddy DNS
Follow `04-GODADDY-DNS.md`

### Step 4: Final Checks
Follow `05-FINAL-CHECKS.md`

## Prerequisites

- [ ] Hostinger account with hosting plan
- [ ] Vercel account (free, sign up with GitHub)
- [ ] GoDaddy account with manikstu.com domain
- [ ] GitHub repository accessible
- [ ] MySQL database created on Hostinger
