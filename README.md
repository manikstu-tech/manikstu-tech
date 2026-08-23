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
│   │   │   ├── layout.tsx          # Root layout (fonts, metadata, ThemeProvider)
│   │   │   ├── page.tsx            # Homepage (10 sections)
│   │   │   └── globals.css         # Tailwind + dark mode overrides
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx      # Responsive header with dark mode toggle
│   │   │   │   ├── Footer.tsx      # 4-column footer with social icons
│   │   │   │   └── ThemeProvider.tsx # Dark mode context + localStorage
│   │   │   └── patterns/
│   │   │       ├── SauraBorder.tsx      # Inline SVG tribal border (top)
│   │   │       ├── GodnaBorder.tsx      # Inline SVG tattoo border (bottom)
│   │   │       ├── CulturalDivider.tsx  # Inline SVG gold diamond divider
│   │   │       ├── DiamondAccent.tsx    # Inline SVG gold diamond for pill labels
│   │   │       ├── PaperTexture.tsx     # Inline SVG tileable paper grain
│   │   │       └── CornerOrnament.tsx   # Inline SVG Saura corner decoration
│   │   └── lib/
│   │       └── utils.ts            # cn() utility, formatPrice()
│   ├── tailwind.config.ts          # Custom color palette, dark mode, fonts
│   ├── next.config.mjs             # Image domains
│   └── package.json
├── ⚙️ backend/                        # Laravel 11 (pending Phase 1)
├── README.md
└── .gitignore
```

## 📊 Progress

### ✅ Phase 1: Foundation — Complete
| Task | Status |
|------|--------|
| ✅ Next.js 14 project init | Done |
| ✅ Tailwind CSS + custom palette | Done |
| ✅ Path aliases (`@/`) | Done |
| ✅ Root layout + fonts (Playfair Display, Inter) | Done |
| ✅ `cn()` utility (clsx + tailwind-merge) | Done |
| ✅ Header component (responsive, mobile nav) | Done |
| ✅ Footer component (white bg, 4-column, social icons) | Done |
| ✅ Homepage (all 10 sections) | Done |
| ✅ Dark mode toggle (localStorage persistence) | Done |
| ✅ Homepage redesign (reference layout match) | Done |
| ✅ SVG pattern library (6 inline React components) | Done |
| ⏳ API client | Pending |
| ⏳ TypeScript interfaces | Pending |
| ⏳ `.env.local` | Pending |
| ⏳ Laravel backend setup | Pending |
| ⏳ Database migrations | Pending |
| ⏳ Admin panel | Pending |

### 🗺️ Phase 2-6
See [PHASES.MD](./docs/PHASES.MD) for full roadmap.

## 🏠 Homepage Sections

1. 🎯 **Hero** — White bg, headline with green accent, dual CTAs, photo area, floating cards (Mann Ki Baat + Product), trust badges
2. 🌍 **Mission** — "Our Mission" label, 4 feature cards (Technology, Collaborations, Livelihoods, Innovation)
3. 📈 **Stats** — "Impacting Lives" with 4 metrics (70K farmers, 10K villages, 7L goats, 10 states)
4. 🏆 **Flagship** — Project Samarth spotlight with CTA and photo area
5. 🤝 **Associations** — Two-lane marquee with tribal art decorations (Saura border, Godna border, corner ornaments, paper texture, gold diamond dividers). Pill-style category labels with gold diamond accents. Museum-style cards with hover effects. Lane 1 → (Operational, Incubation, Supporting), Lane 2 ← (CSR, Investing, Banking). Pauses on hover.
6. 📱 **Mobile App** — Phone mockup, feature checklist, QR code, app store badges
7. 📰 **News** — 4 cards with images, dates, category badges (Featured, Event, Press, Media)
8. 💬 **Testimonials** — 2 cards with star ratings, quotes, farmer names
9. 📣 **Newsletter** — Green bg, email input + Subscribe button
10. 🔗 **Footer** — White bg, logo, social icons, Quick Links, Support, Contact Us

## 🌙 Dark Mode

- Toggle via Moon/Sun icon in header
- Persists to localStorage
- System preference detection on first visit
- CSS overrides for backgrounds, text, borders, inputs

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
