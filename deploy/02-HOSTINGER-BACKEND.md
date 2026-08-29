# Step 2: Deploy Laravel Backend to Hostinger

## Overview
The Laravel API runs on Hostinger's shared hosting (PHP 8.x + MySQL).

---

## 2.1 Create MySQL Database on Hostinger

1. Log in to **hPanel** → **Databases** → **MySQL Databases**
2. Create new database:
   - Database name: `uXXXXXX_manikstu` (Hostinger prefixes with your user)
   - Username: `uXXXXXX_manikstu_user`
   - Password: **Generate strong password, save it**
3. Add user to database with **All Privileges**

**Save these values — you'll need them for .env:**
```
DB_DATABASE=uXXXXXX_manikstu
DB_USERNAME=uXXXXXX_manikstu_user
DB_PASSWORD=<your-password>
DB_HOST=localhost
```

---

## 2.2 Upload Laravel Files

### Option A: File Manager (easiest)
1. hPanel → **Websites** → manikstu.com → **File Manager**
2. Navigate to `public_html/`
3. Upload the entire `backend/` folder contents:
   - Upload `backend/` folder
   - Rename `backend/` → `api` (or keep as `backend`)
   
### Option B: Git (if SSH access available)
```bash
cd /home/uXXXXXX/manikstu.com
git clone https://github.com/manikstu-tech/manikstu-tech.git
cd manikstu-tech/backend
```

### Option C: FTP
Use FileZilla or any FTP client with Hostinger FTP credentials.

---

## 2.3 Configure .env

In File Manager, create/edit `backend/.env`:

```env
APP_NAME="Manikstu Agro"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.manikstu.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Database (use your Hostinger MySQL values)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=uXXXXXX_manikstu
DB_USERNAME=uXXXXXX_manikstu_user
DB_PASSWORD=<your-strong-password>

# Session & Cache
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.manikstu.com

CACHE_STORE=database
QUEUE_CONNECTION=database

# Mail (configure later)
MAIL_MAILER=log
```

---

## 2.4 Set App Key

### If you have SSH access:
```bash
cd backend
php artisan key:generate
```

### If no SSH (File Manager only):
1. Go to `https://api.manikstu.com` in browser
2. You'll see "No application encryption key has been specified"
3. **Alternative:** Use Hostinger's **SSH Access** feature:
   - hPanel → **Advanced** → **SSH Access**
   - Enable and connect
   - Then run `php artisan key:generate`

---

## 2.5 Run Migrations

### Via SSH (recommended):
```bash
cd backend
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

### Via Browser (if artisan not accessible):
1. Temporarily set `APP_DEBUG=true` in .env
2. Visit `https://api.manikstu.com` — it may auto-run
3. Or create a temporary migration script:
   ```php
   // public_html/migrate.php (DELETE AFTER USE)
   <?php
   require __DIR__.'/../backend/vendor/autoload.php';
   $app = require_once __DIR__.'/../backend/bootstrap/app.php';
   $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
   $response = $kernel->handle($request = Illuminate\Http\Request::capture());
   Artisan::call('migrate', ['--force' => true]);
   Artisan::call('db:seed', ['--force' => true]);
   echo 'Migration complete';
   ```
3. Visit `https://api.manikstu.com/migrate.php`
4. **DELETE this file immediately after**

---

## 2.6 Set File Permissions

In File Manager, ensure these folders are writable:
- `storage/` → 755 or 775
- `bootstrap/cache/` → 755 or 775
- `public/uploads/` → 755 or 775

---

## 2.7 Configure public_html

**Important:** Laravel's public folder is `public/`, not the root.

### Option A: Point document root to public/
1. hPanel → **Websites** → manikstu.com → **Advanced** → **Vhosts**
2. Set document root to: `/public_html/backend/public`

### Option B: Use .htaccess redirect
Create `.htaccess` in `public_html/`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ backend/public/$1 [L]
</IfModule>
```

---

## 2.8 Verify Backend

Visit `https://api.manikstu.com/api/settings` — should return JSON.

**Troubleshooting:**
- 500 error → Check `.env` values, file permissions
- "No application key" → Run `php artisan key:generate`
- Blank page → Check `storage/logs/laravel.log`
