# Breadcrumb Navigation - Visual Guide

## Desktop View Examples

### Single Level Route
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  >  About Us                                        │
└─────────────────────────────────────────────────────────────┘
```

### Two Level Route
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  >  Academics  >  Grade 10                          │
└─────────────────────────────────────────────────────────────┘
```

### Three Level Route
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  >  Student Life  >  Sports  >  Rugby Team          │
└─────────────────────────────────────────────────────────────┘
```

### Deep Hierarchy (Collapsed)
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  >  Academics  >  ...  >  Grade 12  >  Mathematics  │
└─────────────────────────────────────────────────────────────┘
```

## Mobile View Examples

### Standard Mobile View
```
┌──────────────────────────────┐
│  ← Academics / Grade 10      │
└──────────────────────────────┘
```

### Back to Home
```
┌──────────────────────────────┐
│  ← Back / About Us           │
└──────────────────────────────┘
```

## Separator Styles

### Chevron (Default)
```
Home  ›  About Us  ›  History
```

### Slash
```
Home  /  About Us  /  History
```

### Arrow
```
Home  →  About Us  →  History
```

## Color Scheme

### Light Mode (Current)
- **Background**: #F8F9FA (Light Gray)
- **Border**: #E5E7EB (Gray)
- **Link Color**: #6B7280 (Neutral Gray)
- **Link Hover**: #0D3F2F (Primary Dark Green)
- **Current Page**: #111827 (Dark Gray, Bold)
- **Separator**: #9CA3AF (Light Gray)

## Interactive States

### Default State
```
🏠 Home  >  About Us  >  History
[link]      [link]      [current]
```

### Hover State (on "About Us")
```
🏠 Home  >  About Us  >  History
[link]      [underline]  [current]
            [darker]
```

### Focus State (keyboard navigation)
```
🏠 Home  >  [About Us]  >  History
[link]      [ring]        [current]
            [outline]
```

## Positioning

```
┌─────────────────────────────────────────────────────────────┐
│                    HEADER (Fixed)                            │
│  Logo              Navigation              Apply Now         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  >  About Us                    (Sticky)            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                    PAGE CONTENT                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

### Desktop (≥640px)
- Full breadcrumb trail
- All levels visible
- Horizontal layout with separators

### Mobile (<640px)
- Simplified "← Parent / Current" format
- Single line
- Truncated if needed

## Accessibility Features

### Screen Reader Announcement
```
"Breadcrumb navigation"
"Home, link"
"About Us, link"
"History, current page"
```

### Keyboard Navigation
```
Tab → Focus on "Home"
Enter → Navigate to Home
Tab → Focus on "About Us"
Enter → Navigate to About Us
Tab → Focus on next element (Current page not focusable)
```

## Schema.org Markup (Invisible to Users)

```html
<nav aria-label="Breadcrumb navigation" 
     itemscope 
     itemtype="https://schema.org/BreadcrumbList">
  <ol>
    <li itemprop="itemListElement" 
        itemscope 
        itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <!-- More items... -->
  </ol>
</nav>
```

## Usage Examples

### Basic Usage
```javascript
<Breadcrumbs />
```

### With Custom Labels
```javascript
<Breadcrumbs 
  customLabels={{
    '/about': 'About Our School',
    '/academics': 'Academic Programs'
  }}
/>
```

### With Slash Separator
```javascript
<Breadcrumbs separator="slash" />
```

### With Custom Settings
```javascript
<Breadcrumbs 
  separator="arrow"
  maxLevels={3}
  maxTitleLength={20}
/>
```

## Real-World Examples

### About Page
```
URL: /about
Display: 🏠 Home  >  About Us
```

### Academics Page
```
URL: /academics
Display: 🏠 Home  >  Academics
```

### Past Papers Portal
```
URL: /past-papers
Display: 🏠 Home  >  Past Papers Portal
```

### Student Life Page
```
URL: /student-life
Display: 🏠 Home  >  Student Life
```

### Gallery Page
```
URL: /gallery
Display: 🏠 Home  >  Gallery
```

### Contact Page
```
URL: /contact
Display: 🏠 Home  >  Contact Us
```

## Truncation Example

### Long Title (Before Truncation)
```
URL: /very-long-page-name-that-exceeds-maximum-character-limit
Display: 🏠 Home  >  Very Long Page Name That Exceeds Maximum Character Limit
```

### Long Title (After Truncation, maxTitleLength=25)
```
URL: /very-long-page-name-that-exceeds-maximum-character-limit
Display: 🏠 Home  >  Very Long Page Name Th...
Hover: Shows full title in tooltip
```

## Animation & Transitions

### Hover Transition
- Duration: 300ms
- Property: color, text-decoration
- Easing: ease-in-out

### Focus Transition
- Duration: 200ms
- Property: box-shadow (ring)
- Easing: ease-in-out

## Best Practices

1. **Always include breadcrumbs on inner pages** (not homepage)
2. **Keep breadcrumb labels concise** (under 25 characters)
3. **Use custom labels for clarity** when default formatting isn't ideal
4. **Test keyboard navigation** to ensure accessibility
5. **Verify schema markup** using Google's Rich Results Test
6. **Check mobile view** on actual devices
7. **Maintain consistent separator style** across the site

## Common Patterns

### Standard Page
```javascript
const MyPage = () => {
  return (
    <>
      <SEO {...SEOConfigs.myPage} />
      <div className="pt-16 md:pt-20">
        <Breadcrumbs />
        {/* Page content */}
      </div>
    </>
  );
};
```

### Page with Custom Labels
```javascript
const MyPage = () => {
  const customLabels = {
    '/my-page': 'My Custom Page Title'
  };
  
  return (
    <>
      <SEO {...SEOConfigs.myPage} />
      <div className="pt-16 md:pt-20">
        <Breadcrumbs customLabels={customLabels} />
        {/* Page content */}
      </div>
    </>
  );
};
```
