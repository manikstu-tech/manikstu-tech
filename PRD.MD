# PRD — Manikstu Agro Website Revamp

## What to Build

A complete redesign of **manikstu.com** — a goat farming ecosystem website for Manikstu Agro Private Limited, founded 2015 in Kalahandi, Odisha, India.

### Core Deliverables
1. **Public Website** — Next.js 14 (App Router) + Tailwind CSS
2. **Backend API** — Laravel 11 REST API + MySQL
3. **E-commerce** — Razorpay-powered product shop
4. **Admin Panel** — Custom Laravel Blade admin (Staff, Dealers, Farmers)
5. **Cultural Design System** — Odisha & Chhattisgarh tribal art integration

### What Changes from Current Site
| Current | New |
|---------|-----|
| Static HTML/CSS/JS | Next.js 14 + Laravel 11 |
| No backend | Laravel REST API + MySQL |
| No CMS — 4 empty pages | Laravel admin panel manages all content |
| No working e-commerce | Razorpay checkout, cart, order management |
| No auth system | Multi-role auth (Staff, Dealer, Farmer) |
| 4 global modals on every page | Single on-demand enquiry modal |
| Gmail contact emails | Unified @manikstu.com domain |
| Typos everywhere (Manikastu, carrers) | All fixed |
| Placeholder lorem ipsum | All content rewritten |
| No SEO (no meta, no sitemap) | Full SEO (meta, OG, JSON-LD, sitemap) |
| No accessibility | WCAG 2.1 AA compliant |
| Bloaty footer with popups | Clean, minimal footer |

---

## Target Users

### Primary Users

**1. Goat Farmers**
- Location: Odisha, Chhattisgarh, neighboring states
- Need: Veterinary services, goat bank enrollment, training, products
- Device: 70%+ mobile, low bandwidth
- Behavior: WhatsApp-first, phone calls for enquiries, trust-based decisions

**2. Livestock Entrepreneurs**
- Need: Project details, loan guidance, procurement support, franchise info
- Device: Mobile + desktop
- Behavior: Research-oriented, compare options, ROI-focused

**3. Rural Women / SHG Members**
- Need: Training programs, micro-entrepreneurship (Sujalam Sufalam project)
- Device: Mobile-first
- Behavior: Community-trusting, need simple navigation, regional language comfort

### Secondary Users

**4. CSR Partners / Government Agencies**
- Need: Impact data, project details, collaboration forms
- Device: Desktop
- Behavior: Professional, data-driven, compliance-focused

**5. Dealership Partners**
- Need: Product catalog, dealership info, enquiry form, dealer login portal
- Device: Mobile + desktop

**6. Investors / Incubation Partners**
- Need: Company profile, team, awards, impact metrics
- Device: Desktop

**7. Job Seekers**
- Need: Company culture, open positions, application form
- Device: Mobile + desktop

---

## Features

### Website Features

#### Pages (20 total)
| Page | Route | Dynamic | Description |
|------|-------|---------|-------------|
| Home | `/` | API | Hero, projects, products, stats, testimonials |
| About | `/about` | No | Company story, vision/mission, timeline |
| Team | `/team` | API | Org chart, bios, departments |
| Services Overview | `/services` | No | 4 service category cards |
| Goat Care | `/services/goat-care` | No | Vaccination, treatment, AI, breeding |
| Farm ERP | `/services/erp` | No | 4 ERP applications |
| Farming Solution | `/services/farming-solution` | No | Shed construction, feed, procurement |
| Insurance | `/services/insurance` | No | Livestock insurance details |
| Products | `/products` | API | 3 categories: For Goats, Goats, From Goats |
| Shop | `/shop` | API | Product grid, cart, checkout |
| Collaborate | `/collaborate` | API | 4 project overview cards |
| Project Detail | `/collaborate/[slug]` | API | Samarth, Sujalam, Samriddhi, Dhanvantaram |
| Training | `/training` | No | 5 training tiers with enrollment |
| Impact | `/impact` | API | SDGs, metrics, social/economic/industry |
| Blog | `/blog` | API | Articles, news, updates |
| Press | `/press` | API | Press releases, media coverage |
| Gallery | `/gallery` | API | Image gallery with albums |
| Video Gallery | `/gallery/video` | API | Video thumbnails + embeds |
| Contact | `/contact` | No | Unified contact form |
| Careers | `/careers` | No | Jobs, culture, application |
| Privacy | `/privacy` | No | Privacy policy |
| Terms | `/terms` | No | Terms & conditions |
| Shipping | `/shipping` | No | Shipping & delivery terms |
| Refund | `/cancellation-refund` | No | Cancellation & refund policy |

