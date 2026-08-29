# Step 5: Final Checks & Go-Live

## Pre-Launch Checklist

### Backend (Hostinger)
- [ ] Laravel `.env` has `APP_ENV=production`
- [ ] Laravel `.env` has `APP_DEBUG=false`
- [ ] Laravel `.env` has correct `APP_URL=https://api.manikstu.com`
- [ ] Laravel `.env` has correct database credentials
- [ ] Laravel `.env` has `SESSION_DOMAIN=.manikstu.com`
- [ ] Laravel migrations have run successfully
- [ ] `php artisan key:generate` has been run
- [ ] `php artisan storage:link` has been run
- [ ] `storage/` folder is writable (755)
- [ ] `bootstrap/cache/` folder is writable (755)
- [ ] SSL is installed on Hostinger for api.manikstu.com

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL=https://api.manikstu.com/api` is set
- [ ] Project builds successfully on Vercel
- [ ] All pages load correctly
- [ ] API calls work (homepage loads data)
- [ ] SSL is active (automatic on Vercel)

### DNS (GoDaddy)
- [ ] A record `@` → `76.76.21.21` (Vercel)
- [ ] CNAME `www` → `cname.vercel-dns.com`
- [ ] A record `api` → Hostinger IP
- [ ] DNS propagation complete (check dnschecker.org)

---

## Post-Launch Verification

### Test all pages:
1. `https://manikstu.com` — Homepage loads
2. `https://manikstu.com/en/about` — About page loads
3. `https://manikstu.com/en/services` — Services page loads
4. `https://manikstu.com/en/products` — Products page loads
5. `https://manikstu.com/en/contact` — Contact form works
6. `https://manikstu.com/en/help` — Help page loads

### Test API:
1. `https://api.manikstu.com/api/settings` — Returns JSON
2. `https://api.manikstu.com/api/pages/home` — Returns page data
3. `https://api.manikstu.com/api/navigation` — Returns nav items

### Test contact form:
1. Fill out form on `/contact`
2. Submit
3. Check if enquiry is saved in database

### Test admin panel:
1. Visit `https://api.manikstu.com/admin`
2. Login with admin credentials
3. Verify dashboard loads

---

## Performance Optimization

### Backend (Laravel)
```bash
# Run these via SSH on Hostinger
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Frontend (Vercel)
- Automatic optimization by Vercel
- Enable **Edge Caching** in Vercel dashboard
- Enable **Image Optimization** (already configured)

---

## SSL Certificates

### Vercel (Frontend)
- Automatic free SSL
- No action needed

### Hostinger (Backend)
1. hPanel → **Websites** → manikstu.com → **SSL**
2. Enable **Free SSL** (Let's Encrypt)
3. Wait 15 minutes for activation
4. Force HTTPS redirect

---

## Monitoring

### Vercel Analytics
- Free tier includes basic analytics
- Enable in Vercel Dashboard → **Analytics**

### Hostinger Monitoring
- hPanel → **Websites** → manikstu.com → **Metrics**
- Check PHP errors in `storage/logs/laravel.log`

---

## Rollback Plan

If something breaks:

### Frontend:
- Vercel Dashboard → **Deployments** → click previous deployment → **"Promote to Production"**

### Backend:
- Keep a backup of working `.env`
- Keep a backup of database before changes
- File Manager → upload previous version

---

## Support Contacts

- **Hostinger Support:** hPanel → **Help** → **Chat**
- **Vercel Support:** Vercel Dashboard → **Help** → **Contact**
- **GoDaddy Support:** GoDaddy → **Help** → **Contact Us**
