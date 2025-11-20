# Implementation Plan

## Phase 1: Foundation & Core Infrastructure

- [x] 1. Set up animation system and utility hooks


  - Install Framer Motion and configure for project
  - Create custom hooks: useScrollDirection, useScrollPosition, useIntersectionObserver
  - Create animation utility functions for common patterns (fadeIn, slideUp, parallax calculations)
  - Set up animation configuration constants in utils/constants.js
  - _Requirements: 1.1, 1.4_

- [ ] 1.1 Write property test for scroll detection
  - **Property 1: Scroll-triggered animations activate on viewport entry**
  - **Validates: Requirements 1.1**



- [ ] 2. Create global UI state management
  - Set up React Context for toast notifications
  - Set up React Context for loading states
  - Set up React Context for modal/overlay states

  - Create custom hooks for consuming contexts (useToast, useLoading)
  - _Requirements: 6.1, 6.2, 14.4_

- [x] 3. Build SkeletonLoader component

  - Create base SkeletonLoader component with variants (text, card, image, avatar)
  - Implement pulse and wave animation options
  - Add configurable width, height, and count props
  - Style with Tailwind CSS matching design system
  - _Requirements: 1.5, 14.1_

- [x] 3.1 Write property test for skeleton loader variants

  - **Property 5: Skeleton loaders precede content**
  - **Validates: Requirements 1.5**

- [x] 4. Build ToastNotification system


  - Install and configure react-hot-toast
  - Create custom toast component matching brand design
  - Implement toast types (success, error, info, warning)
  - Add auto-dismiss timing and manual dismiss functionality
  - Configure toast positioning and max visible toasts
  - _Requirements: 6.1, 6.2_

- [x] 4.1 Write property test for toast timing

  - **Property 26: Success toast auto-dismisses**
  - **Property 27: Error toast persists until dismissed**
  - **Validates: Requirements 6.1, 6.2**

- [x] 5. Build ProgressBar component


  - Create linear progress bar component
  - Implement smooth animation from 0-90% then jump to 100%
  - Add configurable color, height, and position props
  - Integrate with React Router for page transitions
  - _Requirements: 1.3, 14.4_

- [x] 5.1 Write property test for progress bar

  - **Property 3: Navigation triggers progress indicator**
  - **Validates: Requirements 1.3**

- [x] 6. Build ErrorBoundary component


  - Create React Error Boundary wrapper
  - Design error UI matching site branding
  - Add "Reload Page" and "Go Home" actions
  - Implement error logging to console (prepare for monitoring service)
  - _Requirements: 11.3, 11.5_

- [x] 7. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Smart Navigation System

- [x] 8. Enhance Header with smart scroll behavior


  - Add scroll position and direction tracking to Header component
  - Implement header minimization at 100px scroll threshold
  - Add smooth height transition (reduce by 30%)
  - Hide/show top contact bar based on scroll state
  - Implement scroll-up restoration of full header
  - _Requirements: 2.1, 2.2_

- [x] 8.1 Write property test for header scroll behavior

  - **Property 6: Header minimizes at scroll threshold**
  - **Property 7: Header restores on upward scroll**
  - **Validates: Requirements 2.1, 2.2**

- [x] 9. Build MegaMenu component


  - Create MegaMenu component with multi-column layout
  - Implement hover trigger with 200ms delay
  - Add keyboard navigation support (Tab, Escape)
  - Style with Tailwind CSS using grid layout
  - Add smooth fade-in animation
  - Integrate with Navigation component
  - _Requirements: 2.3_

- [x] 9.1 Write property test for mega menu timing

  - **Property 8: Mega menu displays within timing constraint**
  - **Validates: Requirements 2.3**

- [x] 10. Build Breadcrumbs component


  - Create Breadcrumbs component that reads from React Router location
  - Generate breadcrumb trail from route path
  - Add home icon for root breadcrumb
  - Style with Tailwind CSS with separators
  - Add to page layout template
  - _Requirements: 2.4_

