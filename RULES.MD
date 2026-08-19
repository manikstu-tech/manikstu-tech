# Rules — Manikstu Website Development

## What to USE

### Frontend (Next.js)
- Next.js 14+ with **App Router** (NOT Pages Router)
- TypeScript in **strict mode**
- Tailwind CSS 3.4+ (utility classes only, NOT custom CSS files)
- React Hook Form + Zod for all forms
- Framer Motion for minimal, purposeful animations
- Lucide React for all icons
- `next/image` for ALL images (optimized, WebP, blur placeholder)
- `next/link` for ALL internal navigation
- `cn()` helper (clsx + tailwind-merge) for conditional classes

### Backend (Laravel)
- Laravel 11 (latest stable)
- **Sanctum** for API authentication (token-based)
- **Eloquent ORM** for all database queries (NOT raw SQL)
- **Form Requests** for validation (NOT inline validation)
- **API Resources** for JSON transformation (NOT manual arrays)
- **Enums** for status fields (UserRole, OrderStatus, etc.)
- **Service classes** for business logic (RazorpayService, EmailService)
- **Blade components** for admin panel (NOT Livewire, NOT Inertia)
- **Route Model Binding** for all show/update/delete routes
- **Middleware** for role-based access (AdminRole)
- **Migrations** for ALL schema changes (never manual SQL)
- **Seeders** for initial data (products, projects, team, settings)

### Code Patterns
- **Server Components by default** — only add `'use client'` when interactivity is required (Next.js)
- **One component per file** — single responsibility
- **Named exports** — default exports only for `page.tsx` and `layout.tsx` (Next.js)
- **Const arrow functions** for all components
- **Absolute imports** via `@/` alias (Next.js)
- **Zod schemas** for ALL form validation (client + server)
- **Loading states** for ALL async operations
- **Error boundaries** for each route segment (`error.tsx`)
- **Metadata API** for ALL page SEO (Next.js)
- **Single Responsibility** — one class, one job (Laravel)
- **Fat Models, Thin Controllers** (Laravel)
- **Repository pattern** NOT needed (Eloquent is enough)

### Asset Rules
- SVG patterns for tribal art — inline as React components (NOT external files)
- `next/image` for all photos (with `placeholder="blur"` and `blurDataURL`)
- Self-hosted WOFF2 fonts (NOT Google Fonts CDN)
- WebP/AVIF for all images
- Laravel file storage: `storage/app/public/uploads/` with symbolic link
- Image upload: validate in Form Request, store with unique name

### Naming Conventions
- **Next.js**: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Laravel**: `PascalCase.php` for Models/Classes, `snake_case` for methods/variables
- **Database**: `snake_case` tables, `snake_case` columns, `singular` table names
- **Routes**: `kebab-case` for URLs (except API: `snake_case` with dots)
- Folders: `kebab-case` for routes, `camelCase` for utilities
- CSS classes: Tailwind utilities only, custom classes via `@layer components`

---

## What to AVOID

### Frontend Libraries — NEVER ADD
| Category | Never Use | Use Instead |
|----------|-----------|-------------|
| State | Redux, Zustand, Jotai, Recoil | React useState/useContext + URL params |
| UI Kit | Material UI, Chakra, Shadcn, Ant Design | Tailwind CSS + custom components |
| HTTP | Axios | Native `fetch` (Next.js) |
| Dates | Moment.js, Day.js, date-fns | `Intl.DateTimeFormat` (native) |
| Utilities | Lodash, Ramda | Native JS methods |
| CSS-in-JS | styled-components, Emotion, styled-jsx | Tailwind CSS |
| Animation | GSAP, anime.js, react-spring | Framer Motion (minimal) |
| Carousels | Swiper, react-slick | CSS scroll-snap + minimal JS |
| Testing | Enzyme | Vitest + Testing Library |
| Forms | Formik | React Hook Form + Zod |

