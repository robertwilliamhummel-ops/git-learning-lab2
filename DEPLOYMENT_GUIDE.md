# Cold Force Mechanical Inc. - Deployment & Hosting Guide

## 🚀 Going Live Checklist

### Pre-Deployment Requirements
- [ ] Domain name registered (e.g., coldforcemechanical.com)
- [ ] Web hosting account set up
- [ ] SSL certificate obtained
- [ ] Google Analytics account created
- [ ] Google Search Console account set up
- [ ] Business email addresses configured

## 🌐 Domain & Hosting Setup

### Recommended Hosting Providers
1. **SiteGround** - Excellent for small business websites
2. **Bluehost** - WordPress-friendly with good support
3. **HostGator** - Affordable with reliable uptime
4. **GoDaddy** - Popular choice with integrated services

### Domain Configuration
```
Primary Domain: coldforcemechanical.com
WWW Redirect: www.coldforcemechanical.com → coldforcemechanical.com
Email Setup: info@coldforcemechanical.com
```

## 📁 File Upload Process

### Via FTP/SFTP
```bash
# Connect to your hosting server
ftp your-domain.com
# or
sftp username@your-domain.com

# Upload files to public_html or www directory
put index.html
put about.html
put contact.html
put emergency.html
put -r assets/
put -r services/
put -r areas/
put sitemap.xml
put robots.txt
```

### Via cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to public_html directory
4. Upload all website files
5. Extract if uploaded as ZIP

## 🔧 Server Configuration

### Apache (.htaccess)
Create this file in your root directory:
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 6 months"
    ExpiresByType image/jpg "access plus 6 months"
    ExpiresByType image/jpeg "access plus 6 months"
    ExpiresByType image/gif "access plus 6 months"
    ExpiresByType image/svg+xml "access plus 6 months"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Custom error pages (optional)
ErrorDocument 404 /404.html
```

## 📊 Google Analytics Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new account for "Cold Force Mechanical Inc."
3. Set up GA4 property
4. Get your Measurement ID (G-XXXXXXXXXX)

### Step 2: Update Tracking Code
Replace `GA_TRACKING_ID` in all HTML files:
```html
<!-- Replace this in all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Step 3: Set Up Goals
Configure these conversion goals:
- Emergency phone calls
- Contact form submissions
- Service page engagement
- Quote requests

## 🔍 Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://coldforcemechanical.com`
3. Verify ownership (HTML file or DNS method)

### Step 2: Submit Sitemap
1. In Search Console, go to Sitemaps
2. Submit: `https://coldforcemechanical.com/sitemap.xml`
3. Monitor indexing status

### Step 3: Monitor Performance
- Track keyword rankings
- Monitor click-through rates
- Check for crawl errors
- Review mobile usability

## 📧 Email Configuration

### Professional Email Setup
```
Primary: info@coldforcemechanical.com
Emergency: emergency@coldforcemechanical.com
Sales: sales@coldforcemechanical.com
Support: support@coldforcemechanical.com
```

### Contact Form Processing
You'll need server-side form processing. Options:

#### Option 1: PHP Contact Form
```php
<?php
// contact-form.php
if ($_POST['name'] && $_POST['email'] && $_POST['message']) {
    $to = 'info@coldforcemechanical.com';
    $subject = 'Website Contact Form';
    $message = $_POST['message'];
    $headers = 'From: ' . $_POST['email'];
    
    mail($to, $subject, $message, $headers);
    echo 'Message sent successfully';
}
?>
```

#### Option 2: Third-Party Services
- **Formspree**: Easy form handling service
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: Client-side email sending

## 🏢 Google My Business Setup

### Step 1: Create Listing
1. Go to [Google My Business](https://business.google.com)
2. Add business: "Cold Force Mechanical Inc."
3. Category: "HVAC Contractor"
4. Add service areas (Toronto, Mississauga, Brampton, etc.)

### Step 2: Optimize Listing
- Add business description
- Upload professional photos
- Set business hours
- Add services offered
- Enable messaging
- Request customer reviews

## 📱 Mobile Optimization Verification

### Test on Multiple Devices
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Various screen sizes

### Google Mobile-Friendly Test
1. Go to [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Test your live URL
3. Fix any issues found

## 🔒 SSL Certificate Setup

### Let's Encrypt (Free)
Most hosting providers offer free SSL certificates:
1. Log into hosting control panel
2. Find SSL/TLS section
3. Enable Let's Encrypt certificate
4. Force HTTPS redirects

### Verify SSL Installation
- Check for green padlock in browser
- Test with [SSL Labs](https://www.ssllabs.com/ssltest/)
- Ensure all resources load over HTTPS

## 📈 Performance Optimization

### Image Optimization
When adding images:
```html
<!-- Use WebP format when possible -->
<img src="assets/images/hvac-service.webp" 
     alt="HVAC Service Toronto" 
     loading="lazy"
     width="400" 
     height="300">
```

### Core Web Vitals
Monitor these metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Speed Testing Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🎯 Local SEO Optimization

### NAP Consistency
Ensure consistent business information:
```
Name: Cold Force Mechanical Inc.
Address: [Your Business Address]
Phone: (416) 555-HVAC
```

### Local Citations
Submit to these directories:
- Google My Business
- Yelp
- Yellow Pages
- Better Business Bureau
- HomeAdvisor
- Angie's List

## 📊 Monitoring & Maintenance

### Weekly Tasks
- [ ] Check website functionality
- [ ] Monitor Google Analytics
- [ ] Review contact form submissions
- [ ] Check for broken links

### Monthly Tasks
- [ ] Review SEO performance
- [ ] Update content as needed
- [ ] Check site speed
- [ ] Backup website files
- [ ] Review security logs

### Quarterly Tasks
- [ ] Update service information
- [ ] Review and update meta tags
- [ ] Analyze competitor websites
- [ ] Plan content updates
- [ ] Review hosting performance

## 🚨 Emergency Procedures

### Website Down
1. Check hosting server status
2. Verify DNS settings
3. Check SSL certificate
4. Contact hosting support
5. Use backup if available

### Security Issues
1. Change all passwords immediately
2. Scan for malware
3. Update all software
4. Review access logs
5. Contact hosting provider

### Contact Form Issues
1. Test form submission
2. Check email delivery
3. Verify server-side processing
4. Test spam filtering
5. Monitor form analytics

## 📞 Support Contacts

### Technical Support
- **Hosting Provider**: [Your hosting support]
- **Domain Registrar**: [Your domain support]
- **Email Provider**: [Your email support]

### Professional Services
- **SEO Consultant**: For ongoing optimization
- **Web Developer**: For future enhancements
- **Digital Marketing**: For online advertising

## 🎉 Launch Day Checklist

### Final Pre-Launch
- [ ] All pages load correctly
- [ ] Contact forms work
- [ ] Phone numbers are clickable
- [ ] Email links work
- [ ] Navigation functions properly
- [ ] Mobile version works
- [ ] SSL certificate active
- [ ] Analytics tracking works

### Launch Day
- [ ] Announce on social media
- [ ] Update Google My Business
- [ ] Submit to search engines
- [ ] Monitor for any issues
- [ ] Test all functionality
- [ ] Celebrate! 🎉

### Post-Launch (First Week)
- [ ] Monitor analytics daily
- [ ] Check for crawl errors
- [ ] Respond to any contact forms
- [ ] Monitor site performance
- [ ] Gather initial feedback

---

**Deployment Support**: For technical assistance during deployment  
**Last Updated**: January 2024  
**Next Review**: After successful deployment