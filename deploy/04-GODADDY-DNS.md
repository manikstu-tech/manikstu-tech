# Step 4: Configure GoDaddy DNS for manikstu.com

## Overview
Point manikstu.com to both Vercel (frontend) and Hostinger (backend API).

---

## 4.1 Access GoDaddy DNS

1. Log in to **GoDaddy** → **My Products**
2. Find **manikstu.com** → click **"DNS"** or **"Manage DNS"**

---

## 4.2 Add DNS Records

### Records to add:

| Type | Name | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| **A** | `@` | `76.76.21.21` | 600 | Points root domain to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 | Points www to Vercel |
| **A** | `api` | `<Hostinger IP>` | 600 | Points API subdomain to Hostinger |

### How to find your Hostinger IP:
1. hPanel → **Websites** → manikstu.com
2. Look for **"Shared IP Address"** or **"IP Address"**
3. Or: hPanel → **Accounts** → **Details** → **IP Address**

---

## 4.3 Step-by-Step in GoDaddy

### Add A record for root domain:
1. Click **"Add New Record"**
2. Type: `A`
3. Name: `@`
4. Value: `76.76.21.21` (Vercel's IP)
5. TTL: `600` (10 minutes)
6. Click **"Add"**

### Add CNAME for www:
1. Click **"Add New Record"**
2. Type: `CNAME`
3. Name: `www`
4. Value: `cname.vercel-dns.com`
5. TTL: `600`
6. Click **"Add"**

### Add A record for API:
1. Click **"Add New Record"**
2. Type: `A`
3. Name: `api`
4. Value: `<your Hostinger IP>` (e.g., `194.26.29.xxx`)
5. TTL: `600`
6. Click **"Add"**

---

## 4.4 Remove Conflicting Records

**Before adding new records, remove any existing:**
- A records for `@` or `manikstu.com` pointing elsewhere
- CNAME records for `www` pointing elsewhere
- Any parking page records

---

## 4.5 Verify DNS Propagation

DNS propagation takes 15 minutes to 2 hours.

### Check propagation:
1. Go to **https://dnschecker.org**
2. Enter `manikstu.com`
3. Check that A record shows `76.76.21.21`
4. Enter `www.manikstu.com`
5. Check that CNAME shows `cname.vercel-dns.com`
6. Enter `api.manikstu.com`
7. Check that A record shows your Hostinger IP

### Or use command line:
```bash
nslookup manikstu.com
nslookup www.manikstu.com
nslookup api.manikstu.com
```

---

## 4.6 Final DNS Record Set

Your GoDaddy DNS should look like this:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |
| A | api | 194.26.29.xxx | 600 |
| NS | @ | ns1.dns-parking.com | - |
| NS | @ | ns2.dns-parking.com | - |

---

## 4.7 Common Issues

### "Site can't be reached" after DNS change
- Wait 15-30 minutes for propagation
- Clear browser cache
- Try incognito mode

### SSL certificate errors
- Vercel provides free SSL automatically
- Hostinger provides free SSL via hPanel → **SSL** → **Install**

### API calls failing from frontend
- Check `api.manikstu.com` resolves correctly
- Check CORS settings on Laravel backend
- Ensure `APP_URL` in Laravel .env is `https://api.manikstu.com`
