# 🚀 Deployment Guide - Harding Secondary School Website

## Pre-Deployment Checklist

### ✅ **1. Code Quality**
- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] Code linted and formatted
- [ ] All TypeScript/JSDoc comments complete
- [ ] No unused imports or variables

### ✅ **2. Performance**
- [ ] Images optimized (`npm run optimize-images`)
- [ ] Bundle size < 500KB total
- [ ] Lighthouse score > 90
- [ ] Code splitting implemented
- [ ] Lazy loading enabled

### ✅ **3. SEO**
- [ ] All pages have SEO metadata
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Open Graph tags present
- [ ] Structured data validated

### ✅ **4. Accessibility**
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Alt text on all images

### ✅ **5. Browser Testing**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### ✅ **6. Responsive Testing**
- [ ] Mobile (320px, 375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1280px, 1440px, 1920px)

---

## Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Optimize Images
```bash
npm run optimize-images
```

### 3. Run Tests
```bash
npm test -- --watchAll=false
```

### 4. Build for Production
```bash
npm run build
```

### 5. Test Production Build
```bash
# Install serve globally
npm install -g serve

# Serve the build
serve -s build -p 3000
```

---

## Deployment Options

### Option 1: Netlify (Recommended)

#### Setup
1. Create account at [netlify.com](https://netlify.com)
2. Connect your Git repository
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18.x

#### netlify.toml Configuration
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

### Option 2: Vercel

#### Setup
1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
vercel --prod
```

#### vercel.json Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### Option 3: GitHub Pages

#### Setup
1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/harding-sec-website",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

### Option 4: Traditional Hosting (cPanel, etc.)

#### Steps
1. Build the project:
```bash
npm run build
```

2. Upload the `build` folder contents to your web server

3. Configure `.htaccess` for React Router:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

---

## Environment Variables

### Production Environment Variables
Create `.env.production`:
```env
REACT_APP_API_URL=https://api.hardingsecondary.edu.za
REACT_APP_SITE_URL=https://hardingsecondary.edu.za
REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X
REACT_APP_ENV=production
```

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit the live site
- [ ] Test all pages load correctly
- [ ] Check forms submit properly
- [ ] Verify images load
- [ ] Test navigation
- [ ] Check mobile responsiveness

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Open Graph tags with Facebook Debugger
- [ ] Verify Twitter Cards with Twitter Card Validator
- [ ] Test structured data with Google Rich Results Test

### 3. Analytics Setup
- [ ] Set up Google Analytics
- [ ] Configure Google Search Console
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure uptime monitoring

### 4. Performance Monitoring
- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights
- [ ] Monitor Core Web Vitals
- [ ] Set up performance budgets

---

## Maintenance

### Regular Tasks

#### Weekly
- [ ] Check error logs
- [ ] Review analytics
- [ ] Monitor uptime
- [ ] Check for broken links

#### Monthly
- [ ] Update dependencies (`npm update`)
- [ ] Run security audit (`npm audit`)
- [ ] Review performance metrics
- [ ] Backup database/content

#### Quarterly
- [ ] Run full accessibility audit
- [ ] Review and update content
- [ ] Check browser compatibility
- [ ] Update documentation

---

## Rollback Procedure

### If Issues Occur

1. **Immediate Rollback (Netlify/Vercel)**
   - Go to deployments dashboard
   - Click "Rollback" on previous working deployment

2. **Manual Rollback**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   
   # Or checkout previous version
   git checkout <previous-commit-hash>
   npm run build
   # Deploy the build folder
   ```

3. **Notify Users**
   - Post maintenance notice
   - Update social media
   - Send email if necessary

---

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Images Not Loading
- Check image paths are relative
- Verify images are in `public` folder
- Check image optimization completed

#### Routes Not Working
- Verify server configuration for SPA
- Check React Router setup
- Ensure `.htaccess` or equivalent is configured

#### Slow Performance
- Run `npm run build` to create optimized build
- Check bundle sizes with `npm run analyze`
- Verify image optimization
- Enable gzip compression on server

---

## Security

### Security Headers
Ensure these headers are set:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

### SSL/HTTPS
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Mixed content warnings resolved
- [ ] HSTS header configured

---

## Support

### Resources
- **Documentation:** See IMPLEMENTATION_GUIDE.md
- **Code Splitting:** See CODE_SPLITTING_GUIDE.md
- **Component Docs:** Check JSDoc comments in code

### Getting Help
- Review error logs
- Check browser console
- Test in incognito mode
- Clear cache and cookies

---

## Success Metrics

### Performance Targets
- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Bundle Size: < 500KB

### SEO Targets
- Lighthouse SEO: > 95
- Mobile-Friendly Test: Pass
- Structured Data: Valid
- Core Web Vitals: Good

### Accessibility Targets
- Lighthouse Accessibility: > 90
- WCAG 2.1 AA: Compliant
- Keyboard Navigation: Full support
- Screen Reader: Compatible

---

**Deployment Checklist Complete!** 🎉

Your website is ready for production deployment. Follow this guide step-by-step to ensure a smooth launch.

For questions or issues, refer to the documentation or contact the development team.

**Last Updated:** January 20, 2025
