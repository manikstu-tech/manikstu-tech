# Development Phases — Manikstu Website

## Phase 1: Foundation (Week 1-2)

### Frontend Setup
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS with custom color palette
- [ ] Set up `@/` path aliases
- [ ] Create frontend folder structure
- [ ] Set up `.env.local` (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_RAZORPAY_KEY)
- [ ] Configure `next.config.ts`
- [ ] Create `cn()` utility (clsx + tailwind-merge)
- [ ] Create TypeScript interfaces (mirrors Laravel models)

### Backend Setup
- [ ] Initialize Laravel 11 project
- [ ] Configure MySQL database connection
- [ ] Set up Laravel Sanctum for API auth
- [ ] Configure CORS (allow Next.js frontend)
- [ ] Set up file storage (symlink public/uploads)
- [ ] Create `.env` (DB, RAZORPAY, MAIL settings)
- [ ] Set up API response format (success/error JSON)

### Database
- [ ] Create all migrations (users, products, orders, projects, enquiries, blog, gallery, team, settings)
- [ ] Define all enums (UserRole, OrderStatus, EnquiryStatus, EnquiryType)
- [ ] Set up model relationships (belongsTo, hasMany, etc.)
- [ ] Create seeders (products, projects, team, settings)

### Design System (Frontend)
- [ ] Create SVG pattern library (Saura, Godna, Dhokra, Ikat, Ghumura)
- [ ] Set up typography (Playfair Display + Inter, self-hosted)
- [ ] Define CSS custom properties (colors, spacing, shadows)
- [ ] Build API client (`src/lib/api.ts`)

### Layout (Frontend)
- [ ] Root layout with Header + Footer
- [ ] Header component (responsive, Saura border)
- [ ] Footer component (clean, minimal, Saura border)
- [ ] MobileNav component (slide-out, Godna texture)
- [ ] Breadcrumb component

### Admin Panel (Laravel Blade)
- [ ] Create admin layout (sidebar + topbar)
- [ ] Build login page (email + password)
- [ ] Set up Sanctum session auth for Blade
- [ ] Create dashboard page (stats cards)
- [ ] Set up admin routes with role middleware

### Global
- [ ] Global loading state (Ghumura drum animation)
- [ ] Custom 404 page (Saura illustration)
- [ ] Metadata defaults (title template, open graph)
- [ ] robots.txt
- [ ] Google Analytics setup

### Deliverables
- Working Next.js frontend with Tailwind
- Working Laravel API with MySQL
- All SVG tribal art patterns
- Responsive header/footer
- Admin login + dashboard
- Database seeded with initial data

---

## Phase 2: Core Pages + API (Week 2-3)

### Frontend Pages
- [ ] Home page (all sections: hero, projects, products, stats, testimonials, CTA)
- [ ] About page (company story, vision/mission, Kalahandi heritage)
- [ ] Team page (org chart: founders, management, field staff, advisors)
- [ ] Services overview page (4 service cards)
- [ ] Goat Care detail page (6 sub-services)
- [ ] ERP detail page (4 ERP applications)
- [ ] Farming Solution detail page (7 solution areas)
- [ ] Insurance detail page (insurance details + CTA)

### Laravel API Endpoints
- [ ] GET /api/products (list with pagination)
- [ ] GET /api/products/{slug}
- [ ] GET /api/products/categories
- [ ] GET /api/projects
- [ ] GET /api/projects/{slug}
- [ ] GET /api/team
- [ ] GET /api/testimonials
- [ ] GET /api/settings

### Frontend Components
- [ ] Hero component (with Saura animation overlay)
- [ ] Section component (with optional Saura border)
- [ ] Card component (Ikat-bordered, Godna-textured)
- [ ] ImpactCounter component (Saura sun-disc styled)
- [ ] TeamCard component (Dhokra portrait frame)
- [ ] Button component (primary green, secondary red)
- [ ] FaqAccordion component

### Admin Panel
- [ ] Product list page (table with filters)
- [ ] Product create/edit page (form with image upload)
- [ ] Team list page
- [ ] Team create/edit page
- [ ] Settings page (company info)

### Deliverables
- 8 frontend pages styled and responsive
- Laravel API returning data for dynamic pages
- Admin panel: product + team management
- All tribal art patterns integrated

---

## Phase 3: E-commerce (Week 3-4)

### Frontend Pages
- [ ] Products overview page (3 category tabs)
- [ ] Product detail pages (dynamic routing from API)
- [ ] Shop page with product grid
- [ ] Shop checkout page
- [ ] Order confirmation page

### Laravel API Endpoints
- [ ] POST /api/checkout (create Razorpay order)
- [ ] POST /api/webhook/razorpay (payment verification)
- [ ] POST /api/contact (contact form)
- [ ] POST /api/enquiry (enquiry form)
- [ ] POST /api/newsletter (newsletter subscribe)

### Frontend Components
- [ ] ProductGrid component
- [ ] ProductCard component (Ikat-bordered)
- [ ] Cart component (slide-out sidebar)
- [ ] CartItem component
- [ ] CheckoutForm component (Razorpay integration)
- [ ] OrderSummary component

### Laravel Services
- [ ] RazorpayService (create order, verify payment)
- [ ] EmailService (order confirmation, enquiry notification)
- [ ] ImageService (upload, resize, store)

### Admin Panel
- [ ] Order list page (table with status filters)
- [ ] Order detail page (customer, items, status timeline)
- [ ] Customer list page
- [ ] Customer detail page

