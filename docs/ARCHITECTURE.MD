# Architecture — Manikstu Website

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CDN / DNS                         │
│              (Vercel Edge Network)                   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                 FRONTEND (Vercel)                    │
│        Next.js 14 + Tailwind CSS + TypeScript        │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │  Public   │ │  Shop    │ │  Auth    │             │
│  │  Pages    │ │  + Cart  │ │  Pages   │             │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────┬──────────────────────────────┘
                       │ REST API (JSON)
                       │ Authorization: Bearer token
                       ▼
┌─────────────────────────────────────────────────────┐
│               BACKEND (VPS / Hosting)                │
│           Laravel 11 + Custom Blade Admin             │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │  REST    │ │  Admin   │ │  Auth    │             │
│  │  API     │ │  Blade   │ │  System  │             │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                   MySQL 8                            │
│            (Products, Orders, Users,                 │
│             Projects, Enquiries, etc.)               │
└─────────────────────────────────────────────────────┘
```

## Website Flow

```
USER ENTRY (Google, Social, Direct, WhatsApp)
            │
            ▼
┌─────────────────────────────────────────────┐
│              HOME PAGE                       │
│  Hero → Projects → Products → Impact → CTA  │
└───┬───────┬───────┬───────┬───────┬─────────┘
    │       │       │       │       │
    ▼       ▼       ▼       ▼       ▼
┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
│ABOUT ││SVC   ││PROD  ││COLLAB││TRAIN │
│Team  ││4 pg  ││Shop  ││4 proj││5 tier│
│Award ││      ││      ││      ││      │
└──┬───┘└──┬───┘└──┬───┘└──┬───┘└──┬───┘
   │       │       │       │       │
   ▼       ▼       ▼       ▼       ▼
