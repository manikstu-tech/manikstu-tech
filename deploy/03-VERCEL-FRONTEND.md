# Step 3: Deploy Next.js Frontend to Vercel

## Overview
Vercel is the recommended hosting for Next.js. Free tier includes:
- Global CDN
- Automatic HTTPS
- Automatic deploys from GitHub
- Server-side rendering support
- Image optimization

---

## 3.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Sign up with **GitHub** (recommended)
3. Authorize Vercel to access your repositories

---

## 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find **manikstu-tech** repository
3. Click **"Import"**

---

## 3.3 Configure Project Settings

### Framework Preset
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)

### Environment Variables
Click **"Environment Variables"** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://api.manikstu.com/api` | Production |
| `NEXT_PUBLIC_RAZORPAY_KEY` | `rzp_live_xxxxxxx` | Production (if using payments) |

### Region
- **Preferred Region:** `sgn1` (Singapore) or `bom1` (Mumbai) — closest to India

Click **"Deploy"**

---

## 3.4 Wait for Deployment

- First deploy takes 2-3 minutes
- Vercel will give you a URL like: `manikstu-tech.vercel.app`
- **Test this URL** to make sure everything works

---

## 3.5 Add Custom Domain

1. Vercel Dashboard → your project → **"Settings"** → **"Domains"**
2. Add domain: `manikstu.com`
3. Add domain: `www.manikstu.com`

4. Vercel will show DNS configuration needed:
   ```
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

**Don't add these records yet** — we'll do this in Step 4 (GoDaddy DNS).

---

## 3.6 Configure Redirects (optional)

In your Next.js project, ensure `next.config.mjs` has:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect /get-in-touch to /contact
  async redirects() {
    return [
      {
        source: '/get-in-touch',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  
  // Image domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'manikstu.com' },
      { protocol: 'https', hostname: 'api.manikstu.com' },
    ],
  },
};

export default nextConfig;
```

---

## 3.7 Automatic Deploys

Once connected:
- **Every push to `main`** →自动 deploy to production
- **Every push to other branches** → deploy to preview URL
- **Pull requests** → deploy to preview URL with comment

---

## 3.8 Verify Frontend

1. Visit your Vercel URL (e.g., `manikstu-tech.vercel.app`)
2. Check all pages work
3. Check API calls work (homepage loads data)
4. Check images load

**Troubleshooting:**
- API calls failing → Check `NEXT_PUBLIC_API_URL` env var
- 404 on pages → Check `next.config.mjs` rewrites
- Build errors → Check build logs in Vercel dashboard
