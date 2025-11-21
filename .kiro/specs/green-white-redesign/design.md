# Design Document

## Overview

This design document outlines the approach for redesigning the Harding Secondary School website to use a green and white color scheme with improved spacing consistency. The redesign will replace the current blue-based palette (#19467E primary, #00A651 secondary) with a cohesive green palette using shades 700-950, while maintaining all existing functionality and improving the visual hierarchy through consistent spacing.

The implementation will follow a systematic approach:
1. Update the Tailwind configuration with the new green color palette
2. Migrate all components from the old color scheme to the new green palette
3. Standardize spacing across all components using a consistent scale
4. Standardize icon usage by implementing FontAwesome icons consistently
5. Ensure accessibility standards are met for color contrast
6. Maintain responsive behavior across all breakpoints

## Architecture

### Color System Architecture

The new color system will be centralized in `tailwind.config.js` and will replace the existing `primary` and `secondary` color definitions. The architecture follows these principles:

1. **Single Source of Truth**: All colors defined in Tailwind configuration
2. **Semantic Naming**: Colors named by their role (primary, secondary, accent) rather than appearance
3. **Shade System**: Green colors organized in a 700-950 scale for flexibility
4. **Utility-First**: Components use Tailwind classes rather than inline styles or styled-components

### Spacing System Architecture

The spacing system will use Tailwind's default spacing scale (based on 0.25rem increments) with custom extensions where needed. Key spacing zones:

1. **Component Internal Spacing**: Padding within components (p-4, p-6, p-8)
2. **Component External Spacing**: Margins between components (mb-8, mb-12, mb-16)
3. **Section Spacing**: Large vertical spacing between page sections (py-16, py-24, py-32)
4. **Grid Gaps**: Spacing in grid and flex layouts (gap-4, gap-6, gap-8)

### Icon System Architecture

The icon system will standardize on FontAwesome icons from the `react-icons` library (already installed). Key principles:

1. **Consistent Library**: Use FontAwesome icons exclusively (from `react-icons/fa`)
2. **Semantic Naming**: Choose icons that clearly represent their function
3. **Size Consistency**: Use standardized icon sizes (text-base, text-lg, text-xl, text-2xl)
4. **Spacing Standards**: Maintain consistent spacing between icons and text
5. **Color Integration**: Icons inherit text colors or use explicit green palette colors

### Migration Strategy

The migration will follow a component-by-component approach:
1. Layout components first (Header, Footer, Navigation)
2. Shared components (Hero, buttons, cards)
3. Page-specific components
4. Utility classes in index.css
5. Icon standardization across all components

## Components and Interfaces

### 1. Tailwind Configuration (`tailwind.config.js`)

**Interface:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#147538',  // green-700
          light: '#1a8f45',    // Lighter variant
          dark: '#0D4E25',     // green-800
        },
        secondary: {
          DEFAULT: '#0D4E25',  // green-800
          light: '#147538',    // green-700
          dark: '#072713',     // green-900
        },
        accent: {
          success: '#147538',
          dark: '#072713',     // green-900
          darker: '#04160A',   // green-950
        },
        // Keep neutral colors unchanged
      }
    }
  }
}
```

**Responsibilities:**
- Define all green color shades (700, 800, 900, 950)
- Map semantic color names to specific shades
- Maintain backward compatibility with existing color references where possible

### 2. Global Styles (`src/index.css`)

**Updates Required:**
- Update `.btn-primary` to use new green colors
- Update `.btn-secondary` to use new green colors
- Update `.hero-overlay` gradient to use green shades
- Update scrollbar colors to use green
- Update selection colors to use green
- Standardize section padding utilities

**Interface:**
```css
.btn-primary {
  @apply px-8 py-4 bg-primary text-white font-semibold rounded-lg 
         hover:bg-primary-dark transform hover:scale-105 
         shadow-lg hover:shadow-xl transition-all duration-300;
}