- [x] 10.1 Write property test for breadcrumb generation

  - **Property 9: Breadcrumbs reflect current route**
  - **Validates: Requirements 2.4**

- [x] 11. Build BackToTop button


  - Create floating button component
  - Implement visibility toggle at 500px scroll threshold
  - Add smooth scroll-to-top functionality
  - Style with Tailwind CSS (bottom-right position)
  - Add fade-in/out animation
  - _Requirements: 2.5_

- [x] 11.1 Write property test for back-to-top visibility

  - **Property 10: Back-to-top button appears at threshold**
  - **Validates: Requirements 2.5**



- [x] 12. Checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.





## Phase 3: Content Presentation Enhancements

- [x] 13. Build ParallaxSection component

  - Create ParallaxSection wrapper component
  - Implement parallax scroll calculations (50% speed)
  - Add configurable speed prop

  - Add gradient overlay option with configurable opacity
  - Style with Tailwind CSS

  - _Requirements: 1.4, 9.1, 9.3_

- [x] 13.1 Write property test for parallax calculations

  - **Property 4: Parallax maintains speed ratio**
  - **Property 42: Dividers have parallax effects**
  - **Validates: Requirements 1.4, 9.3**

- [x] 14. Enhance Hero component with parallax

  - Integrate ParallaxSection into existing Hero component
  - Add gradient overlay for text readability
  - Ensure backward compatibility with existing Hero usage
  - Test on Home page
  - _Requirements: 1.4, 9.1_


- [x] 15. Build CounterAnimation component

  - Create counter component with easing animation
  - Implement viewport trigger using intersection observer
  - Add configurable duration (default 2000ms)
  - Support decimal values and suffixes (%, +)
  - Style with Tailwind CSS
  - _Requirements: 3.2_

- [x] 15.1 Write property test for counter animation

  - **Property 12: Counter animations complete in specified duration**
  - **Validates: Requirements 3.2**

- [x] 16. Build Accordion component


  - Create Accordion container and AccordionItem components
  - Implement smooth height animation (300ms)
  - Add icon rotation (180deg) on expand/collapse
  - Support single-select and multi-select modes
  - Implement keyboard navigation (arrow keys)
  - Add auto-scroll to expanded item if below viewport
  - Style with Tailwind CSS
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 16.1 Write property test for accordion behavior

  - **Property 45: Accordion icons rotate on state change**
  - **Property 46: Accordion expansion timing is correct**
  - **Property 47: Single-select mode enforces exclusivity**
  - **Property 48: Expanded content scrolls into view**
  - **Property 49: Keyboard navigation works with arrow keys**
  - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**


- [ ] 17. Build TabbedContent component
  - Create Tabs container and Tab components
  - Implement smooth content transitions
  - Add active tab highlighting
  - Support keyboard navigation
  - Style with Tailwind CSS
  - _Requirements: 3.3_



- [x] 17.1 Write property test for tab transitions


  - **Property 13: Tab transitions are smooth**
  - **Validates: Requirements 3.3**

- [ ] 18. Enhance existing carousel components
  - Update testimonial carousel with 5-second auto-play
  - Add manual navigation controls
  - Implement pause on hover
  - Add smooth slide transitions
  - Ensure accessibility (ARIA labels)
  - _Requirements: 3.5_

- [ ] 18.1 Write property test for carousel timing
  - **Property 15: Carousel auto-plays at correct interval**
  - **Validates: Requirements 3.5**

- [-] 19. Implement lazy loading for images

  - Create LazyImage component wrapper
  - Implement blur-up effect (low-res → high-res)
  - Use intersection observer for loading trigger
  - Add loading skeleton placeholder
  - Handle loading errors gracefully
  - _Requirements: 3.4, 14.2_

- [ ] 19.1 Write property test for lazy loading
  - **Property 14: Lazy loading shows blur-up effect**
  - **Validates: Requirements 3.4**

