<div align="center">

# Manikstu Agro Private Limited

**The website for Manikstu: goat-farming enterprises, animal care and fair markets for rural India.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](#deploying-to-vercel)

[manikstu.com](https://manikstu.com)

</div>

---

## What this is

A full redesign of [manikstu.com](https://manikstu.com): a responsive marketing and storefront site for Manikstu Agro
Private Limited. It tells the company's story, presents its five solutions and three flagship projects, brings in partners
and investors through one shared enquiry flow, and sells products through a cart with online payment.

**Highlights**

- **Project AJAH**: an infographic-style page for the flagship programme in Raipur, with an interactive vector map of
  Raipur District's eight tehsils and the four project blocks highlighted.
- **Partners and Investors**: letterpress logo plates, a directory of partner types, and one `/join` page that
  pre-selects who is joining (`/join?as=partner`, `/join?as=investor`).
- **Market outlook**: an interactive India map backed by a validated goat-market dataset built from public sources.
- **Storefront**: product pages, buyer reviews, a cart and Razorpay checkout.
- **Forms that work**: contact, careers, investor and partnership forms with live field checks and email delivery
  through Resend.
- **Responsive and accessible**: designed from 320px phones to wide desktops, with reduced-motion support and keyboard
  paths for interactive elements.

---

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Home: hero, about, solutions, impact, market outlook, stories, call to action |
| `/solutions/[slug]` | The five solutions: Build a Better Farm, Care for Your Goats, Protect Your Animals, Sell at a Fair Price, Village-Level Entrepreneurs |
| `/projects/ajah` | Project AJAH: model, income journey, rollout map, films |
| `/projects/aangan-lakshmi`, `/projects/sujalam-suphalam` | The other flagship projects |
| `/partners`, `/investors` | Who works with Manikstu, with real logos |
| `/fpo` | FPO Connect: free vaccination camps, partnership models, support, FAQ and an enquiry form |
| `/franchise` | Franchise & Business Partnerships: the model, investment, projections, FAQ and an interest form |
| `/join` | Shared enquiry form for investors and partners |
| `/products`, `/products/[slug]`, `/cart` | Catalogue, product detail with reviews, checkout |
| `/our-network`, `/teams` | Network and people |
| `/resources`, `/blogs`, `/blogs/[slug]` | Press, photos, videos and articles |
| `/contact`, `/careers` | Contact form and offices map; job applications |
| `/admin` | Staff-only content editor for text, pictures and videos (see [Content admin](#content-admin)) |

**API routes** (`src/app/api`): `contact`, `careers`, `enquiry`, `orders`, `orders/verify`, `reviews`, `franchise`, `fpo`.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 through `@tailwindcss/postcss`, plus one global stylesheet with brand tokens |
| Email | [Resend](https://resend.com) |
| Payments | [Razorpay](https://razorpay.com) |
| Formatting | oxfmt |
| Runtime | Node.js 22 |

---

## Getting started

**Requirements:** Node.js 22 and pnpm 10 (both pinned in `.mise.toml`; `mise install` sets them up). npm also works.

```bash
git clone https://github.com/bhabani-rath/Redesign-Manikstu-Agri-Website.git
cd Redesign-Manikstu-Agri-Website

# images are stored with Git LFS
git lfs install
git lfs pull

pnpm install
cp .env.example .env.local   # then fill in the values below
pnpm dev                     # http://localhost:3000
```

The dev server allows phones on your network and ngrok tunnels (see `next.config.ts`), so you can test on a real
device without extra setup.

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm format` | Format `src` with oxfmt |
| `pnpm data:goat` | Rebuild and validate the goat-market dataset (see [Data](#data)) |

### Environment variables

Copy `.env.example` to `.env.local`. Without `RESEND_API_KEY`, the forms report that email is not set up instead of
failing silently.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Email delivery for all forms |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, for example `Manikstu website <hello@manikstu.com>` |
| `CONTACT_TO_EMAIL` | Contact form recipient (default `contact@manikstu.com`) |
| `CAREERS_TO_EMAIL` | Job applications (default `hr@manikstu.com`) |
| `INVESTOR_TO_EMAIL`, `PARTNERSHIP_TO_EMAIL` | Join Us messages; both fall back to `CONTACT_TO_EMAIL` |
| `FPO_TO_EMAIL` | FPO Connect enquiries; falls back to `PARTNERSHIP_TO_EMAIL`, then `CONTACT_TO_EMAIL` |
| `FRANCHISE_TO_EMAIL` | Franchise interest form; falls back to `PARTNERSHIP_TO_EMAIL`, then `CONTACT_TO_EMAIL` |
| `BACKEND_URL`, `BACKEND_API_KEY` | Where the orders, payments and reviews backend runs, and its shared secret (see "Orders, payments and reviews backend"). The Razorpay keys now belong to the backend |
| `ADMIN_PASSWORD`, `ADMIN_SECRET` | Content admin sign-in. `ADMIN_SECRET` is optional and signs the login cookie |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Where admin edits and uploads are stored. The service-role key is secret |

---

## Project structure

```text
src/
├── app/                 Routes (App Router), API routes, global CSS, sitemap and robots
├── components/
│   ├── layout/          Header, mega menu, footer
│   ├── sections/        Page sections, grouped by page (home, partners, projects, ...)
│   └── ui/              Small shared pieces: icons, maps, buttons, cart stepper
├── constants/           Page content and site settings (site.ts, partners.ts, solutions/, raipurMap.ts, ...)
├── lib/                 Validation, email, cart, order and review logic
├── hooks/               Shared React hooks
└── types/               Shared types
data/                    Datasets and review storage
scripts/                 One-off data scripts (goat market, product scraper)
public/                  Images, logos and videos (tracked with Git LFS)
```

Content lives in `src/constants`, so most copy, links and figures can be changed without touching components.

---

## Design system

Brand rules are strict: colours and fonts come from tokens in `src/app/globals.css`, never hard-coded.

| Token | Hex | Used for |
| --- | --- | --- |
| `--forest` | `#174B32` | Headings, bands, key data, primary buttons |
| `--ivory` | `#F8F6EE` | Page and light backgrounds |
| `--gold` | `#DCA72B` | Small accents, section numbers, key statistics |
| `--leaf` | `#78A65A` | Agricultural line art and supporting charts |
| `--charcoal` | `#26352E` | Body text |
| `--sage` | `#EAF0E6` | Cards, alternate table rows, subtle panels |

**Type:** headings use **Montserrat** (Bold or SemiBold only); body, tables and captions use **Aptos**, falling back to
Segoe UI or system-ui. Sizes use fluid `clamp()` values.

**Tables:** bold header row with a forest rule above and below, alternate rows in `--sage`, body text in `--charcoal`.

**Responsive by default:** every change has to work from about 320px up to large desktops.

---

## Data

- **Goat-market dataset** (`data/goat-market`): built from public sources (PIB annexure) and checked against the India
  map's own state list, so the map and the data cannot disagree. Rebuild with `pnpm data:goat`.
- **Product details** (`scripts/products/scrape.mjs`): reads product pages from manikstu.com into
  `src/data/productDetails.json`.
- **Raipur map** (`src/constants/raipurMap.ts`): the eight tehsils, traced from a published district map and simplified.
  Outlines are indicative, not survey-accurate. OpenStreetMap has no boundaries for the 2020 tehsils, so replace the
  file if the district office supplies an official shapefile.

---

## Content admin

Staff can change the site's words, pictures, videos and look at `/admin`, with no code. Pick a page on the left and the real page
appears in the editor (Desktop or Phone view). **Every word and picture on every page can be edited.**

- **Click on page** (default): click any words or picture. Small text is fine, the click only has to be close. The panel on the right shows
  its words (or double-click words to type straight into the page), a **Replace image** button, and for any element: text colour, size,
  weight, alignment, background colour, a background picture, and **Hide this on the live page**. **Select the box around it** reaches
  sections and their backgrounds.
- **Everything on the page**: a searchable list of every piece of text and every picture on the page. Click a row to select it and jump
  to it, then use **Previous** and **Next** to step through. This is the easy way to reach text that is small, covered, or in a slider.
- **Show everything I can edit** outlines every editable piece on the page.
- **Form**: the page's data as labelled fields, for text the page cannot show a click target for.

**Whole site:** "Menu" and "Footer" appear under *Whole site* in the page list. Edit them once and every page changes.

**The page list** (left): search it, or press `/` to jump to the search box. Groups fold, and only the group you are in starts open. A gold
dot on the current page means unsaved changes, and switching pages is blocked until you save or discard. **Pages** in the top bar hides the
list to give the page more room. On a tablet or phone the list is a drawer that closes when you pick a page or press Escape.

Colours: pick a brand colour (forest, ivory, gold, leaf, charcoal, sage) or any custom colour. Brand colours are saved as the site's
colour tokens, so they follow the brand if a token ever changes. Press **Save changes** and the live page updates. A changed field shows
a dot, and **Reset to original** or **Reset everything on this element** undoes it.

**One-time setup (production)**

1. Create a free [Supabase](https://supabase.com) project and run [`docs/cms-supabase.sql`](docs/cms-supabase.sql) in its SQL editor.
   It makes the `cms_content` table and the public `cms-media` storage bucket.
2. In Vercel, add `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`, then redeploy.
3. Open `/admin` and sign in with the password.

**While developing** nothing needs setting up: sign in with the password `admin`. Edits are saved in `.data/cms.json` and uploads in
`public/uploads` (both git-ignored). Set the Supabase keys in `.env.local` to try the real thing locally.

**How it works.** Two kinds of edit, both stored in Supabase:

1. *Page data* (home, solutions, teams, investors, partners, careers, legal pages, menu, footer): the text stays in the code as the default, and
   edits are laid over it when the page renders (`getContent` in `src/lib/cms.ts`). They are in the page's HTML from the start, so search engines
   see them. The list is `src/constants/cms.ts`. To add a page, add it there and read its content with `getContent(key, defaults)`.
2. *Everything else* (the words, pictures and look of any other page): saved against the element's position on the page and applied in the
   browser right after the page loads (`FreeEdits`). The original is hidden until the edit is in, so visitors never see it flash by.

**Good to know**
- Words and pictures on pages without page data (Project AJAH, Aangan Lakshmi, Sujalam Suphalam, Franchise, FPO Connect, products, contact,
  resources, blogs and others) are edited the second way. Search engines that do not run scripts still see the original words there.
- Edits are saved against an element's position (for example `#main > section.fpoHero > div > h1`). If a developer later restructures a page,
  an old edit could land on a different element. Open the page in the admin and use **Reset everything on this element** to clear it.
- A heading made of several pieces (plain words beside a coloured word) has one entry per piece in the list, so a piece can be changed alone.
- Colours outside the brand palette are allowed on purpose, so anyone with the password can take a page off-brand.
- Product prices and details cannot be edited, because checkout reads them on the server. Ids, slugs and icon names are never shown.
- Text in a data list can be changed, but items cannot be added or removed.

---

## Orders, payments and reviews backend

Orders, Razorpay payments and product reviews are handled by a separate service, `manikstu-backend` (Node.js, NestJS,
PostgreSQL), kept in its own folder and repository. This site only forwards to it: the routes in `src/app/api/orders`
and `src/app/api/reviews` pass requests on through `src/lib/backend.ts`, which adds the secret `BACKEND_API_KEY` on the
server so it never reaches a browser. Prices, stock, payment checks and duplicate protection all live in the backend.

**Offline orders.** If the connection is down when a shopper presses pay (or drops while the order is being sent), the
order is saved in the browser (IndexedDB, `src/lib/orderQueue.ts`) and the cart page lists it under "Saved orders". When the
connection returns it is sent to the backend, which checks the current prices and stock. The shopper then pays. A saved
order is never treated as confirmed: it is confirmed only once it is paid. If a price changed or an item sold out, the order
waits for the shopper's decision instead of being placed.

**Rate limits and the visitor's address.** The backend limits by visitor address. This site forwards the *last* entry of `X-Forwarded-For` (the one a proxy adds from the real connection), because earlier entries are written by the visitor. That is correct on Vercel and behind nginx or a load balancer. Do not serve this site directly to the internet without such a proxy, or the limits can be dodged by inventing addresses. Request bodies over 100 KB are refused by these routes themselves.

**Running it locally.** Start the backend (see its README), set `BACKEND_URL` and `BACKEND_API_KEY` in `.env`, then `npm run dev`.

---

## Deploying to Vercel

1. **Enable Git LFS** in the Vercel project (Project Settings > Git > Git Large File Storage). Without it, images
   deploy as small pointer files and appear broken.
2. **Add the environment variables** from the table above (Project Settings > Environment Variables).
3. **Keep one lockfile.** The repo has both `package-lock.json` and `pnpm-lock.yaml`. Delete the one you do not use so
   Vercel picks the right package manager.
4. **Set Node.js to 22.x** (already declared in `package.json`).

> **Orders and reviews live in the separate backend** (PostgreSQL), so they persist on Vercel. Set `BACKEND_URL` and
> `BACKEND_API_KEY` there, and deploy the backend first. Without them the cart and the reviews report that they are not set up.

---

## Working in this codebase

- This is a recent Next.js with breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before
  writing code against an API you remember from older versions.
- Put global element styles inside `@layer base` in `globals.css` so Tailwind utilities still override them.
- Prefer the smallest change that fully solves a task, and re-check at phone, tablet and desktop widths.
- Run `pnpm format` before committing.

---

## Known gaps

- Orders and reviews need a real database for production (see above).
- Project AJAH rollout figures are placeholders pending confirmed numbers; its map outlines are approximate.
- Two lockfiles are present; keep one.

---

<div align="center">

Built for Manikstu Agro Private Limited.

</div>