.section-padding {
  @apply py-16 md:py-20 lg:py-24;
}
```

### 3. Header Component (`src/components/Header.js`)

**Color Updates:**
- Background: `bg-primary` (green-700)
- Top bar: `bg-primary-dark` (green-800)
- Hover states: `hover:text-secondary` → green-based
- Mobile menu button: Update hover background

**Spacing Updates:**
- Standardize padding: `py-3` → `py-4` for consistency
- Top bar height: Consistent `py-2`
- Logo sizing: Maintain responsive sizing but ensure consistent spacing around it
- Navigation item spacing: Standardize gap between items

**Icon Updates:**
- Phone icon: Use `FaPhone` from FontAwesome
- Email icon: Use `FaEnvelope` from FontAwesome
- Location icon: Use `FaMapMarkerAlt` from FontAwesome
- Social media icons: Use `FaFacebookF`, `FaTwitter`, `FaInstagram`, `FaLinkedinIn`
- Mobile menu toggle: Use `FaBars` and `FaTimes`
- Icon sizing: `text-sm` for top bar, consistent spacing with `mr-2` or `ml-2`

### 4. Hero Component (`src/components/Hero.js`)

**Color Updates:**
- Background fallback: `bg-primary` (green-700)
- Overlay gradient: `from-primary/90 to-primary-dark/80` (green gradient)
- Icon colors: `text-secondary` → green-based
- Button colors: Use new green palette
- Hover states: Update to green shades

**Spacing Updates:**
- Title margin: `mb-6` → `mb-8` for better breathing room
- Subtitle margin: `mb-8 md:mb-12` → `mb-10 md:mb-14`
- CTA button gap: `gap-4` → `gap-6`
- Feature cards: Standardize padding to `p-8`
- Feature cards gap: `gap-6` → `gap-8`
- Top margin for features: `mt-16 md:mt-20` → `mt-20 md:mt-24`

**Icon Updates:**
- Feature icons: Use appropriate FontAwesome icons (e.g., `FaGraduationCap`, `FaTrophy`, `FaUsers`, `FaBook`)
- Icon sizing: `text-4xl md:text-5xl` for feature cards
- Icon spacing: `mb-4` below icons in feature cards
- Button icons: Use `FaArrowRight` or `FaChevronRight` for CTAs with `ml-2` spacing

### 5. Footer Component (`src/components/Footer.js`)

**Color Updates:**
- Main footer: `bg-primary` (green-700)
- Bottom footer: `bg-primary-dark` (green-800)
- Hover states: `hover:bg-secondary` → green-based
- Social icons: Update hover colors to green
- Newsletter button: Use green palette

**Spacing Updates:**
- Section padding: Standardize to `py-16 md:py-20`
- Column gaps: `gap-12` → `gap-10 md:gap-12`
- List item spacing: `space-y-3` → `space-y-4`
- Newsletter form spacing: Standardize input and button gaps

**Icon Updates:**
- Phone icon: `FaPhone` with `mr-3` spacing
- Email icon: `FaEnvelope` with `mr-3` spacing
- Location icon: `FaMapMarkerAlt` with `mr-3` spacing
- Social media icons: `FaFacebookF`, `FaTwitter`, `FaInstagram`, `FaLinkedinIn`
- Social icon sizing: `text-xl` with consistent spacing in flex container
- Newsletter icon: `FaPaperPlane` on submit button

### 6. Navigation Component (`src/components/Navigation.js`)

**Color Updates:**
- Link colors: Update to work with green header background
- Hover states: Use green shades
- Dropdown backgrounds: Use green palette
- Active link indicators: Green-based

**Spacing Updates:**
- Link padding: Standardize horizontal and vertical padding
- Dropdown item spacing: Consistent padding
- Gap between navigation items: Standardize

**Icon Updates:**
- Dropdown indicators: Use `FaChevronDown` for menu items with dropdowns
- Icon sizing: `text-xs` for dropdown indicators
- Icon spacing: `ml-1` after link text
- Navigation icons (if applicable): Consistent sizing at `text-base`

### 7. Button Utilities

**Updates Required:**
- `.btn-primary`: Green background with darker green hover
- `.btn-secondary`: Secondary green with appropriate hover
- `.btn-outline`: Green border with green hover background
- Ensure all buttons have consistent padding (px-8 py-4 for large, px-6 py-3 for medium)

**Icon Integration:**
- Buttons with icons: Use `flex items-center gap-2` for icon + text layout
- Icon sizing in buttons: `text-base` or `text-lg` depending on button size
- Icon position: Typically after text for CTAs (e.g., arrow right), before text for actions (e.g., download)

### 8. Page Components

**Icon Updates Across Pages:**

**Home Page:**
- Statistics section: Use `FaUsers`, `FaGraduationCap`, `FaTrophy`, `FaAward`
- Features: Use `FaBook`, `FaFlask`, `FaTheaterMasks`, `FaFutbol`

**About Page:**
- Mission/Vision: Use `FaBullseye`, `FaEye`, `FaHeart`
- History timeline: Use `FaCalendarAlt`, `FaClock`

**Academics Page:**
- Subjects: Use `FaCalculator`, `FaAtom`, `FaGlobe`, `FaLanguage`
- Programs: Use `FaCertificate`, `FaMedal`

**Student Life Page:**
- Activities: Use `FaMusic`, `FaPalette`, `FaRunning`, `FaChess`
- Clubs: Use `FaUsers`, `FaHandsHelping`

**Contact Page:**
- Contact methods: Use `FaPhone`, `FaEnvelope`, `FaMapMarkerAlt`
- Form fields: Use `FaUser`, `FaEnvelope`, `FaComment` as field icons

**Gallery Page:**
- Filter buttons: Use category-specific icons
- Navigation: Use `FaArrowLeft`, `FaArrowRight`, `FaTimes` for lightbox

## Data Models

No new data models are required. This is a visual redesign that maintains all existing data structures and component props.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Color Consistency Across Components

*For any* component that renders with a background color, the background color should be one of the defined green shades (700, 800, 900, 950) or white, and should not reference the old blue color values (#19467E, #0D3F2F).

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 2: Tailwind Class Usage

*For any* component file, all color styling should use Tailwind utility classes (e.g., `bg-primary`, `text-white`) rather than inline styles with hex color codes.

**Validates: Requirements 5.2, 5.3, 5.4**

### Property 3: Spacing Consistency Within Component Types

*For any* set of similar components (e.g., all section containers, all cards, all buttons), the padding and margin values should be consistent across instances of the same component type.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 4: Color Contrast Accessibility

*For any* text element rendered on a colored background, the contrast ratio between the text color and background color should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 5: Responsive Spacing Preservation

*For any* component that uses responsive spacing classes (e.g., `py-16 md:py-20 lg:py-24`), the spacing should increase or stay the same at larger breakpoints, never decrease.

**Validates: Requirements 6.1, 6.2, 6.3, 6.5**

### Property 6: Transition Smoothness

*For any* interactive element (button, link, hover state), when a color change occurs, the transition duration should be between 200ms and 400ms for optimal perceived smoothness.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 7: Configuration Centralization

*For any* color value used in the application, it should be defined in `tailwind.config.js` and referenced through Tailwind classes, with no hardcoded color values in component files.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 8: Icon Consistency

*For any* icon displayed in the application, it should be a FontAwesome icon imported from `react-icons/fa`, and should have consistent sizing using Tailwind text size classes (text-sm, text-base, text-lg, text-xl, text-2xl, etc.).

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

## Error Handling

### Color Migration Errors

**Issue**: Components may reference old color class names that no longer exist
**Solution**: 
- Maintain backward compatibility by keeping old color names as aliases during migration
- Use find-and-replace to systematically update all color references
- Test each component after migration to ensure no broken styles

### Contrast Ratio Failures

**Issue**: Some text/background combinations may not meet WCAG AA standards
**Solution**:
- Use online contrast checkers during design phase
- Adjust text colors (use white on dark green, dark green on white)
- Add semi-transparent overlays where needed for image backgrounds
- Test with accessibility tools after implementation

### Spacing Inconsistencies

**Issue**: Different developers may have used different spacing values
**Solution**:
- Document standard spacing scale in design system
- Use consistent Tailwind classes (multiples of 4: p-4, p-6, p-8, p-12, p-16)
- Review all components systematically
- Create spacing guidelines for future development

### Responsive Breakpoint Issues

**Issue**: Spacing may look incorrect at certain breakpoints
**Solution**:
- Test at all standard breakpoints (mobile, tablet, desktop)
- Use responsive Tailwind classes appropriately
- Ensure spacing scales proportionally with screen size
- Use browser dev tools to test edge cases

## Testing Strategy

### Unit Testing

Unit tests will verify specific color and spacing implementations:

1. **Tailwind Configuration Tests**
   - Verify green color shades are defined correctly
   - Verify old blue colors are removed or aliased
   - Verify spacing scale is properly extended

2. **Component Rendering Tests**
   - Test that Header renders with green background
   - Test that buttons use green color classes
   - Test that Footer renders with green backgrounds
   - Test that hover states apply green colors
   - Test that icons render from FontAwesome library

3. **CSS Class Tests**
   - Verify `.btn-primary` uses green colors
   - Verify `.hero-overlay` uses green gradient
   - Verify scrollbar uses green colors

4. **Icon Tests**
   - Verify Header uses FontAwesome icons for contact info
   - Verify Footer uses FontAwesome icons for social media
   - Verify Hero uses FontAwesome icons for features
   - Verify icons have consistent sizing classes

### Property-Based Testing

Property-based tests will verify universal correctness properties:

1. **Color Consistency Test** (Property 1)
   - Generate random component instances
   - Verify all background colors are from approved palette
   - Verify no old blue colors are present

2. **Tailwind Class Usage Test** (Property 2)
   - Parse all component files
   - Verify no inline style color definitions
   - Verify all colors use Tailwind classes

3. **Spacing Consistency Test** (Property 3)
   - Identify component types (buttons, cards, sections)
   - Verify consistent spacing within each type
   - Check for spacing outliers

4. **Contrast Ratio Test** (Property 4)
   - Generate text/background combinations
   - Calculate contrast ratios
   - Verify all combinations meet WCAG AA (4.5:1)

5. **Responsive Spacing Test** (Property 5)
   - Parse responsive spacing classes
   - Verify spacing increases or stays same at larger breakpoints
   - Check for logical progression

6. **Transition Duration Test** (Property 6)
   - Identify all transition definitions
   - Verify durations are between 200-400ms
   - Check for consistency across similar elements

7. **Configuration Centralization Test** (Property 7)
   - Scan all files for hex color codes
   - Verify colors are only defined in tailwind.config.js
   - Check for hardcoded values

8. **Icon Consistency Test** (Property 8)
   - Parse all component files for icon imports
   - Verify all icons are from `react-icons/fa` (FontAwesome)
   - Verify icons use Tailwind text size classes
   - Check for consistent spacing around icons

### Integration Testing

Integration tests will verify the complete user experience:

1. **Visual Regression Testing**
   - Capture screenshots before and after migration
   - Compare layouts to ensure no breaking changes
   - Verify color changes are applied correctly

2. **Accessibility Testing**
   - Run automated accessibility audits (Lighthouse, axe)
   - Verify color contrast meets standards
   - Test with screen readers

3. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify colors render consistently
   - Check for CSS compatibility issues

4. **Responsive Testing**
   - Test at mobile (375px, 414px)
   - Test at tablet (768px, 1024px)
   - Test at desktop (1280px, 1920px)
   - Verify spacing and colors work at all sizes

### Manual Testing Checklist

- [ ] All pages load without style errors
- [ ] Header displays green background
- [ ] Navigation hover states use green
- [ ] Hero section uses green overlay
- [ ] Buttons use green color scheme
- [ ] Footer uses green backgrounds
- [ ] Social icons hover to green
- [ ] Forms use green focus states
- [ ] Cards have consistent spacing
- [ ] Sections have consistent vertical spacing
- [ ] Text is readable on all backgrounds
- [ ] Transitions are smooth (200-400ms)
- [ ] Mobile menu uses green colors
- [ ] Responsive spacing works at all breakpoints
- [ ] No blue colors visible anywhere
- [ ] All icons are FontAwesome icons
- [ ] Icons have consistent sizing across similar contexts
- [ ] Icon spacing is consistent (with text, in buttons, etc.)
- [ ] Contact info displays appropriate icons (phone, email, location)
- [ ] Social media uses correct FontAwesome brand icons
- [ ] Accessibility audit passes

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **fast-check**: Property-based testing library for JavaScript
- **Lighthouse**: Accessibility and performance auditing
- **axe DevTools**: Accessibility testing
- **Chrome DevTools**: Visual inspection and debugging
- **Contrast Checker**: WCAG contrast ratio verification

### Test Execution Strategy

1. **Development Phase**: Run unit tests continuously during development
2. **Component Completion**: Run property-based tests after each component migration
3. **Integration Phase**: Run full integration tests after all components migrated
4. **Pre-Deployment**: Run complete test suite including manual checklist
5. **Post-Deployment**: Monitor for visual issues and user feedback

## Implementation Notes

### Color Mapping Reference

Old Color → New Color:
- `#19467E` (primary blue) → `#147538` (green-700)
- `#0D3F2F` (primary dark) → `#0D4E25` (green-800)
- `#00A651` (secondary green) → Keep as accent, but use new green-700 as primary
- New additions: `#072713` (green-900), `#04160A` (green-950)