- [ ] 20. Standardize card components
  - Create reusable Card component
  - Ensure consistent 24px spacing in grid layouts
  - Implement hover effects (scale, shadow 0-10px)
  - Add smooth transitions (300ms)
  - Style with Tailwind CSS (12px border-radius)
  - _Requirements: 3.1, 9.5_

- [ ] 20.1 Write property test for card consistency
  - **Property 11: Card spacing consistency**
  - **Property 44: Cards have consistent styling**
  - **Validates: Requirements 3.1, 9.5**

- [ ] 21. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 4: Gallery & Filtering System

- [ ] 22. Build FilterableGallery component
  - Create FilterableGallery container component
  - Implement category filter buttons (generated from data)
  - Add "All" filter option
  - Style filter buttons with Tailwind CSS
  - _Requirements: 4.1_

- [ ] 22.1 Write property test for filter generation
  - **Property 16: Filter buttons match available categories**
  - **Validates: Requirements 4.1**

- [ ] 23. Implement gallery filtering logic
  - Add filter state management
  - Implement smooth filtering animation (400ms)
  - Maintain grid layout consistency during filtering
  - Add fade-in/out transitions for items
  - _Requirements: 4.2, 4.3_

- [ ] 23.1 Write property test for filtering
  - **Property 17: Filtering completes within timing constraint**
  - **Property 18: Grid layout maintains consistency**
  - **Validates: Requirements 4.2, 4.3**

- [ ] 24. Integrate lightbox for gallery
  - Configure yet-another-react-lightbox for gallery
  - Add navigation controls (prev/next, close)
  - Display image metadata (title, date, category)
  - Add keyboard navigation (arrows, escape)
  - Style to match brand design
  - _Requirements: 4.4_

- [ ] 24.1 Write property test for lightbox
  - **Property 19: Lightbox opens with complete controls**
  - **Validates: Requirements 4.4**

- [ ] 25. Implement progressive loading for gallery
  - Add pagination state (12 items per page)
  - Create "Load More" button
  - Implement smooth loading animation
  - Add loading skeleton for new items
  - Handle end of items gracefully
  - _Requirements: 4.5_

- [ ] 25.1 Write property test for progressive loading
  - **Property 20: Progressive loading shows correct initial count**
  - **Validates: Requirements 4.5**

- [ ] 26. Update Gallery page with new components
  - Replace existing gallery with FilterableGallery
  - Add sample gallery data with categories
  - Test filtering and lightbox functionality
  - Ensure responsive layout
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 27. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.


## Phase 5: Forms & User Feedback

- [x] 28. Implement real-time form validation


  - Create validation utility functions
  - Add debounced validation (300ms)
  - Implement inline error message display
  - Add field-level validation rules
  - Style error states with Tailwind CSS
  - _Requirements: 6.3_

- [x] 28.1 Write property test for validation


  - **Property 28: Real-time validation displays inline**
  - **Validates: Requirements 6.3**



- [x] 29. Enhance form submission states

  - Add loading state to submit buttons
  - Disable buttons during submission
  - Show loading spinner on button
  - Implement success/error toast notifications
  - _Requirements: 6.1, 6.2, 6.4_

- [x] 29.1 Write property test for form submission

  - **Property 29: Submit button disables during submission**
  - **Validates: Requirements 6.4**



- [x] 30. Build newsletter subscription feature

  - Create newsletter form component
  - Implement email validation
  - Add submission handling (mock API for now)
  - Show confirmation toast within 2 seconds
  - Store email in local state/storage
  - _Requirements: 6.5_

- [x] 30.1 Write property test for newsletter

  - **Property 30: Newsletter confirmation within time limit**
  - **Validates: Requirements 6.5**

- [x] 31. Update Contact page with enhanced forms


  - Apply real-time validation to contact form
  - Add loading states and toast notifications
  - Improve error messaging
  - Test form submission flow
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 32. Build SearchOverlay component


  - Create full-screen search overlay
  - Add search input with auto-focus
  - Implement overlay open/close animations
  - Add close button and ESC key handler
  - Style with Tailwind CSS
  - _Requirements: 13.1_

