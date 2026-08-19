# 🐐 Manikstu Agro — Website Revamp

> 🚀 Revolutionizing Goat Farming Ecosystem Worldwide

## 📋 Overview

Complete redesign of [manikstu.com](https://manikstu.com) — a goat farming ecosystem website for Manikstu Agro Private Limited, founded 2015 in Kalahandi, Odisha, India.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| 🎨 Frontend | Next.js 14 (App Router) + Tailwind CSS |
| ⚙️ Backend | Laravel 11 REST API |
| 🗄️ Database | MySQL 8 |
| 🔐 Auth | Laravel Sanctum (Staff/Dealer/Farmer) |
| 💳 Payments | Razorpay |
| 🖥️ Admin | Custom Laravel Blade |
| 🌐 Hosting | Vercel (frontend) + VPS (backend) |

## 🚀 Getting Started

```bash
# Frontend
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site 🎉

## 📁 Project Structure

```
manikstu-tech/
├── 📚 docs/                           # Project documentation
│   ├── PRD.MD                      # Requirements, features, target users
│   ├── ARCHITECTURE.MD             # System design, API endpoints, DB schema
│   ├── RULES.MD                    # Laravel + Next.js conventions
│   ├── PHASES.MD                   # 6 development phases with tasks
│   ├── DESIGN.MD                   # Colors, typography, component specs
│   └── MEMORY.MD                   # Progress tracker, decisions log
├── 🎨 frontend/                       # Next.js 14 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   │   ├── page.tsx            # Homepage (hero, stats, services, projects, products, testimonials, CTA)
│   │   │   └── globals.css         # Tailwind + custom utilities
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx      # Responsive header with mobile nav
│   │   │   │   └── Footer.tsx      # 4-column footer
│   │   │   ├── home/               # Homepage-specific components (pending)
│   │   │   ├── patterns/           # SVG tribal art patterns (pending)
│   │   │   └── shared/             # Reusable UI components (pending)
│   │   └── lib/
│   │       └── utils.ts            # cn() utility, formatPrice()
│   ├── tailwind.config.ts          # Custom color palette, fonts
│   ├── next.config.mjs             # Image domains
│   └── package.json
├── ⚙️ backend/                        # Laravel 11 (pending Phase 1)
├── README.md
└── .gitignore
```

## 📊 Progress

### 🏗️ Phase 1: Foundation
| Task | Status |
|------|--------|
| ✅ Next.js 14 project init | Done |
| ✅ Tailwind CSS + custom palette | Done |
| ✅ Path aliases (`@/`) | Done |
| ✅ Root layout + fonts (Playfair Display, Inter) | Done |
| ✅ `cn()` utility (clsx + tailwind-merge) | Done |
| ✅ Header component (responsive, mobile nav) | Done |
| ✅ Footer component | Done |
| ✅ Homepage (all 7 sections) | Done |
| ⏳ SVG pattern library | Pending |
| ⏳ API client | Pending |
| ⏳ TypeScript interfaces | Pending |
| ⏳ `.env.local` | Pending |
| ⏳ Laravel backend setup | Pending |
| ⏳ Database migrations | Pending |
| ⏳ Admin panel | Pending |

### 🗺️ Phase 2-6
See [PHASES.MD](./docs/PHASES.MD) for full roadmap.

## 🏠 Homepage Sections

1. 🎯 **Hero** — Full-width with gradient overlay, headline, dual CTAs
2. 📈 **Stats** — 4 impact counters (farmers, goats, states, years)
3. 🛠️ **Services** — 4 cards (Goat Care, Farm ERP, Farming Solutions, Insurance)
4. 🤝 **Projects** — 4 project cards (Samarth, Sujalam Sufalam, Samriddhi, Dhanvantaram)
5. 🛍️ **Products** — 3 category cards (For Goats, Goats, From Goats)
6. 💬 **Testimonials** — 3 farmer quotes
7. 📣 **CTA** — Call to action with training + contact links

## 🎭 Cultural Design

The website integrates Odisha and Chhattisgarh tribal art:
- 🎨 **Saura paintings** — section borders, dividers, hero illustrations
- 〰️ **Godna patterns** — background textures, card patterns
- 🐘 **Dhokra art** — icon set, decorative accents
- 🧵 **Ikat patterns** — section backgrounds, card borders
- 🥁 **Ghumura elements** — loading animations, circular motifs

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| 💚 Manikstu Green | `#4A8C3F` | Primary buttons, links |
| ❤️ Manikstu Red | `#D4342C` | CTA buttons, urgency |
| 🌿 Leaf Dark | `#3A7030` | Header, footer, dark backgrounds |
| 🧈 Cream Silk | `#FDF6EC` | Warm section backgrounds |
| ✨ Bamboo Gold | `#C4952A` | Accents, highlights |
| 🔥 Saura Red | `#9F5233` | Tribal art accents |

## 📖 Documentation

| Document | Description |
|----------|-------------|
| 📄 [PRD.MD](./docs/PRD.MD) | What to build, target users, features |
| 📐 [ARCHITECTURE.MD](./docs/ARCHITECTURE.MD) | System design, folders, API endpoints, DB schema |
| 📏 [RULES.MD](./docs/RULES.MD) | Laravel + Next.js rules, anti-patterns |
| 📅 [PHASES.MD](./docs/PHASES.MD) | 6 development phases with tasks |
| 🎨 [DESIGN.MD](./docs/DESIGN.MD) | Colors, typography, admin panel design |
| 🧠 [MEMORY.MD](./docs/MEMORY.MD) | Progress tracker, agent team, decisions |

## 📜 License

🔒 Private — Manikstu Agro Private Limited