### Spacing Standards

- **Micro spacing** (within components): 0.5rem (2), 1rem (4), 1.5rem (6)
- **Small spacing** (between related elements): 2rem (8), 3rem (12)
- **Medium spacing** (between sections): 4rem (16), 5rem (20), 6rem (24)
- **Large spacing** (major sections): 8rem (32), 10rem (40)

### Responsive Spacing Pattern

```
py-16 md:py-20 lg:py-24  // Section padding
py-12 md:py-16 lg:py-20  // Subsection padding
py-8 md:py-10 lg:py-12   // Component padding
```

### Accessibility Guidelines

- White text on green-700 or darker: ✓ Passes WCAG AA
- Green-700 text on white: ✓ Passes WCAG AA
- Green-800 text on white: ✓ Passes WCAG AAA
- Avoid green-700 text on green-800 background: Insufficient contrast
- Use white or very light colors for text on dark green backgrounds

### Icon Implementation Guidelines

**FontAwesome Icon Mapping:**

**Contact Icons:**
- Phone: `FaPhone` or `FaPhoneAlt`
- Email: `FaEnvelope`
- Location: `FaMapMarkerAlt`
- Fax: `FaFax`

**Social Media Icons:**
- Facebook: `FaFacebookF` (compact) or `FaFacebook`
- Twitter: `FaTwitter`
- Instagram: `FaInstagram`
- LinkedIn: `FaLinkedinIn` (compact) or `FaLinkedin`
- YouTube: `FaYoutube`

