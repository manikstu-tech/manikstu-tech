# Manikstu Agro — Website Revamp

> Revolutionizing Goat Farming Ecosystem Worldwide

## Overview

Complete redesign of [manikstu.com](https://manikstu.com) — a goat farming ecosystem website for Manikstu Agro Private Limited, founded 2015 in Kalahandi, Odisha, India.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Laravel 11 REST API |
| Database | MySQL 8 |
| Auth | Laravel Sanctum (Staff/Dealer/Farmer) |
| Payments | Razorpay |
| Admin | Custom Laravel Blade |
| Hosting | Vercel (frontend) + VPS (backend) |

## Documentation

All project documentation is in the [`docs/`](./docs/) folder:

| Document | Description |
|----------|-------------|
| [PRD.MD](./docs/PRD.MD) | What to build, target users, features |
| [ARCHITECTURE.MD](./docs/ARCHITECTURE.MD) | System design, folders, API endpoints, DB schema |
| [RULES.MD](./docs/RULES.MD) | Laravel + Next.js rules, anti-patterns |
| [PHASES.MD](./docs/PHASES.MD) | 6 development phases with tasks |
| [DESIGN.MD](./docs/DESIGN.MD) | Colors, typography, admin panel design |
| [MEMORY.MD](./docs/MEMORY.MD) | Progress tracker, agent team, decisions |

## Project Structure

```
manikstu-tech/
├── docs/                   # Project documentation
│   ├── PRD.MD
│   ├── ARCHITECTURE.MD
│   ├── RULES.MD
│   ├── PHASES.MD
│   ├── DESIGN.MD
│   └── MEMORY.MD
├── frontend/               # Next.js 14 (coming soon)
├── backend/                # Laravel 11 (coming soon)
├── README.md
└── .gitignore
```

## Cultural Design

The website integrates Odisha and Chhattisgarh tribal art:
- **Saura paintings** — section borders, dividers, hero illustrations
- **Godna patterns** — background textures, card patterns
- **Dhokra art** — icon set, decorative accents
- **Ikat patterns** — section backgrounds, card borders
- **Ghumura elements** — loading animations, circular motifs

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Manikstu Green | `#4A8C3F` | Primary |
| Manikstu Red | `#D4342C` | CTA |
| Leaf Dark | `#3A7030` | Header/Footer |
| Cream Silk | `#FDF6EC` | Backgrounds |

## License

Private — Manikstu Agro Private Limited