┌─────────────────────────────────────────────┐
│           CONVERSION PAGES                   │
│  Contact | Checkout | Enquiry | Enrollment   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           CONTENT PAGES (Laravel API)        │
│  Blog | Press | Gallery | Video | Careers    │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           LEGAL PAGES                        │
│  Privacy | Terms | Shipping | Refund         │
└─────────────────────────────────────────────┘
```

## User Journeys

### Farmer → Enquiry
```
Home → Services → Goat Care → "Avail Service" → Contact Form → POST /api/contact → Confirmation
```

### Customer → Purchase
```
Home → Products → Shop → Add to Cart → Checkout → POST /api/checkout → Razorpay → POST /api/webhook/razorpay → Order Confirmation
```

### Farmer → Goat Bank
```
Home → Collaborate → Samarth → "Join Hands" Form → POST /api/enquiry → Confirmation
```

### Farmer → Training
```
Home → Training → Select Tier → "Train Yourself" Form → POST /api/enquiry → Confirmation
```

### CSR → Partnership
```
Home → About → Impact → Contact → Enquiry Form → POST /api/contact → Admin Follow-up
```

### Staff → Admin Panel
```
/admin/login → Dashboard → Products | Orders | Enquiries | Blog | Settings
```

### Dealer → Portal
```
/dealer/login → Product Catalog → Place Order → Order History
```

### Farmer → Portal
```
/farmer/login → My Enrollments | My Orders | Profile
```

---

## Project Structure (Monorepo)

```
manikstu/
├── frontend/                    # Next.js 14 App
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   ├── patterns/        # Tribal art SVG patterns
│   │   │   ├── heroes/
│   │   │   ├── products/
│   │   │   ├── team/
│   │   │   ├── projects/
│   │   │   ├── blog/
│   │   │   ├── gallery/
│   │   │   └── partners/
│   │   ├── fonts/
│   │   │   ├── PlayfairDisplay-Bold.woff2
│   │   │   ├── Inter-Regular.woff2
│   │   │   ├── Inter-Medium.woff2
│   │   │   ├── Inter-SemiBold.woff2
│   │   │   └── Inter-Bold.woff2
│   │   ├── robots.txt
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── globals.css
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── goat-care/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── erp/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── farming-solution/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── insurance/
│   │   │   │       └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── checkout/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── confirmation/
│   │   │   │       └── page.tsx
│   │   │   ├── collaborate/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── training/
│   │   │   │   └── page.tsx
│   │   │   ├── impact/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── press/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── page.tsx
│   │   │   │   └── video/
│   │   │   │       └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── careers/
│   │   │   │   └── page.tsx
│   │   │   ├── legal/
│   │   │   │   ├── privacy/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── terms/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── shipping/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── cancellation-refund/
│   │   │   │       └── page.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   └── Breadcrumb.tsx
│   │   │   ├── patterns/
│   │   │   │   ├── SauraBorder.tsx
│   │   │   │   ├── SauraFigures.tsx
│   │   │   │   ├── SauraSunDisc.tsx
│   │   │   │   ├── SauraTreeOfLife.tsx
│   │   │   │   ├── GodnaTexture.tsx
│   │   │   │   ├── DhokraElephant.tsx
│   │   │   │   ├── DhokraPeacock.tsx
│   │   │   │   ├── IkatPattern.tsx
│   │   │   │   └── GhumuraDrum.tsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── ProjectCards.tsx
│   │   │   │   ├── ProductCarousel.tsx
│   │   │   │   ├── ImpactStats.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   └── CtaBanner.tsx
│   │   │   ├── shared/
│   │   │   │   ├── Section.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Form.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Textarea.tsx
│   │   │   │   ├── ImpactCounter.tsx
│   │   │   │   ├── TeamCard.tsx
│   │   │   │   ├── FaqAccordion.tsx
│   │   │   │   └── SocialIcons.tsx
│   │   │   ├── shop/
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── Cart.tsx
│   │   │   │   ├── CartItem.tsx
│   │   │   │   ├── CheckoutForm.tsx
│   │   │   │   └── OrderSummary.tsx
│   │   │   ├── blog/
│   │   │   │   ├── PostCard.tsx
│   │   │   │   ├── PostList.tsx
│   │   │   │   └── RichText.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── ImageGrid.tsx
│   │   │   │   ├── ImageLightbox.tsx
│   │   │   │   └── VideoCard.tsx
│   │   │   └── seo/
│   │   │       ├── JsonLd.tsx
│   │   │       └── MetaTags.tsx
│   │   ├── lib/
│   │   │   ├── api.ts             # Laravel API client
│   │   │   ├── razorpay.ts        # Razorpay helper
│   │   │   ├── utils.ts           # cn(), formatPrice(), etc.
│   │   │   ├── constants.ts       # Navigation, project data
│   │   │   └── validations.ts     # Zod schemas
│   │   ├── hooks/
│   │   │   ├── useCart.ts
│   │   │   ├── useAuth.ts         # Auth state (farmer/dealer)
│   │   │   ├── useMobileNav.ts
│   │   │   └── useModal.ts
│   │   └── types/
│   │       └── index.ts           # TypeScript interfaces
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.local
│   └── .gitignore
│
├── backend/                       # Laravel 11 API + Admin
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/
│   │   │   │   │   ├── ProductController.php
│   │   │   │   │   ├── OrderController.php
│   │   │   │   │   ├── ProjectController.php
│   │   │   │   │   ├── EnquiryController.php
│   │   │   │   │   ├── BlogController.php
│   │   │   │   │   ├── GalleryController.php
│   │   │   │   │   ├── TeamController.php
│   │   │   │   │   ├── ContactController.php
│   │   │   │   │   ├── NewsletterController.php
│   │   │   │   │   ├── TestimonialController.php
│   │   │   │   │   └── Auth/
│   │   │   │   │       ├── LoginController.php
│   │   │   │   │       └── RegisterController.php
│   │   │   │   └── Admin/
│   │   │   │       ├── DashboardController.php
│   │   │   │       ├── ProductController.php
│   │   │   │       ├── OrderController.php
│   │   │   │       ├── CustomerController.php
│   │   │   │       ├── ProjectController.php
│   │   │   │       ├── EnrollmentController.php
│   │   │   │       ├── BlogController.php
│   │   │   │       ├── PressController.php
│   │   │   │       ├── GalleryController.php
│   │   │   │       ├── TeamController.php
│   │   │   │       ├── EnquiryController.php
│   │   │   │       ├── TestimonialController.php
│   │   │   │       └── SettingController.php
│   │   │   ├── Middleware/
│   │   │   │   ├── Cors.php
│   │   │   │   ├── SanctumAuth.php
│   │   │   │   └── AdminRole.php
│   │   │   └── Requests/
│   │   │       ├── ContactRequest.php
│   │   │       ├── EnquiryRequest.php
│   │   │       ├── CheckoutRequest.php
│   │   │       ├── NewsletterRequest.php
│   │   │       └── Admin/
│   │   │           ├── ProductRequest.php
│   │   │           └── BlogRequest.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Product.php
│   │   │   ├── ProductCategory.php
│   │   │   ├── Order.php
│   │   │   ├── OrderItem.php
│   │   │   ├── Customer.php
│   │   │   ├── Project.php
│   │   │   ├── Enrollment.php
│   │   │   ├── BlogPost.php
│   │   │   ├── PressRelease.php
│   │   │   ├── Gallery.php
│   │   │   ├── GalleryImage.php
│   │   │   ├── Team.php
│   │   │   ├── Enquiry.php
│   │   │   ├── Testimonial.php
│   │   │   ├── Newsletter.php
│   │   │   ├── Setting.php
│   │   │   └── Payment.php
│   │   ├── Services/
│   │   │   ├── RazorpayService.php
│   │   │   ├── EmailService.php
│   │   │   └── ImageService.php
│   │   └── Enums/
│   │       ├── UserRole.php
│   │       ├── OrderStatus.php
│   │       ├── EnquiryStatus.php
│   │       └── EnquiryType.php
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   ├── 2024_01_01_000001_create_products_table.php
│   │   │   ├── 2024_01_01_000002_create_orders_table.php
│   │   │   ├── 2024_01_01_000003_create_projects_table.php
│   │   │   ├── 2024_01_01_000004_create_enrollments_table.php
│   │   │   ├── 2024_01_01_000005_create_blog_posts_table.php
│   │   │   ├── 2024_01_01_000006_create_press_releases_table.php
│   │   │   ├── 2024_01_01_000007_create_galleries_table.php
│   │   │   ├── 2024_01_01_000008_create_team_table.php
│   │   │   ├── 2024_01_01_000009_create_enquiries_table.php
│   │   │   ├── 2024_01_01_000010_create_testimonials_table.php
│   │   │   ├── 2024_01_01_000011_create_newsletters_table.php
│   │   │   ├── 2024_01_01_000012_create_payments_table.php
│   │   │   └── 2024_01_01_000013_create_settings_table.php
│   │   └── seeders/
│   │       ├── ProductSeeder.php
│   │       ├── ProjectSeeder.php
│   │       ├── TeamSeeder.php
│   │       └── SettingSeeder.php
│   ├── routes/
│   │   ├── api.php                # Public REST API
│   │   ├── admin.php              # Admin Blade routes
│   │   └── web.php                # Web routes (admin Blade)
│   ├── resources/
│   │   └── views/
│   │       ├── admin/
│   │       │   ├── layouts/
│   │       │   │   └── app.blade.php
│   │       │   ├── dashboard.blade.php
│   │       │   ├── products/
│   │       │   │   ├── index.blade.php
│   │       │   │   ├── create.blade.php
│   │       │   │   └── edit.blade.php
│   │       │   ├── orders/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── show.blade.php
│   │       │   ├── customers/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── show.blade.php
│   │       │   ├── projects/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── edit.blade.php
│   │       │   ├── enrollments/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── show.blade.php
│   │       │   ├── blog/
│   │       │   │   ├── index.blade.php
│   │       │   │   ├── create.blade.php
│   │       │   │   └── edit.blade.php
│   │       │   ├── press/
│   │       │   │   ├── index.blade.php
│   │       │   │   ├── create.blade.php
│   │       │   │   └── edit.blade.php
│   │       │   ├── gallery/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── create.blade.php
│   │       │   ├── team/
│   │       │   │   ├── index.blade.php
│   │       │   │   ├── create.blade.php
│   │       │   │   └── edit.blade.php
│   │       │   ├── enquiries/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── show.blade.php
│   │       │   ├── testimonials/
│   │       │   │   ├── index.blade.php
│   │       │   │   └── create.blade.php
│   │       │   └── settings/
│   │       │       └── index.blade.php
│   │       ├── dealer/
│   │       │   ├── layouts/
│   │       │   │   └── app.blade.php
│   │       │   ├── dashboard.blade.php
│   │       │   ├── products.blade.php
│   │       │   ├── orders.blade.php
│   │       │   └── profile.blade.php
│   │       ├── farmer/
│   │       │   ├── layouts/
│   │       │   │   └── app.blade.php
│   │       │   ├── dashboard.blade.php
│   │       │   ├── enrollments.blade.php
│   │       │   ├── orders.blade.php
│   │       │   └── profile.blade.php
│   │       └── auth/
│   │           ├── login.blade.php
│   │           └── forgot-password.blade.php
│   ├── config/
│   │   ├── cors.php
│   │   ├── sanctum.php
│   │   └── manikstu.php
│   ├── storage/
│   │   └── app/
│   │       └── public/
│   │           └── uploads/
│   │               ├── products/
│   │               ├── team/
│   │               ├── gallery/
│   │               ├── blog/
│   │               └── logo/
│   ├── .env
│   ├── composer.json
│   ├── artisan
│   └── phpunit.xml
│
├── .gitignore
├── README.md
├── PRD.MD
├── ARCHITECTURE.MD
├── RULES.MD
├── PHASES.MD
├── DESIGN.MD
└── MEMORY.MD
```

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | Next.js | 14+ | React SSR/SSG, App Router |
| Language | TypeScript | 5+ | Type safety |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS |
| Backend | Laravel | 11 | REST API + Admin |
| Database | MySQL | 8+ | Data storage |
| Auth | Laravel Sanctum | — | API token auth |
| Payments | Razorpay | — | Indian payment gateway |
| Forms | React Hook Form | 7+ | Frontend form validation |
| Validation | Zod + Laravel Rules | — | Client + server validation |
| Animations | Framer Motion | 11+ | Scroll reveals, transitions |
| Icons | Lucide React | — | Frontend icons |
| Admin | Laravel Blade | — | Custom admin panel |
| Deployment | Vercel + VPS | — | Frontend + Backend |
| Analytics | GA4 | — | Traffic tracking |

---

## Data Flow

```
┌──────────────────┐     REST API     ┌──────────────────┐
│     Next.js      │ ◄──────────────► │    Laravel API    │
│   App Router     │    JSON/HTTPS    │    (Sanctum)      │
└──────────────────┘                  └────────┬─────────┘
                                               │
                                               │ Eloquent ORM
                                               ▼
                                        ┌──────────────────┐
                                        │     MySQL 8      │
                                        │   (All data)     │
                                        └──────────────────┘

