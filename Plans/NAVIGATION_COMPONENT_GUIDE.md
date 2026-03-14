# Navigation Component Structure Guide

## Overview
This guide documents the standardized navigation structure implemented across all desktop pages of the Cold Force Mechanical Inc. website.

## Standard Desktop Layout Structure

All desktop pages now follow this consistent structure:

```html
<!-- Top Phone Bar -->
<div class="top-phone-bar">
    <div class="container">
        <div class="phone-bar-content">
            <i class="fas fa-phone-alt phone-icon"></i>
            <span class="phone-text">24/7 Emergency Service:</span>
            <a href="tel:+14373664067" class="phone-number">(437) 366-4067</a>
            <span class="phone-cta">Call Now!</span>
        </div>
    </div>
</div>

<!-- Header -->
<header class="header" id="header">
    <nav class="nav container">
        <div class="nav__logo">
            <img src="[PATH]/Logos/IconOnly_Transparent_NoBuffer.png" alt="Cold Force Mechanical Inc. Logo" class="logo-icon">
            <a href="[PATH]/index.html" style="color: inherit; text-decoration: none;">
                <span>Cold Force Mechanical<span class="mobile-hide"> Inc.</span></span>
            </a>
        </div>
        
        <div class="nav__menu" id="nav-menu">
            <ul class="nav__list">
                <li class="nav__item">
                    <a href="[PATH]/index.html" class="nav__link [active-link]">Home</a>
                </li>
                <li class="nav__item">
                    <a href="[PATH]/services/index.html" class="nav__link [active-link]">Services</a>
                </li>
                <li class="nav__item">
                    <a href="[PATH]/areas/index.html" class="nav__link [active-link]">Service Areas</a>
                </li>
                <li class="nav__item">
                    <a href="[PATH]/about.html" class="nav__link [active-link]">About</a>
                </li>
                <li class="nav__item">
                    <a href="[PATH]/contact.html" class="nav__link [active-link]">Contact</a>
                </li>
                <li class="nav__item">
                    <a href="tel:+14373664067" class="nav__link emergency-btn">
                        <i class="fas fa-phone"></i> Emergency: (437) 366-4067
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="nav__toggle" id="nav-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </nav>
</header>
```

## Path Adjustments by Directory

### Root Directory Files (index.html, about.html, contact.html, emergency.html)
- Logo path: `Logos/IconOnly_Transparent_NoBuffer.png`
- Navigation links: Direct paths (e.g., `services/index.html`, `areas/index.html`)

### Subdirectory Files (services/, areas/)
- Logo path: `../Logos/IconOnly_Transparent_NoBuffer.png`
- Navigation links: Relative paths (e.g., `../index.html`, `../about.html`)

## CSS Classes and Styling

### Key CSS Classes
- `.top-phone-bar` - Orange gradient phone bar at top
- `.phone-bar-content` - Flex container for phone bar content
- `.phone-number` - Styled phone number link
- `.nav__logo` - Left-aligned logo and company name
- `.nav__menu` - Navigation menu container
- `.nav__list` - Horizontal navigation list
- `.nav__link` - Individual navigation links
- `.active-link` - Current page indicator
- `.emergency-btn` - Emergency button styling
- `.nav__toggle` - Mobile hamburger menu

### Mobile Responsive Behavior
- Phone bar remains visible on mobile
- Navigation collapses to hamburger menu below 768px
- Mobile menu positioned at `top: 160px` (phone bar + nav height)
- Company name truncates "Inc." on mobile with `.mobile-hide`

## Implementation Checklist

When adding a new page, ensure:

- [ ] Orange phone bar is included at the top
- [ ] Standard navigation structure is implemented
- [ ] Correct path adjustments for directory location
- [ ] Active link class is applied to current page
- [ ] Mobile hamburger menu functionality is included
- [ ] CSS file is properly linked
- [ ] Font Awesome icons are loaded

## Maintenance Notes

### Adding New Navigation Items
1. Add new `<li class="nav__item">` to all pages
2. Update mobile CSS if needed for additional items
3. Test responsive behavior across all breakpoints

### Updating Phone Number
1. Update in phone bar: `.phone-number` href and text
2. Update in emergency button: `.emergency-btn` href and text
3. Update in footer contact info across all pages

### Logo Updates
1. Replace logo file in `/Logos/` directory
2. Update alt text if company name changes
3. Test logo display across all pages and breakpoints

## Files Using This Structure

- ✅ index.html
- ✅ about.html
- ✅ contact.html
- ✅ emergency.html
- ✅ areas/index.html
- ✅ services/index.html
- ✅ services/hvac-systems.html
- ✅ services/refrigeration.html

## CSS Dependencies

The navigation structure relies on these CSS files and sections:
- `assets/css/main.css` - Main stylesheet
- Top phone bar styles (lines 125-207)
- Header and navigation styles (lines 742-966)
- Mobile responsive styles (lines 1188-1351)

## JavaScript Dependencies

Mobile menu functionality requires:
- `assets/js/main.js` - Main JavaScript file
- Hamburger menu toggle functionality
- Mobile menu show/hide classes

---

**Last Updated:** 2024-01-27  
**Version:** 1.0  
**Maintained by:** Development Team