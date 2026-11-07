# Deploying manikstu.com

How the live site is built, configured, checked and rolled back. Written after the first deploy of this codebase on
7 Nov 2026; the section "Hostinger: what it does differently" lists everything that broke then, and why.

## Architecture

```
GitHub manikstu-tech/manikstu-tech (main)
        │ push
        ▼
Hostinger shared hosting (u304297356, server in-mum-web1339)
  manikstu.com, www.manikstu.com   Next.js 16 app, built and run by Hostinger's managed Node.js (Passenger, Node 22)
  api.manikstu.com                 Laravel 13 API + MySQL u304297356_manikstu   (separate repo: manikstu-tech/manikstu-backend)
  samarth.manikstu.com, samarth-api.manikstu.com, goatagrifpc.com   other apps on the same account: do not touch

Outside services: Resend (form emails), Supabase (content edited in /admin). Both optional; see the env table.
```

The site does not use the Laravel API or its database. Shop orders need a separate backend service (`BACKEND_URL`) that does
not exist yet, so the cart tells visitors to contact the company.

## Deploying

Hostinger deploys `main` by itself on every push: it clones the repository, runs `npm install` and `npm run build`, and
switches the site to the new build only if the build succeeds. A failed build leaves the previous version live.

1. Change the code and run `npm test` and `npm run build` locally.
2. Push to `main` (or merge a pull request).
3. GitHub Actions runs the **CI** workflow on the same commit. A red run means what is going live has a problem: fix it or
   revert the commit.
4. hPanel → Websites → manikstu.com → **Deployments** shows the build log. Over SSH the logs are in
   `~/domains/manikstu.com/hbuilds/logs/<deployment>/`. A deploy takes about 1 to 2 minutes.

### Build settings (hPanel → manikstu.com → Deployments → Build configuration)

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Branch | `main` |
| Node version | 22.x |
| Root directory | `/` (the repository root) |
| Build command | default (`npm run build`) |

## Environment variables (hPanel → manikstu.com → Environment variables)

Changing a variable makes Hostinger rebuild the site. `NEXT_PUBLIC_` values are written into the pages at build time.

| Name | Needed | Purpose |
|---|---|---|
| `NODE_ENV` | set by Hostinger | `production` |
| `ADMIN_PASSWORD` | yes | Password for `/admin`. At least 12 characters, or the admin stays closed |
| `ADMIN_SECRET` | yes | Long random string that signs the admin login cookie |
| `RESEND_API_KEY` | for forms | Without it the contact, careers, FPO, franchise and join forms tell visitors to email instead |
| `CONTACT_FROM_EMAIL` | for forms | Sender on a domain verified in Resend, e.g. `Manikstu website <hello@manikstu.com>` |
| `CONTACT_TO_EMAIL` | optional | Where contact messages go (default `contact@manikstu.com`) |
| `CAREERS_TO_EMAIL` | optional | Where job applications go (default `hr@manikstu.com`) |
| `INVESTOR_TO_EMAIL`, `PARTNERSHIP_TO_EMAIL`, `FRANCHISE_TO_EMAIL`, `FPO_TO_EMAIL` | optional | Per-form inboxes; fall back to `CONTACT_TO_EMAIL` |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | for `/admin` edits | Without them the site shows its built-in content and `/admin` cannot save. Run `docs/cms-supabase.sql` in the Supabase project first |
| `BACKEND_URL`, `BACKEND_API_KEY` | not yet | The order and payment service; leave unset until it exists |

`.env.example` lists the same names. Real values live only in hPanel; never commit them.

## Hostinger: what it does differently

Each of these built fine on a laptop and failed only on Hostinger. `scripts/ci/hostinger-guards.sh` checks all five in CI.

| What Hostinger does | What broke | What the code does about it |
|---|---|---|
| Old glibc (2.28) on the server | Turbopack cannot load its native bindings | `npm run build` is `next build --webpack` |
| Reports 64 CPUs but caps processes and threads per account | Build died with `EAGAIN` | `next.config.mjs` sets `experimental.cpus: 2` and `RAYON_NUM_THREADS=2` |
| Wraps the config and imports it without a file extension | `ERR_MODULE_NOT_FOUND` for `next.config.ts` | The config is `next.config.mjs` |
| `npm install` runs with `NODE_ENV=production`, skipping devDependencies | `Module not found: @/...` (no TypeScript), no Tailwind | Build packages are in `dependencies` |
| The image optimizer cannot reach its own server behind Passenger | Every `/_next/image` returned 400 | `images.unoptimized: true` |
| Clones without Git LFS | Images arrived as 132-byte pointer files (CDN answered 422) | No LFS; images are plain git files |
| Each deploy clears `public_html` ("Syncing public_html") | Files placed there by hand disappear | Every asset ships in `public/` |

Also: the CDN in front of the site passes the visitor's own `x-forwarded-for`, so per-visitor rate limits can be dodged.
`src/lib/requestGuard.ts` adds a shared cap per route for that reason.

## Rollback

- **A bad commit:** `git revert <commit>` and push. Hostinger deploys the revert like any other commit.
- **Redeploy an older commit:** hPanel → Deployments → All deployments → pick a successful one → Redeploy.
- **Back to the previous (pre-November) site:** follow `ROLLBACK.md` in the backup folder of 7 Nov 2026
  (`~/backups/prod-hardening-20261107/` on the server, and a copy off the server). That build expects Node 20 and root
  directory `frontend`, so change both back in the build settings first.

## Backups and monitoring

- **Database:** `scripts/server/db-backup.sh`, installed as `~/bin/db-backup.sh`, dumps `u304297356_manikstu` daily into
  `~/backups/daily` and keeps 14 days. It runs from hPanel → Advanced → Cron Jobs: `/bin/bash /home/u304297356/bin/db-backup.sh`.
  These copies are on the same server: download one to another place now and then.
- **Uptime:** the **Uptime** workflow checks the site, a product image and the API every 30 minutes. GitHub emails a failed
  run to whoever last changed `.github/workflows/uptime.yml`. GitHub pauses it after 60 days without a push.
- **Logs:** hPanel → Runtime logs, or `~/domains/manikstu.com/hbuilds/current/nodejs/console.log` over SSH.

## Security checklist

- [ ] `ADMIN_PASSWORD` is 12+ characters and `ADMIN_SECRET` is set; neither is shared in chat or committed.
- [ ] No `.env` file is committed (`.gitignore` covers `.env*` except `.env.example`). CI scans the whole history with gitleaks.
- [ ] `npm audit` is clean (CI fails on high or critical).
- [ ] The repository is public: anything committed, even later deleted, stays readable. Rotate any secret that was ever committed.
- [ ] Laravel admin accounts on api.manikstu.com use strong, unique passwords.
- [ ] Security headers stay in `next.config.mjs`: HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, and no framing,
      caching or indexing of `/admin`.