- [x] 32.1 Write property test for search overlay

  - **Property 55: Search overlay focuses input**
  - **Validates: Requirements 13.1**

- [x] 33. Implement search auto-complete

  - Create search function (mock data for now)
  - Add debounced search (300ms)
  - Implement 3-character minimum threshold
  - Display suggestions with categories
  - Highlight matching text in results
  - _Requirements: 13.2, 13.3_



- [ ] 33.1 Write property test for auto-complete
  - **Property 56: Suggestions appear after character threshold**
  - **Property 57: Search suggestions are formatted**
  - **Validates: Requirements 13.2, 13.3**

- [x] 34. Implement search navigation

  - Add click handlers for search results
  - Navigate to pages or scroll to sections
  - Close overlay on selection
  - Add keyboard navigation (up/down, enter)
  - Handle empty results with suggestions
  - _Requirements: 13.4, 13.5_



- [ ] 34.1 Write property test for search navigation
  - **Property 58: Suggestion selection navigates**
  - **Property 59: Empty search shows alternatives**
  - **Validates: Requirements 13.4, 13.5**

- [x] 35. Add search trigger to Header

  - Add search icon to Header component
  - Connect to SearchOverlay state
  - Add keyboard shortcut (Ctrl/Cmd + K)
  - Test search functionality
  - _Requirements: 13.1_

- [ ] 36. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.



## Phase 6: Performance Optimization

- [ ] 37. Set up image optimization pipeline
  - Install sharp for build-time optimization
  - Create script to convert images to WebP

  - Generate multiple sizes for responsive images
  - Update build process to run optimization


  - _Requirements: 7.2_

- [ ] 37.1 Write property test for image formats
  - **Property 31: WebP images have fallbacks**
  - **Validates: Requirements 7.2**


- [ ] 38. Implement responsive image component
  - Create ResponsiveImage component
  - Use picture element with WebP and fallback
  - Add srcset for different sizes
  - Implement lazy loading
  - _Requirements: 7.2_


- [ ] 39. Implement code splitting
  - Add React.lazy for page components
  - Implement Suspense with loading fallback
  - Configure webpack for optimal chunking
  - Verify chunk sizes are under 200KB
  - _Requirements: 7.5_

- [ ] 39.1 Write property test for bundle sizes
  - **Property 34: Bundle chunks respect size limits**
  - **Validates: Requirements 7.5**

- [ ] 40. Optimize critical CSS
  - Identify above-the-fold styles
  - Extract critical CSS for inline inclusion
  - Configure build to inline critical CSS
  - Test first paint performance
  - _Requirements: 7.1_

- [ ] 41. Configure caching headers
  - Set up cache-control headers for static assets
  - Configure 1-year expiration for immutable assets
  - Add versioning/hashing to asset filenames
  - Test caching behavior
  - _Requirements: 7.4_

- [ ] 41.1 Write property test for cache headers
  - **Property 33: Static assets have cache headers**
  - **Validates: Requirements 7.4**

- [ ] 42. Run Lighthouse performance audit
  - Run Lighthouse on all major pages
  - Identify performance bottlenecks
  - Implement fixes for issues
  - Verify score is 90 or higher
  - _Requirements: 7.3_


- [ ] 42.1 Write property test for Lighthouse score
  - **Property 32: Lighthouse score meets threshold**
  - **Validates: Requirements 7.3**

- [ ] 43. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.



## Phase 7: SEO & Social Sharing


- [ ] 44. Create SEO metadata management system
  - Create MetaTags component for managing head tags
  - Add support for title, description, keywords
  - Implement per-page metadata configuration
  - Use react-helmet-async or similar library
  - _Requirements: 8.5_


- [ ] 44.1 Write property test for meta descriptions
  - **Property 39: Meta descriptions respect length limit**

  - **Validates: Requirements 8.5**