### Deliverables
- Working e-commerce flow (browse → cart → checkout → confirmation)
- Razorpay integration live
- Admin: order + customer management
- Email notifications working

---

## Phase 4: Collaborate + Impact (Week 4-5)

### Frontend Pages
- [ ] Collaborate overview page (4 project cards)
- [ ] Project Samarth detail page (goat bank model)
- [ ] Project Sujalam Sufalam detail page (women empowerment)
- [ ] Project Samriddhi detail page (entrepreneurship)
- [ ] Project Dhanvantaram detail page (replication)
- [ ] Training and Awareness page (5 training tiers)
- [ ] Impact page (SDGs, metrics, social/economic/industry tabs)

### Laravel API Endpoints
- [ ] CRUD /api/admin/projects
- [ ] CRUD /api/admin/enrollments
- [ ] PUT /api/admin/enrollments/{id}/status
- [ ] CRUD /api/admin/enquiries
- [ ] PUT /api/admin/enquiries/{id}/status

### Frontend Forms
- [ ] Join Hands form (per project: Mobile, Project, State)
- [ ] Train Yourself form (Mobile, Training Type, State)
- [ ] Contact form (unified: Name, Phone, Email, City, State, Enquiry Type, Message)

### Frontend Components
- [ ] Saura-styled unique illustrations per project
- [ ] SDG icons (Saura stick-figure reinterpretations)
- [ ] Form components (Input, Select, Textarea with validation)

### Admin Panel
- [ ] Project list/edit page
- [ ] Enrollment list page with approve/reject
- [ ] Enquiry list page with status workflow
- [ ] Enquiry detail page with follow-up notes

### Deliverables
- 4 project pages with unique Saura illustrations
- Working enrollment/contact forms (submit to Laravel)
- Admin: project/enrollment/enquiry management

---

## Phase 5: Dynamic Content + Auth (Week 5)

### Frontend Pages
- [ ] Blog listing page (from API)
- [ ] Blog post detail page (dynamic routing)
- [ ] Press release listing page
- [ ] Press release detail page
- [ ] Image gallery page (masonry grid)
- [ ] Video gallery page (thumbnails + embeds)
- [ ] Careers page (jobs, culture, application)
- [ ] Privacy policy page
- [ ] Terms and conditions page
- [ ] Shipping and delivery page
- [ ] Cancellation and refund page

### Laravel API Endpoints
- [ ] CRUD /api/admin/blog
- [ ] CRUD /api/admin/press
- [ ] CRUD /api/admin/gallery
- [ ] CRUD /api/admin/testimonials
- [ ] CRUD /api/admin/settings
- [ ] CRUD /api/admin/users

### Frontend Components
- [ ] PostCard component (blog/press)
- [ ] PostList component (with pagination)
- [ ] RichText component (HTML content renderer)
- [ ] ImageGrid component (masonry)
- [ ] ImageLightbox component
- [ ] VideoCard component (with Ghumura play button)

### Authentication (Frontend)
- [ ] Login page (phone + OTP for farmers, email + password for dealers/staff)
- [ ] Auth context/hook (useAuth)
- [ ] Protected route wrapper
- [ ] Farmer portal (enrollments, orders, profile)
- [ ] Dealer portal (products, orders, profile)

### Auth (Laravel)
- [ ] POST /api/auth/login (Sanctum token)
- [ ] POST /api/auth/register
- [ ] POST /api/auth/logout
- [ ] Farmer API endpoints (enrollments, orders)
- [ ] Dealer API endpoints (orders, profile)

### Forms
- [ ] Newsletter subscription form (footer)
- [ ] Careers application form

### Admin Panel
- [ ] Blog create/edit page (rich text editor)
- [ ] Press create/edit page
- [ ] Gallery management page (upload, albums)
- [ ] Testimonial create/edit page
- [ ] Settings page (all tabs: General, Email, SEO, Payment)
- [ ] User management page (CRUD admin accounts)

### Deliverables
- All CMS-driven pages working
- Authentication system (3 roles)
- Farmer + Dealer portals
- Complete admin panel
- All forms functional

---

## Phase 6: Polish + Launch (Week 6)

### Quality Assurance
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Keyboard navigation test
- [ ] Screen reader test
- [ ] Color contrast verification
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Performance
- [ ] Lighthouse audit (target: 90+ all categories)
- [ ] Image optimization (WebP, lazy loading, blur placeholders)
- [ ] Font optimization (preload, swap)
- [ ] Bundle size analysis
- [ ] Core Web Vitals check
- [ ] Laravel query optimization (N+1 checks)
- [ ] API response time < 200ms

### SEO
- [ ] Meta tags verification (all pages)
- [ ] Open Graph images (all pages)
- [ ] JSON-LD structured data (Organization, Products, Articles)
- [ ] Sitemap.xml generation
- [ ] robots.txt verification
- [ ] Google Search Console setup

### Content
- [ ] All real text content populated
- [ ] All real images uploaded (team, products, gallery)
- [ ] Blog posts created
- [ ] Product catalog populated
- [ ] Team member profiles added

### Launch
- [ ] Domain DNS configuration
- [ ] SSL certificate setup
- [ ] Vercel deployment (frontend)
- [ ] VPS/hosting deployment (Laravel backend)
- [ ] Razorpay live mode switch
- [ ] Database backup strategy
- [ ] Analytics verification
- [ ] Final QA pass
- [ ] Post-launch monitoring

### Deliverables
- Production-ready website at manikstu.com
- Laravel API running on VPS
- All content populated
- Domain live with SSL
- Analytics tracking confirmed
- Admin panel accessible
- Farmer + Dealer portals live
