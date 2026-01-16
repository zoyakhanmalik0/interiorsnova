# Interiors Nova - Complete Link Map & Navigation Structure

## Project Files & Pages

### Main Pages
- **index.html** - Home page with hero, categories, featured products, bed sets, dining tables, and why choose us sections
- **faq.html** - Frequently Asked Questions page
- **privacy-policy.html** - Privacy Policy legal page
- **terms-conditions.html** - Terms & Conditions legal page
- **refund-return.html** - Refund & Return Policy legal page

### Partial Files (Auto-loaded via load-partials.js)
- **partials/header.html** - Site header with navigation and branding
- **partials/footer.html** - Site footer with links and floating chat

---

## Navigation Links Structure

### Header Navigation (partials/header.html)
```
Logo/Brand → index.html
Home → index.html
About Us → index.html#categories
Shop → index.html#featured
Blogs → faq.html
Contact Us → index.html#contact (floating chat button)
```

### Footer Quick Links (partials/footer.html)
```
Shop → index.html#featured
Blog → faq.html
About Us → index.html#categories
Contact Us → index.html#contact
```

### Footer Information Links (partials/footer.html)
```
FAQs → faq.html
Privacy Policy → privacy-policy.html
Terms & Conditions → terms-conditions.html
Refund and Return → refund-return.html
```

### Social Media Links (partials/footer.html)
```
Facebook → https://www.facebook.com (opens in new tab)
Instagram → https://www.instagram.com (opens in new tab)
TikTok → https://www.tiktok.com (opens in new tab)
```

### Floating Chat Button (partials/footer.html)
```
WhatsApp → https://wa.me/923025289473
Call → tel:+923025289473
```

---

## Index.html Sections & Internal Links

### Hero Section Buttons
- Shop Now → #featured
- Explore → #categories
- View Collection → #featured

### CTA Buttons
- Discovery now (Promo section) → #featured
- Discovery now (Why Choose Us section) → #featured
- More Products (Bed Set) → #featured
- More Products (Dining Table) → #featured

### Section IDs (for anchor navigation)
```
#heroSlider - Hero slider section
#heroDots - Hero navigation dots
#categories - Shop by Categories section
#featured - Featured Products section
#bedset - Bed Set section
#diningtable - Dining Table section
#contact - Contact section (footer floating buttons)
```

### Product Links
- All "Order Via WhatsApp" buttons → Trigger JavaScript handler with product details
- Sends message to +923025289473 via WhatsApp

---

## FAQ.html Links

### CTA Button
- Back to Home → index.html

---

## Legal Pages Links (privacy-policy.html, terms-conditions.html, refund-return.html)

### Contact Information
- **Email**: interiorsnova.store@gmail.com
- **Phone**: +923025289473
- **WhatsApp**: +923025289473

---

## Contact Methods

### WhatsApp
- Floating button in footer: https://wa.me/923025289473
- Product order buttons: Uses JavaScript to pre-fill message
- Direct link: https://wa.me/923025289473

### Phone Call
- Floating button in footer: tel:+923025289473
- Direct number: +923025289473

### Email
- interiorsnova.store@gmail.com

---

## Stylesheet Links

All pages import:
```html
<link rel="stylesheet" href="styles.css" />
```

Specific page stylesheets:
- faq.html → faq.css
- privacy-policy.html, terms-conditions.html, refund-return.html → legal.css

---

## Script Files

All pages load:
- load-partials.js (loads header & footer from partials)
- script.js (main functionality)

FAQ page additionally loads:
- faq.js (accordion functionality)

---

## Link Verification Checklist

✅ **Header Navigation** - All working
- Home, About Us, Shop, Blogs, Contact buttons functional
- Brand logo links to index.html

✅ **Footer Navigation** - All working
- Quick Links: Shop, Blog, About Us, Contact
- Information Links: FAQs, Privacy Policy, Terms, Refund & Return
- Social Links: Facebook, Instagram, TikTok (opens in new tabs)

✅ **Floating Chat** - All working
- WhatsApp button: https://wa.me/923025289473
- Call button: tel:+923025289473

✅ **Product Links** - All working
- Order Via WhatsApp buttons: JavaScript handled, sends to +923025289473

✅ **Internal Navigation** - All working
- All section IDs present and linked correctly
- All CTA buttons point to valid sections or pages

✅ **Legal Pages** - All working
- Privacy Policy, Terms & Conditions, Refund & Return
- All contain correct contact information
- All link back to home page through header

✅ **Contact Information** - All consistent
- Email: interiorsnova.store@gmail.com
- Phone: +923025289473
- WhatsApp: +923025289473

---

## Files Modified

1. **partials/header.html**
   - Updated logo link: # → index.html
   - Updated navigation links to point to actual pages/sections

2. **partials/footer.html**
   - Updated Quick Links with proper paths
   - Updated Information Links with proper page paths
   - Updated social media links with https URLs and target="_blank"
   - Updated WhatsApp: https://wa.me/ → https://wa.me/923025289473
   - Updated Call: tel:+92XXXXXXXXXX → tel:+923025289473

3. **faq.html**
   - Updated CTA button: # → index.html

4. **script.js**
   - Updated WhatsApp phone: 923000000000 → 923025289473

---

**Project Status**: ✅ ALL LINKS VERIFIED AND WORKING
**Last Updated**: January 16, 2026
