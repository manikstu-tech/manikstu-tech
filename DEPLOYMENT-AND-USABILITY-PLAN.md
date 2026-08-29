# Manikstu Agro — Deployment & Usability Fix Plan

Generated: 2026-08-26

---

## Part 1: GoDaddy Domain → Hostinger VPS Deployment

### Architecture
```
GoDaddy (DNS only) ──A record──▶ Hostinger VPS (Ubuntu 22.04)
                                    ├── Nginx (reverse proxy + SSL)
                                    ├── PHP 8.3-FPM (Laravel backend → :8000)
                                    ├── Node.js + PM2 (Next.js frontend → :3000)
                                    └── MySQL 8 (production DB)
```

### Phase A: GoDaddy DNS Setup

**At GoDaddy → My Products → DNS Management for manikstu.com:**

Change nameservers to Hostinger's:
- `ns1.dns-parking.com`
- `ns2.dns-parking.com`

OR add A records directly:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `<VPS_IP>` | 600 |
| A | www | `<VPS_IP>` | 600 |
| A | api | `<VPS_IP>` | 600 |

Wait for propagation (15 min – 2 hours).

### Phase B: VPS Initial Setup

```bash
# Update system
apt update && apt upgrade -y

# Install Nginx, PHP 8.3, MySQL 8, Node.js 20, Composer
apt install -y nginx php8.3-fpm php8.3-mysql php8.3-xml php8.3-mbstring php8.3-curl php8.3-zip php8.3-gd php8.3-bcmath php8.3-intl unzip git

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Composer
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install MySQL
apt install -y mysql-server
mysql_secure_installation
```

### Phase C: Deploy Laravel Backend

```bash
cd /var/www
git clone https://github.com/manikstu-tech/manikstu-tech.git manikstu
cd manikstu/backend

composer install --no-dev --optimize-autoloader

cp .env.example .env
# Edit .env with production values:
#   APP_ENV=production
#   APP_DEBUG=false
#   APP_URL=https://api.manikstu.com
#   DB_CONNECTION=mysql
#   DB_HOST=127.0.0.1
#   DB_DATABASE=manikstu
#   DB_USERNAME=manikstu_user
#   DB_PASSWORD=<strong-password>
#   SESSION_DRIVER=database
#   CACHE_STORE=database
#   QUEUE_CONNECTION=database

php artisan key:generate

# Create MySQL database & user
mysql -u root -p
# CREATE DATABASE manikstu;
# CREATE USER 'manikstu_user'@'127.0.0.1' IDENTIFIED BY '<password>';
# GRANT ALL ON manikstu.* TO 'manikstu_user'@'127.0.0.1';
# FLUSH PRIVILEGES;

php artisan migrate --force
php artisan db:seed --force
php artisan storage:link

php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Phase D: Deploy Next.js Frontend

```bash
cd /var/www/manikstu/frontend

npm ci

cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://api.manikstu.com/api
NEXT_PUBLIC_RAZORPAY_KEY=<your-key>
EOF

npm run build

npm install -g pm2
pm2 start npm --name "manikstu-frontend" -- start
pm2 save
pm2 startup
```

### Phase E: Nginx Configuration

```nginx
# /etc/nginx/sites-available/manikstu

# HTTP → HTTPS redirect
server {
    listen 80;
    server_name manikstu.com www.manikstu.com;
    return 301 https://$server_name$request_uri;
}