### Backend Libraries — NEVER ADD
| Category | Never Use | Use Instead |
|----------|-----------|-------------|
| Admin Panel | Filament, Nova, Voyager | Custom Blade (already chosen) |
| ORM | Raw SQL, DB::select() | Eloquent ORM |
| Auth | Jetstream, Breeze | Custom with Sanctum |
| API | Postman collections | Laravel API Resources |
| Debugging | Ray, Clockwork | Laravel Telescope (dev only) |
| Testing | Codeception | PHPUnit (built-in) |
| Search | Algolia, Meilisearch | MySQL LIKE/whereFullText |
| Queue | Horizon, RabbitMQ | Laravel Jobs (database driver) |

### Code Patterns — NEVER DO
- `useEffect` for data fetching in Next.js (use server components or route handlers)
- `localStorage`/`sessionStorage` for critical state (use cookies/URL params)
- `window` object without `'use client'` directive
- Inline styles (use Tailwind classes)
- `any` type in TypeScript (use proper types, `unknown` if unsure)
- `console.log` in production code (use proper error handling)
- Hardcoded strings (use constants.ts or API)
- Magic numbers (use named constants)
- Nested ternaries (use if/else or switch expressions)
- Default exports for components (except pages)
- `dd()`, `dump()`, `print_r()` in production (Laravel)
- Mass assignment without `$fillable` (Laravel)
- Returning arrays from controllers (use API Resources)
- Using `Model::all()` without limits (Laravel)
- Skipping CSRF on POST routes (Laravel)
- Using `DB::raw()` without parameter binding
- Putting business logic in controllers (use Service classes)

### Performance — NEVER DO
- Loading ALL images at once (use `loading="lazy"`)
- Loading ALL fonts at once (use `font-display: swap`)
- Client-side data fetching when server component works (Next.js)
- Large bundle imports — check bundle size
- Unnecessary re-renders — memoize expensive computations
- N+1 queries in Laravel (use eager loading: `with()`)
- Selecting `*` in queries (select only needed columns)
- Missing database indexes on foreign keys
- No pagination for large datasets

### Security — NEVER DO
- Expose API keys in client components
- Trust user input without validation (validate on client AND server)
- Use `eval()` or `dangerouslySetInnerHTML` without sanitization
- Store sensitive data in localStorage/cookies without encryption
- Serve content over HTTP (always HTTPS)
- Skip CSRF protection on forms
- Commit `.env` files to git
- Log sensitive data
- Use `DB::raw()` without parameter binding (SQL injection)
- Return full error messages in production API responses
- Allow unauthenticated access to admin routes
- Skip rate limiting on login/form endpoints

### AI Boundaries
- AI generates boilerplate and repetitive code — NOT business logic
- AI suggests patterns — NOT final architecture decisions
- AI writes types and interfaces — NOT assumes them
- AI handles repetitive tasks — NOT creative design choices
- Every AI-generated file MUST be reviewed before commit
- AI MUST NOT add new dependencies without approval
- AI MUST NOT modify `package.json` or `composer.json` without approval
- AI MUST NOT touch `.env` files
- AI MUST NOT commit changes (only suggest)
- AI MUST NOT create new files without the user specifying the need
- AI MUST NOT write database migrations without approval (schema changes are critical)

---

## Error Handling

### Frontend (Next.js)
- Form validation errors → inline field messages (Zod)
- API errors → toast notifications (minimal, non-blocking)
- Network errors → retry button + fallback content
- 404 → custom not-found page with Saura illustration
- 500 → generic error page with retry + contact info

### Backend (Laravel)
- Validation errors → 422 JSON response with field errors
- Authentication errors → 401 JSON response
- Authorization errors → 403 JSON response
- Not found → 404 JSON response
- Server errors → 500 JSON response (message hidden in production)
- Razorpay errors → log + return user-friendly message
- Form submission errors → return structured error response
- Webhook errors → retry queue + admin notification
- Rate limiting → 429 JSON response

### Laravel Error Response Format
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "phone": ["The phone must be 10 digits."]
  }
}
```

### Laravel Success Response Format
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Manikstu Poshak Tatwa",
    "slug": "manikstu-poshak-tatwa"
  }
}
```