- [ ] 45. Implement Open Graph tags
  - Add OG tags to MetaTags component
  - Include og:title, og:description, og:image, og:type
  - Ensure OG images are 1200x630px minimum

  - Test with Facebook/LinkedIn sharing debugger
  - _Requirements: 8.1, 8.2_


- [ ] 45.1 Write property test for Open Graph
  - **Property 35: Open Graph tags are complete**
  - **Property 36: OG images meet dimension requirements**
  - **Validates: Requirements 8.1, 8.2**

- [ ] 46. Implement Twitter Card tags
  - Add Twitter card meta tags

  - Include twitter:card, twitter:title, twitter:description, twitter:image
  - Test with Twitter card validator

  - _Requirements: 8.3_

- [ ] 46.1 Write property test for Twitter cards
  - **Property 37: Twitter cards are present**
  - **Validates: Requirements 8.3**

- [ ] 47. Add structured data (JSON-LD)
  - Create StructuredData component


  - Implement Organization schema
  - Implement WebSite schema with search action
  - Implement EducationalOrganization schema
  - Validate with Google's Structured Data Testing Tool
  - _Requirements: 8.4_

- [ ] 47.1 Write property test for structured data
  - **Property 38: Structured data is valid**
  - **Validates: Requirements 8.4**

- [x] 48. Apply metadata to all pages


  - Add MetaTags to Home page
  - Add MetaTags to About page
  - Add MetaTags to Academics page
  - Add MetaTags to Admissions page
  - Add MetaTags to all other pages
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 49. Create sitemap.xml
  - Generate sitemap with all pages
  - Include priority and change frequency
  - Add to public folder
  - Update robots.txt to reference sitemap
  - _Requirements: 8.4_

- [ ] 50. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 8: Offline Support & Service Worker

- [ ] 51. Set up Workbox for service worker
  - Install Workbox dependencies
  - Configure Workbox in build process
  - Create service worker configuration
  - _Requirements: 12.1_

- [ ] 52. Implement caching strategies
  - Configure cache-first for static assets
  - Configure network-first for API calls
  - Set up precaching for critical pages (home, about, contact)
  - Implement cache size limits (50MB)
  - _Requirements: 12.2, 12.4_

- [ ] 52.1 Write property test for caching
  - **Property 52: Cached pages serve when offline**
  - **Validates: Requirements 12.2**

- [ ] 53. Implement cache eviction (LRU)
  - Add cache size monitoring
  - Implement least-recently-used eviction
  - Test cache cleanup when exceeding 50MB
  - _Requirements: 12.5_

- [ ] 53.1 Write property test for cache eviction
  - **Property 54: Cache eviction follows LRU**
  - **Validates: Requirements 12.5**

- [ ] 54. Build offline indicator
  - Create OfflineBanner component
  - Detect online/offline state with navigator.onLine
  - Show banner when offline
  - Add retry button
  - Style with Tailwind CSS
  - _Requirements: 12.3_

- [ ] 54.1 Write property test for offline indicator
  - **Property 53: Offline banner displays when disconnected**
  - **Validates: Requirements 12.3**

- [ ] 55. Test offline functionality
  - Test service worker registration
  - Test offline page serving
  - Test cache updates
  - Test online/offline transitions
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 56. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 9: Accessibility Compliance


- [x] 57. Implement focus indicators

  - Add visible focus styles to all interactive elements
  - Use 2px outline with brand color
  - Ensure focus styles work with keyboard navigation
  - Test tab order is logical
  - _Requirements: 5.1_


- [ ] 57.1 Write property test for focus indicators
  - **Property 21: Focus indicators are visible**
  - **Validates: Requirements 5.1**

- [ ] 58. Verify color contrast
  - Audit all text/background color combinations
  - Ensure 4.5:1 contrast ratio minimum
  - Fix any failing combinations
  - Test with color contrast analyzer
  - _Requirements: 5.2_

- [ ] 58.1 Write property test for color contrast
  - **Property 22: Color contrast meets WCAG standards**
  - **Validates: Requirements 5.2**