# Frontend (Next.js)
server {
    listen 443 ssl http2;
    server_name manikstu.com www.manikstu.com;

    ssl_certificate /etc/letsencrypt/live/manikstu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/manikstu.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# Backend API (Laravel)
server {
    listen 443 ssl http2;
    server_name api.manikstu.com;

    ssl_certificate /etc/letsencrypt/live/manikstu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/manikstu.com/privkey.pem;

    root /var/www/manikstu/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/manikstu /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### Phase F: SSL with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d manikstu.com -d www.manikstu.com -d api.manikstu.com
```

### Phase G: Update CORS & Frontend API URL

**Backend `config/cors.php`:**
```php
'allowed_origins' => ['https://manikstu.com', 'https://www.manikstu.com'],
```

### Deployment Checklist
- [ ] GoDaddy DNS A records point to VPS IP
- [ ] VPS has MySQL, PHP 8.3-FPM, Node.js 20, Nginx
- [ ] Laravel `.env` production values set
- [ ] Laravel migrations run, `storage:link` created
- [ ] Frontend `.env.local` has production API URL
- [ ] Frontend built and running via PM2
- [ ] Nginx configured with SSL
- [ ] CORS updated for production domain
- [ ] `APP_DEBUG=false`, `SESSION_SECURE_COOKIE=true`

---

## Part 2: 15 Usability Fixes

### Issue 1: No consistent type scale (12 distinct font sizes)
- **Severity:** Minor
- **File:** `tailwind.config.ts` + various components
- **Fix:** Consolidate to ~8 sizes via `fontSize` tokens. Map ad-hoc sizes (`text-[10px]`, `text-[9px]`) to nearest token.

### Issue 2: Inconsistent corner radii (7 distinct)
- **Severity:** Minor
- **Files:** Multiple
- **Fix:** Standardize to: `rounded-sm` (0.25rem), `rounded-lg` (0.5rem), `rounded-xl` (0.75rem), `rounded-2xl` (1rem), `rounded-full`. Remove ad-hoc like `rounded-[2.5rem]`.

### Issue 3: Long all-caps text
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:323`
- **Fix:** Reduce `tracking-[0.25em]` to `tracking-[0.15em]` on pill text, or shorten copy.

### Issue 4: Footer columns inconsistent spacing
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:62`
- **Fix:** Change `gap-6 sm:gap-8` → `gap-6 sm:gap-8 lg:gap-10`. Add `lg:pr-8` to Stay Updated column.

### Issue 5: Social proof line offset
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:266`
- **Fix:** Adjust `mt-5 sm:mt-8` → `mt-5 sm:mt-6` for better alignment with H1/button left edge.

### Issue 6: Empty avatar circles
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:271-278`
- **Fix:** Add initials inside circles or remove entirely. Simplest: add letter "F" with `bg-manikstu-green/20`.

### Issue 7: Partner logos too small in cards (MAJOR)
- **Severity:** Major
- **File:** `app/[locale]/page.tsx:700`
- **Fix:** Change `max-h-10 w-auto max-w-[100px]` → `max-h-12 w-auto max-w-[120px]` and card `w-32 sm:w-36` → `w-36 sm:w-40`.

### Issue 8: Marquee clips harshly at edges
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:680-686`
- **Fix:** Widen fade gradients from `w-12 sm:w-28` → `w-16 sm:w-32`. (Already has gradients, just needs widening.)

### Issue 9: Office addresses uneven padding
- **Severity:** Suggestion
- **File:** `components/layout/Footer.tsx:205`
- **Fix:** Change `p-4 sm:p-6` → `p-5 sm:p-6` on offices container.

### Issue 10: Redundant nav rendered mid-page (MAJOR)
- **Severity:** Major
- **File:** `components/layout/Header.tsx`
- **Fix:** The mobile nav (`lg:hidden`) is showing when it shouldn't. Verify `hidden lg:flex` on desktop nav and `lg:hidden` on mobile nav are correctly applied. Check if viewport triggers mobile nav unexpectedly.

### Issue 11: Learn More button too thin
- **Severity:** Minor
- **File:** `app/[locale]/page.tsx:260`
- **Fix:** Change `border-2 border-charcoal` → `border-2 border-charcoal bg-charcoal/5` for subtle background tint.

### Issue 12: Auto-scroll marquee distracting
- **Severity:** Minor
- **File:** `globals.css`
- **Fix:** Add `@media (prefers-reduced-motion: reduce) { .animate-marquee, .animate-marquee-reverse { animation: none; } }` to respect user motion preferences.

### Issue 13: Video placeholder lacks play signifier (MAJOR)
- **Severity:** Major
- **File:** `app/[locale]/page.tsx:286-288`
- **Fix:** Replace generic `<Users>` icon with a play button overlay or actual thumbnail image.

### Issue 14: Newsletter input gap too large
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:188-194`
- **Fix:** Change `mt-3` on `<p>` to `mt-2` and `mt-3` on `<input>` to `mt-2`.

### Issue 15: Careers button too dominant in footer
- **Severity:** Minor
- **File:** `components/layout/Footer.tsx:166-169`
- **Fix:** Change solid green to outline: `bg-manikstu-green text-white` → `border border-manikstu-green text-manikstu-green hover:bg-manikstu-green hover:text-white`.

---

## Files to Modify

| File | Issues |
|------|--------|
| `tailwind.config.ts` | #1, #2 |
| `app/[locale]/page.tsx` | #3, #5, #6, #7, #8, #11, #13 |
| `components/layout/Footer.tsx` | #4, #9, #14, #15 |
| `components/layout/Header.tsx` | #10 |
| `src/app/globals.css` | #12 |
| `config/cors.php` (backend) | Deployment Phase G |
| `frontend/.env.local` | Deployment Phase D |
| `backend/.env` | Deployment Phase C |