**Navigation & UI Icons:**
- Menu: `FaBars`
- Close: `FaTimes`
- Dropdown: `FaChevronDown`
- Arrow Right: `FaArrowRight` or `FaChevronRight`
- Arrow Left: `FaArrowLeft` or `FaChevronLeft`
- Search: `FaSearch`

**Academic & Feature Icons:**
- Education: `FaGraduationCap`, `FaBook`, `FaBookOpen`
- Science: `FaFlask`, `FaAtom`, `FaMicroscope`
- Math: `FaCalculator`, `FaSquareRootAlt`
- Arts: `FaPalette`, `FaMusic`, `FaTheaterMasks`
- Sports: `FaFutbol`, `FaBasketballBall`, `FaRunning`
- Achievement: `FaTrophy`, `FaMedal`, `FaAward`
- Community: `FaUsers`, `FaHandsHelping`, `FaHeart`

**Icon Sizing Standards:**
- Extra small (inline text): `text-xs` (12px)
- Small (top bar, inline): `text-sm` (14px)
- Base (body text, buttons): `text-base` (16px)
- Large (section icons): `text-lg` (18px) to `text-xl` (20px)
- Extra large (feature cards): `text-2xl` (24px) to `text-4xl` (36px)
- Hero features: `text-4xl md:text-5xl` (36px to 48px)

**Icon Spacing Standards:**
- Icon before text: `mr-2` (8px) or `mr-3` (12px)
- Icon after text: `ml-2` (8px) or `ml-3` (12px)
- Icon in button: `gap-2` (8px) on flex container
- Icon in list: `mr-3` (12px) or `mr-4` (16px)
- Icon below (feature cards): `mb-4` (16px) or `mb-6` (24px)

### Browser Compatibility

All green colors and Tailwind classes are compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

No special fallbacks needed for the color changes.

FontAwesome icons from `react-icons` are SVG-based and compatible with all modern browsers.