#### E-commerce
- Product catalog with categories (Laravel API)
- Product detail pages (fetched from Laravel)
- Shopping cart (client-side + Laravel checkout)
- Checkout with Razorpay (UPI, cards, netbanking, wallets)
- Order confirmation + email notification
- Admin order management (Blade panel)

#### Forms & Enquiries
- **Contact Form**: Name*, Phone*, Email, City*, State* (dropdown), Enquiry Type* (dropdown), Message*, Submit
- **Join Hands Form** (per project): Mobile*, Project* (pre-selected), State*, Submit
- **Training Form**: Mobile*, Training Type* (dropdown), State*, Submit
- **Newsletter**: Name, Email, Subscribe (footer only)
- **Careers Application**: Name, Email, Phone, Resume upload, Message

#### Authentication
- **Staff Login**: Email + password, full admin access
- **Dealer Login**: Phone + OTP or email/password, limited portal
- **Farmer Login**: Phone + OTP, view enrollments and orders

#### SEO & Performance
- Dynamic meta tags per page (Metadata API)
- Open Graph images per page
- JSON-LD structured data (Organization, Products, Articles, FAQs)
- Auto-generated sitemap.xml
- robots.txt
- Image optimization (next/image, WebP/AVIF)
- Lighthouse score target: 90+ across all categories

#### Accessibility (WCAG 2.1 AA)
- Keyboard navigation for all interactive elements
- Screen reader support (semantic HTML, ARIA labels)
- Alt text for all images
- Focus visible states
- Color contrast ratio: 4.5:1 minimum for text
- Skip navigation link

### Admin Panel Features (Laravel Blade)

#### Auth & Roles
| Role | Access |
|------|--------|
| Staff | Full admin — all CRUD, settings, reports |
| Dealer | Product catalog, order placement, order history |
| Farmer | Profile, enrollments, order history |

#### Staff Dashboard
- Revenue summary (today, week, month, year)
- Order count and status breakdown
- Recent enquiries list
- Quick actions (Add Product, Create Post)

#### Product Management
- CRUD for products
- Image upload (multiple, reorder, alt text)
- Category management
- Inventory tracking (stock quantity, SKU)
- Bulk actions (delete, change status, export CSV)

#### Order Management
- Order list with filters (status, date, payment)
- Order detail view (customer, items, shipping, payment)
- Status workflow: Pending → Confirmed → Processing → Shipped → Delivered
- Payment status tracking
- Export (CSV, PDF)

#### Customer Management
- Customer list with search
- Customer detail with order history
- Export

#### Project Management
- Project list with stats
- Enrollment list per project (mobile, state, status)
- Approve/reject enrollments
- Project content editing

#### Content Management
- Blog post editor (rich text with images)
- Press release editor
- Media library (image upload, organize, search)
- Draft/publish workflow

#### Gallery Management
- Image upload (drag-and-drop, bulk)
- Album organization
- Video link management

#### Team Management
- Member CRUD (name, role, department, bio, photo)
- Department organization (Leadership, Management, Field Staff, Advisors)
- Display order management

#### Enquiry Management
- Enquiry list with filters (type, status, date)
- Enquiry detail with follow-up notes
- Status workflow: New → Contacted → Converted → Closed
- Export

#### Dealer Portal
- Product catalog view
- Place orders
- Order history
- Profile management

#### Farmer Portal
- View enrollments (project status)
- Order history
- Profile management

#### Settings
- Company info (name, logo, addresses, contacts)
- Email notification templates
- SEO defaults (meta title, description)
- Admin user management (CRUD)
- Razorpay API key configuration

---

## Business Requirements

### Revenue Streams (reflected in features)
1. **Product Sales** — E-commerce for supplements, feed, manure
2. **Goat Sales** — Enquiry-based for livestock
3. **Services** — Veterinary care, AI, training
4. **Dealerships** — Partnership enquiries
5. **Franchise** — Goat farm franchise model

### Geographic Focus
- **Primary**: Odisha (Kalahandi, Koraput, Ganjam, Rayagada, Gajapati)
- **Secondary**: Chhattisgarh (Bastar, Kondagaon)
- **Expansion**: Andhra Pradesh, Jharkhand, West Bengal

### Compliance
- Digital Personal Data Protection Act, 2023 (DPDP)
- Privacy policy with DPO contact
- GSTIN: 21AAJCM6881B1ZM
- CIN: U74900PN2015PTC154344
