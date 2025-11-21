# Implementation Plan

- [x] 1. Update Tailwind configuration with green color palette


  - Update `tailwind.config.js` to define green shades (700, 800, 900, 950)
  - Map primary color to green-700 (#147538)
  - Map secondary color to green-800 (#0D4E25)
  - Add accent colors for green-900 (#072713) and green-950 (#04160A)
  - Remove or alias old blue color values
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1_








- [ ] 2. Update global styles and utility classes
  - Update `.btn-primary` class to use new green colors in `src/index.css`
  - Update `.btn-secondary` class to use new green colors
  - Update `.btn-outline` class to use new green colors
  - Update `.hero-overlay` gradient to use green shades
  - Update scrollbar colors (`::-webkit-scrollbar-thumb`) to use green


  - Update selection color (`::selection`) to use green
  - Update `.hover-border-effect` to use green


  - Standardize `.section-padding` to use consistent values (py-16 md:py-20 lg:py-24)



  - _Requirements: 2.5, 3.1, 5.2, 5.4_

- [x] 3. Migrate Header component


  - Update Header background from blue to green (`bg-primary`)





  - Update top bar background to green-800 (`bg-primary-dark`)
  - Update hover states for contact links to use green
  - Update social media icon hover colors to green
  - Replace all icons with FontAwesome icons from `react-icons/fa`:
    - Phone: `FaPhone` with `text-sm mr-2`
    - Email: `FaEnvelope` with `text-sm mr-2`


    - Location: `FaMapMarkerAlt` with `text-sm mr-2`
    - Social media: `FaFacebookF`, `FaTwitter`, `FaInstagram`, `FaLinkedinIn` with `text-base`
    - Mobile menu toggle: `FaBars` and `FaTimes` with `text-xl`
  - Update mobile menu button hover background to green
  - Standardize padding: main header to `py-4`, top bar to `py-2`
  - Ensure consistent spacing around logo and navigation items
  - Ensure consistent icon spacing with `mr-2` or `ml-2`
  - _Requirements: 2.1, 3.5, 4.1, 7.1, 7.2, 8.1, 8.2, 8.3, 8.5_

- [ ] 4. Migrate Navigation component
  - Update navigation link colors to work with green header



  - Add FontAwesome dropdown indicators: `FaChevronDown` with `text-xs ml-1`
  - Update hover states to use green shades
  - Update dropdown menu backgrounds to use green palette
  - Update active link indicators to use green
  - Standardize spacing between navigation items
  - Standardize padding for dropdown items
  - Ensure consistent icon sizing at `text-base` for any navigation icons
  - _Requirements: 2.2, 3.5, 4.4, 7.2, 8.2, 8.5_

- [ ] 5. Migrate Hero component
  - Update background fallback to green (`bg-primary`)
  - Update overlay gradient to use green shades (`from-primary/90 to-primary-dark/80`)
  - Update icon colors from blue to green (`text-secondary`)
  - Replace feature icons with FontAwesome icons:
    - Use appropriate icons like `FaGraduationCap`, `FaTrophy`, `FaUsers`, `FaBook`
    - Size feature icons at `text-4xl md:text-5xl`
    - Add `mb-4` spacing below icons in feature cards
  - Add FontAwesome arrow icons to CTA buttons: `FaArrowRight` or `FaChevronRight` with `ml-2`
  - **Improve banner text visibility:**
    - Add strong text shadows to title and subtitle for better readability
    - Use multiple layered shadows (e.g., `0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)`)
    - Ensure white text is clearly visible against green backgrounds
    - Consider adding custom CSS classes for enhanced text shadows
  - Update button colors to use new green palette
  - Update hover states for buttons and cards to use green
  - Update feature card hover backgrounds to green
  - Improve spacing: title margin to `mb-8`, subtitle to `mb-10 md:mb-14`
  - Update CTA button gap to `gap-6`
  - Standardize feature card padding to `p-8` and gap to `gap-8`
  - Update feature cards top margin to `mt-20 md:mt-24`
  - _Requirements: 2.3, 2.5, 3.1, 3.2, 3.4, 4.1, 4.6, 7.1, 8.4, 8.5_



- [ ] 6. Migrate Footer component
  - Update main footer background to green (`bg-primary`)
  - Replace all icons with FontAwesome icons:
    - Phone: `FaPhone` with `text-base mr-3`
    - Email: `FaEnvelope` with `text-base mr-3`
    - Location: `FaMapMarkerAlt` with `text-base mr-3`
    - Social media: `FaFacebookF`, `FaTwitter`, `FaInstagram`, `FaLinkedinIn` with `text-xl`
    - Newsletter button: `FaPaperPlane` icon
  - Update bottom footer background to green-800 (`bg-primary-dark`)
  - Update social icon hover colors to green
  - Update link hover states to use green



  - Update newsletter button to use green palette
  - Update newsletter input focus ring to green
  - Standardize section padding to `py-16 md:py-20`
  - Ensure consistent icon sizing and spacing
  - Update column gaps to `gap-10 md:gap-12`
  - Update list item spacing to `space-y-4`
  - Standardize newsletter form spacing
  - _Requirements: 2.4, 2.5, 3.1, 3.2, 3.3, 4.1, 7.1, 8.2, 8.3, 8.5_

- [x] 7. Migrate MobileMenu component
  - Update mobile menu background to use green
  - Update menu item hover states to use green
  - Update active link indicators to use green
  - Add FontAwesome icons for menu items if applicable
  - Standardize spacing between menu items
  - Ensure smooth transitions use green colors
  - _Requirements: 2.2, 3.5, 7.4, 8.2_



- [ ] 8. Migrate page components (Home, About, Academics, etc.)
  - Update any page-specific color overrides to use green
  - Update section backgrounds that use primary colors
  - Update call-to-action buttons to use green palette
  - Replace all icons with appropriate FontAwesome icons:
    - Home: `FaUsers`, `FaGraduationCap`, `FaTrophy`, `FaAward`, `FaBook`, `FaFlask`
    - About: `FaBullseye`, `FaEye`, `FaHeart`, `FaCalendarAlt`, `FaClock`
    - Academics: `FaCalculator`, `FaAtom`, `FaGlobe`, `FaLanguage`, `FaCertificate`, `FaMedal`
    - Student Life: `FaMusic`, `FaPalette`, `FaRunning`, `FaChess`, `FaUsers`, `FaHandsHelping`
    - Contact: `FaPhone`, `FaEnvelope`, `FaMapMarkerAlt`, `FaUser`, `FaComment`
    - Gallery: `FaArrowLeft`, `FaArrowRight`, `FaTimes` for lightbox navigation
  - Ensure consistent icon sizing based on context (text-base to text-4xl)
  - Standardize section spacing across all pages
  - Update any inline color styles to use Tailwind classes
  - Ensure consistent icon spacing (mr-2, ml-2, mb-4, etc.)
  - _Requirements: 2.5, 3.1, 5.2, 5.4, 8.1, 8.3, 8.4, 8.5_

- [ ] 9. Migrate NotFound and ServerError pages
  - Update error code styling (404, 500) to use green
  - Update button backgrounds to green
  - Update icon colors to green
  - Update link hover states to green


  - Update border colors to green
  - _Requirements: 2.5, 4.4, 7.1, 7.2_

- [ ] 10. Migrate portal components (Past Papers Portal)
  - Update AuthenticationGate colors to green
  - Update FilterPanel active states to green


  - Update PaperCard hover states and icons to green
  - Update SearchBar focus states to green
  - Update bookmark icon colors to green
  - Update view mode toggle active states to green
  - _Requirements: 2.5, 4.4, 7.1, 7.2_



- [ ] 11. Migrate shared components
  - Update TabbedContent active tab indicator to green
  - Update SearchOverlay selected result background to green
  - Replace Accordion expand/collapse icons with FontAwesome: `FaChevronDown` or `FaChevronUp`
  - Update BackToTop button to use green and add FontAwesome icon: `FaArrowUp` or `FaChevronUp`
  - Replace SearchOverlay search icon with FontAwesome: `FaSearch`
  - Update ProgressBar color to green
  - **Improve Breadcrumbs visibility:**
    - Update link colors to `text-neutral-700` for better contrast
    - Update hover states to `hover:text-primary` (green-700)
    - Ensure current page text uses `text-neutral-900` with `font-semibold`
    - Replace Font Awesome class icon with `FaHome` from react-icons
    - Verify contrast ratios meet WCAG AA standards (4.5:1)
  - Update any other shared components with color references
  - Ensure all icons use consistent sizing and spacing
  - _Requirements: 2.5, 4.7, 7.1, 7.2, 8.1, 8.5_

- [ ] 12. Update responsive spacing across all components
  - Review and standardize mobile spacing (py-12 md:py-16)


  - Review and standardize tablet spacing (py-16 md:py-20)
  - Review and standardize desktop spacing (py-20 lg:py-24)
  - Ensure spacing increases or stays same at larger breakpoints
  - Test touch targets on mobile have adequate spacing
  - _Requirements: 3.1, 6.1, 6.2, 6.3, 6.5_

- [ ] 13. Verify accessibility and contrast ratios
  - Test white text on green-700 background (should pass WCAG AA)
  - Test green-700 text on white background (should pass WCAG AA)



  - Test all button text/background combinations
  - Test all link colors for sufficient contrast
  - Update any failing combinations to meet WCAG AA standards
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 14. Verify icon consistency across all components
  - Audit all components to ensure only FontAwesome icons from `react-icons/fa` are used
  - Verify all icons use Tailwind text size classes (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-4xl, text-5xl)
  - Check that icon spacing is consistent (mr-2, ml-2, mb-4, gap-2, etc.)
  - Ensure contact info icons are consistent across Header, Footer, and Contact page
  - Ensure social media icons are consistent across Header and Footer
  - Remove any non-FontAwesome icon libraries or custom SVG icons
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 15. Remove legacy color references
  - Search for and remove any hardcoded blue hex values (#19467E, #0D3F2F)
  - Search for and remove any inline style color definitions
  - Verify all colors reference Tailwind classes
  - Remove or update any styled-components with old colors
  - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [ ] 16. Test transitions and animations
  - Verify all button hover transitions are smooth (200-400ms)
  - Verify all link hover transitions are smooth
  - Verify navigation menu animations use green colors
  - Verify all color transitions use appropriate duration
  - Test that transitions feel polished and responsive
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 18. Cross-browser and responsive testing
  - Test on Chrome (verify green colors and icons render correctly)
  - Test on Firefox (verify green colors and icons render correctly)
  - Test on Safari (verify green colors and icons render correctly)
  - Test on Edge (verify green colors and icons render correctly)
  - Test at mobile breakpoints (375px, 414px)
  - Test at tablet breakpoints (768px, 1024px)
  - Test at desktop breakpoints (1280px, 1920px)
  - Verify spacing works correctly at all breakpoints
  - Verify icon sizing is appropriate at all breakpoints
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.5_

- [ ] 19. Final visual review and polish
  - Review all pages for color consistency
  - Review all pages for spacing consistency
  - Review all pages for icon consistency
  - Verify no blue colors are visible anywhere
  - Verify all icons are FontAwesome icons
  - Verify all interactive elements have green hover states
  - Verify all sections have consistent vertical spacing
  - Verify icon sizing is consistent across similar contexts
  - Verify icon spacing is consistent (with text, in buttons, etc.)
  - Check for any visual regressions or layout issues
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_