┌──────────────────┐     Sessions     ┌──────────────────┐
│   Laravel Blade  │ ◄──────────────► │    Laravel API    │
│   Admin Panel    │    Cookie Auth   │    (Web Auth)     │
└──────────────────┘                  └──────────────────┘

┌──────────────────┐     Razorpay     ┌──────────────────┐
│   Checkout Flow  │ ────────────────► │   Razorpay API   │
│   (Next.js)      │ ◄─────────────── │   (Webhook)      │
└──────────────────┘                  └──────────────────┘
```

---

## Database Schema (Key Tables)

```sql
-- Users (Staff, Dealers, Farmers)
users:
  id, name, email, password, phone,
  role ENUM('staff','dealer','farmer'),
  avatar, is_active, remember_token,
  created_at, updated_at

-- Products
product_categories:
  id, name, slug, description, image, sort_order, created_at

products:
  id, name, slug, description, price, compare_price, cost_price,
  sku, stock_quantity, category_id, image, images JSON,
  is_active, meta_title, meta_description, created_at, updated_at

-- Orders
orders:
  id, order_number, customer_id, user_id (nullable),
  status ENUM('pending','confirmed','processing','shipped','delivered','cancelled'),
  subtotal, discount, shipping, tax, total,
  shipping_address JSON, billing_address JSON,
  notes, razorpay_order_id, razorpay_payment_id,
  created_at, updated_at