- [ ] 59. Add alt text to images
  - Audit all images for alt text
  - Add descriptive alt text to content images
  - Use empty alt for decorative images
  - Test with screen reader
  - _Requirements: 5.3_

- [ ] 59.1 Write property test for alt text
  - **Property 23: Content images have alt text**
  - **Validates: Requirements 5.3**

- [ ] 60. Enhance form accessibility
  - Ensure all inputs have associated labels
  - Add ARIA labels where needed
  - Implement clear error messages
  - Add required field indicators
  - Test with screen reader
  - _Requirements: 5.4_

- [ ] 60.1 Write property test for form accessibility
  - **Property 24: Forms have proper associations**
  - **Validates: Requirements 5.4**

- [ ] 61. Audit heading hierarchy
  - Review heading structure on all pages
  - Ensure proper h1 → h2 → h3 order
  - Fix any skipped heading levels
  - Add semantic HTML landmarks (nav, main, aside, footer)
  - _Requirements: 5.5_

- [ ] 61.1 Write property test for heading hierarchy
  - **Property 25: Heading hierarchy is semantic**
  - **Validates: Requirements 5.5**

- [ ] 62. Run automated accessibility tests
  - Install and configure axe-core
  - Run accessibility tests on all pages
  - Fix all critical and serious issues
  - Document any minor issues for future work
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 63. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.


## Phase 10: Error Pages & Edge Cases



- [ ] 64. Create custom 404 page
  - Design 404 page matching site branding
  - Add navigation links to main sections
  - Include search functionality
  - Add helpful error message

  - Maintain header and footer
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 65. Create custom 500 error page
  - Design 500 page matching site branding
  - Add contact information
  - Include friendly error message
  - Add retry mechanism

  - Maintain header and footer
  - _Requirements: 11.3, 11.4_


- [ ] 65.1 Write property test for error pages
  - **Property 50: Error pages maintain layout**
  - **Validates: Requirements 11.4**

- [ ] 66. Implement error logging
  - Set up error logging utility
  - Log errors from ErrorBoundary

  - Log 404 and 500 errors
  - Include error details (stack trace, user agent, URL)
  - Prepare for integration with monitoring service
  - _Requirements: 11.5_


- [ ] 66.1 Write property test for error logging
  - **Property 51: Errors are logged**
  - **Validates: Requirements 11.5**

- [ ] 67. Configure React Router for error pages
  - Add 404 route as catch-all
  - Configure error boundary for 500 errors
  - Test navigation to non-existent pages
  - Test error scenarios
  - _Requirements: 11.1, 11.3_

- [ ] 68. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 11: Visual Polish & Micro-interactions

- [ ] 69. Add gradient overlays to hero images
  - Update Hero component with gradient overlays
  - Ensure opacity is between 0.3-0.6
  - Test text readability on various images
  - _Requirements: 9.1_

- [ ] 69.1 Write property test for gradient overlays
  - **Property 40: Text overlays have readable gradients**
  - **Validates: Requirements 9.1**

- [ ] 70. Add subtle background textures
  - Create texture pattern assets
  - Apply textures to background sections
  - Ensure opacity is under 0.1
  - Test on various screen sizes
  - _Requirements: 9.2_

- [ ] 70.1 Write property test for texture opacity
  - **Property 41: Background textures are subtle**
  - **Validates: Requirements 9.2**

- [ ] 71. Refine hover transitions
  - Audit all hover states
  - Ensure cubic-bezier easing functions
  - Verify 300ms transition duration
  - Add scale transforms where appropriate
  - _Requirements: 1.2, 9.4_

- [ ] 71.1 Write property test for hover transitions
  - **Property 2: Hover transitions complete within timing constraints**
  - **Property 43: Transitions use cubic-bezier easing**
  - **Validates: Requirements 1.2, 9.4**

- [ ] 72. Standardize border-radius and shadows
  - Audit all cards and panels
  - Ensure 12px border-radius
  - Standardize box-shadow values
  - Update Tailwind config if needed
  - _Requirements: 9.5_