order_items:
  id, order_id, product_id, product_name, quantity, price, total

payments:
  id, order_id, amount, method, status,
  razorpay_order_id, razorpay_payment_id, razorpay_signature,
  paid_at, created_at

-- Customers
customers:
  id, name, email, phone, city, state, address JSON,
  total_orders, total_spent, created_at, updated_at

-- Projects & Enrollments
projects:
  id, name, slug, description, short_description,
  image, hero_image, statistics JSON,
  is_active, sort_order, created_at

enrollments:
  id, project_id, user_id (nullable), name, phone, state,
  status ENUM('pending','approved','rejected','completed'),
  notes, admin_notes, created_at, updated_at

-- Blog / Press
blog_posts:
  id, title, slug, content LONGTEXT, excerpt,
  featured_image, author_id, category, tags JSON,
  is_published, published_at,
  meta_title, meta_description, views, created_at, updated_at

press_releases:
  id, title, slug, content LONGTEXT, excerpt,
  featured_image, publication_name, publication_date,
  is_published, meta_title, meta_description, created_at, updated_at

-- Gallery
galleries:
  id, name, slug, type ENUM('image','video'),
  description, is_active, created_at

gallery_images:
  id, gallery_id, image, video_url, caption,
  alt_text, sort_order, created_at

-- Team
team:
  id, name, role, department ENUM('leadership','management','field_staff','advisors'),
  bio, photo, email, phone, linkedin,
  sort_order, is_active, created_at

-- Enquiries
enquiries:
  id, user_id (nullable), name, phone, email, city, state,
  enquiry_type ENUM('goat_services','goat_farm','dealership','csr','bulk_order','others'),
  message, status ENUM('new','contacted','converted','closed'),
  admin_notes, assigned_to, created_at, updated_at

-- Testimonials
testimonials:
  id, name, location, photo, quote, rating,
  is_active, sort_order, created_at

-- Newsletter
newsletters:
  id, name, email, is_subscribed, subscribed_at, created_at

-- Settings
settings:
  id, key, value LONGTEXT, group, created_at, updated_at
```

---

## REST API Endpoints

```
PUBLIC (no auth):
├── GET    /api/products                  # List products
├── GET    /api/products/{slug}           # Product detail
├── GET    /api/products/categories       # List categories
├── GET    /api/projects                  # List projects
├── GET    /api/projects/{slug}           # Project detail
├── GET    /api/blog                      # List blog posts
├── GET    /api/blog/{slug}               # Blog post detail
├── GET    /api/press                     # List press releases
├── GET    /api/gallery/{type}            # Gallery (image/video)
├── GET    /api/team                      # Team members
├── GET    /api/testimonials              # Testimonials
├── GET    /api/settings                  # Public settings
├── POST   /api/contact                   # Contact form
├── POST   /api/enquiry                   # Enquiry form
├── POST   /api/newsletter                # Newsletter subscribe
├── POST   /api/checkout                  # Create Razorpay order
└── POST   /api/webhook/razorpay          # Razorpay webhook

FARMER (auth: sanctum, role: farmer):
├── POST   /api/auth/login               # Phone + OTP login
├── POST   /api/auth/register            # Farmer registration
├── GET    /api/farmer/profile            # Get profile
├── PUT    /api/farmer/profile            # Update profile
├── GET    /api/farmer/enrollments        # My enrollments
└── GET    /api/farmer/orders             # My orders

DEALER (auth: sanctum, role: dealer):
├── POST   /api/auth/login               # Email + password login
├── GET    /api/dealer/profile            # Get profile
├── PUT    /api/dealer/profile            # Update profile
├── GET    /api/dealer/orders             # Dealer orders
└── POST   /api/dealer/orders             # Place order

ADMIN (auth: sanctum, role: staff):
├── POST   /api/admin/login               # Admin login
├── GET    /api/admin/dashboard           # Dashboard stats
├── CRUD   /api/admin/products            # Product management
├── CRUD   /api/admin/orders              # Order management
├── PUT    /api/admin/orders/{id}/status  # Update order status
├── CRUD   /api/admin/customers           # Customer management
├── CRUD   /api/admin/projects            # Project management
├── CRUD   /api/admin/enrollments         # Enrollment management
├── PUT    /api/admin/enrollments/{id}/status  # Approve/reject
├── CRUD   /api/admin/blog                # Blog management
├── CRUD   /api/admin/press               # Press management
├── CRUD   /api/admin/gallery             # Gallery management
├── CRUD   /api/admin/team                # Team management
├── CRUD   /api/admin/enquiries           # Enquiry management
├── PUT    /api/admin/enquiries/{id}/status  # Update enquiry status
├── CRUD   /api/admin/testimonials        # Testimonial management
├── CRUD   /api/admin/settings            # Settings management
├── POST   /api/admin/upload              # Image upload
├── GET    /api/admin/reports/{type}      # Reports (sales, enquiries)
└── CRUD   /api/admin/users               # Admin user management
```

---

## Laravel Blade Admin Structure

```
Admin Layout:
├── Sidebar (dark green #3A7030)
│   ├── Logo
│   ├── Navigation items with icons
│   ├── User avatar + name
│   └── Logout button
├── Top bar
│   ├── Search
│   ├── Notifications
│   └── User dropdown
└── Main content area

Pages:
├── Dashboard — Stats cards, charts, recent activity
├── Products — Table with filters, bulk actions, export
├── Product Create/Edit — Form with image upload
├── Orders — Table with status badges, filters
├── Order Detail — Customer info, items, status timeline
├── Customers — Table with search
├── Customer Detail — Profile, order history
├── Projects — Table with stats
├── Enrollments — Table with approve/reject actions
├── Blog — Table with draft/publish toggle
├── Blog Create/Edit — Rich text editor, image upload
├── Press — Same as blog
├── Gallery — Grid with drag-and-drop upload
├── Team — Table with department filter
├── Enquiries — Table with status workflow
├── Enquiry Detail — Notes, follow-up, status change
├── Testimonials — Table with sort order
├── Settings — Tabs (General, Email, SEO, Payment)
└── Users — CRUD for admin accounts
```