- [ ] 72.1 Write property test for styling consistency
  - **Property 44: Cards have consistent styling**
  - **Validates: Requirements 9.5**

- [ ] 73. Add loading state animations
  - Ensure all skeleton loaders have pulse animation
  - Add pulse to image placeholders
  - Verify 200ms fade-out on content load
  - Test loading states across components
  - _Requirements: 14.1, 14.2, 14.5_

- [ ] 73.1 Write property test for loading animations
  - **Property 60: Skeleton loaders match content structure**
  - **Property 61: Image placeholders have pulse animation**
  - **Property 64: Loaders fade out smoothly**
  - **Validates: Requirements 14.1, 14.2, 14.5**

- [ ] 74. Add API loading indicators
  - Identify all API call points
  - Add loading spinners or progress indicators
  - Ensure consistent loading UI
  - Test with slow network simulation
  - _Requirements: 14.3_

- [ ] 74.1 Write property test for API loading
  - **Property 62: API calls show loading indicators**
  - **Property 63: Page transitions show progress bar**
  - **Validates: Requirements 14.3, 14.4**

- [ ] 75. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 12: Print Styles & Final Polish

- [ ] 76. Create print stylesheet
  - Create print.css or add print media queries
  - Hide navigation, footer, and decorative elements
  - Ensure black text on white background
  - Add page breaks at logical boundaries
  - _Requirements: 15.1, 15.2, 15.3_

- [ ] 76.1 Write property test for print styles
  - **Property 65: Print styles hide decorative elements**
  - **Property 66: Print uses high-contrast colors**
  - **Property 67: Print includes logical page breaks**
  - **Validates: Requirements 15.1, 15.2, 15.3**

- [ ] 77. Enhance print styles for links
  - Add CSS to display URLs after links in print
  - Test with various link types
  - Ensure readability
  - _Requirements: 15.4_

- [ ] 77.1 Write property test for print links
  - **Property 68: Print shows link URLs**
  - **Validates: Requirements 15.4**

- [ ] 78. Optimize print for key pages
  - Test print layout for Admissions page
  - Test print layout for Contact page
  - Ensure all contact info is visible
  - Adjust layouts if needed
  - _Requirements: 15.5_

- [ ] 78.1 Write property test for critical print info
  - **Property 69: Critical info visible in print**
  - **Validates: Requirements 15.5**

- [ ] 79. Cross-browser testing
  - Test on Chrome (latest)
  - Test on Firefox (latest)
  - Test on Safari (latest)
  - Test on Edge (latest)
  - Test on mobile browsers (iOS Safari, Chrome Mobile)
  - Fix any browser-specific issues
  - _Requirements: All_

- [ ] 80. Responsive testing
  - Test on mobile (320px, 375px, 414px)
  - Test on tablet (768px, 1024px)
  - Test on desktop (1280px, 1440px, 1920px)
  - Fix any responsive layout issues
  - _Requirements: All_

- [ ] 81. Performance final audit
  - Run Lighthouse on all pages
  - Verify all scores are 90+
  - Check bundle sizes
  - Verify image optimization
  - Test loading times on slow 3G
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 82. Accessibility final audit
  - Run axe-core on all pages
  - Test keyboard navigation thoroughly
  - Test with screen reader (NVDA or VoiceOver)
  - Verify WCAG 2.1 AA compliance
  - Fix any remaining issues
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 83. Final visual QA
  - Review all pages for visual consistency
  - Check all animations and transitions
  - Verify brand colors are correct
  - Test all interactive elements
  - Get stakeholder approval
  - _Requirements: All_

- [ ] 84. Documentation
  - Document new components in README
  - Add JSDoc comments to complex functions
  - Create component usage examples
  - Document performance optimizations
  - Update project documentation
  - _Requirements: All_

- [ ] 85. Final Checkpoint - Complete testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all requirements are met
  - Confirm all acceptance criteria are satisfied
  - Prepare for deployment
