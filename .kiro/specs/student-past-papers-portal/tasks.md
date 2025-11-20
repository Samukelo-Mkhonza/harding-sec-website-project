# Implementation Plan

- [ ] 1. Set up data structures and utilities
  - Create paper metadata JSON structure in `/public/data/papers-metadata.json`
  - Implement local storage utility functions in `src/utils/portalStorage.js`
  - Define constants for subjects, exam types, and grades in `src/utils/portalConstants.js`
  - Create filter logic utility functions in `src/utils/filterUtils.js`
  - _Requirements: 1.1, 2.2, 8.1, 12.1_

- [ ] 1.1 Write property test for filter logic
  - **Property 5: Multi-filter AND logic**
  - **Validates: Requirements 2.2**

- [ ] 1.2 Write property test for local storage utilities
  - **Property 18: Bookmark persistence**
  - **Validates: Requirements 8.1, 8.4**

- [ ] 2. Create core portal page component
  - Create `src/pages/PastPapersPortal.js` page component
  - Implement data loading on mount from JSON file
  - Set up state management for papers, filters, and authentication
  - Add route to `src/AppRouter.js` for `/past-papers`
  - Integrate with existing Header and Footer components
  - _Requirements: 1.1, 11.1, 15.1_

- [ ] 2.1 Write property test for subject alphabetical ordering
  - **Property 1: Subject alphabetical ordering**
  - **Validates: Requirements 1.1**

- [ ] 3. Implement authentication gate component
  - Create `src/components/portal/AuthenticationGate.js` component
  - Build access code input form with validation
  - Implement authentication logic with local storage token
  - Add 30-day session expiry handling
  - Display error messages for invalid credentials
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 3.1 Write property test for authentication token storage
  - **Property 26: Authentication token storage**
  - **Validates: Requirements 11.2**

- [ ] 3.2 Write property test for expired session handling
  - **Property 27: Expired session handling**
  - **Validates: Requirements 11.4**

- [ ] 4. Build filter panel component
  - Create `src/components/portal/FilterPanel.js` component
  - Implement grade filter dropdown (8-12)
  - Implement subject multi-select filter
  - Implement year range filter
  - Implement exam type filter
  - Add "Clear All Filters" button
  - Display active filter chips
  - Make responsive with collapsible drawer on mobile
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 7.2_

- [ ] 4.1 Write property test for grade filter correctness
  - **Property 4: Grade filter correctness**
  - **Validates: Requirements 1.4**

- [ ] 4.2 Write property test for filter clear round trip
  - **Property 6: Filter clear round trip**
  - **Validates: Requirements 2.4**

- [ ] 4.3 Write property test for year filter correctness
  - **Property 25: Year filter correctness**
  - **Validates: Requirements 10.5**

- [ ] 5. Create search bar component
  - Create `src/components/portal/SearchBar.js` component
  - Implement search input with 300ms debounce
  - Add search icon and clear button
  - Implement keyboard shortcut (Ctrl/Cmd + K)
  - Display result count
  - _Requirements: 5.1, 5.3, 5.5_

- [ ] 5.1 Write property test for search filter correctness
  - **Property 12: Search filter correctness**
  - **Validates: Requirements 5.1**

- [ ] 5.2 Write property test for search clear round trip
  - **Property 14: Search clear round trip**
  - **Validates: Requirements 5.5**

- [ ] 6. Implement paper card component
  - Create `src/components/portal/PaperCard.js` component
  - Display paper information (subject, grade, year, exam type, file size)
  - Add subject icon and color coding
  - Display "New" badge for papers within 30 days
  - Add download button with loading state
  - Add preview button
  - Add memo button (conditional on memo availability)
  - Add bookmark button with toggle state
  - Support both grid and list view modes
  - _Requirements: 1.3, 3.1, 3.2, 4.1, 6.1, 6.4, 8.1, 9.2_

- [ ] 6.1 Write property test for paper information completeness
  - **Property 3: Paper information completeness**
  - **Validates: Requirements 1.3**

- [ ] 6.2 Write property test for new badge display logic
  - **Property 22: New badge display logic**
  - **Validates: Requirements 9.2**

- [ ] 6.3 Write property test for memo indicator presence
  - **Property 15: Memo indicator presence**
  - **Validates: Requirements 6.1**

- [ ] 6.4 Write property test for memo absence message
  - **Property 16: Memo absence message**
  - **Validates: Requirements 6.4**

- [ ] 6.5 Write property test for download both option
  - **Property 17: Download both option availability**
  - **Validates: Requirements 6.5**

- [ ] 7. Create papers list component with filtering
  - Create `src/components/portal/PapersList.js` component
  - Implement filter application logic
  - Display filtered papers using PaperCard components
  - Add results header with count and sort options
  - Implement virtual scrolling for lists > 50 items using react-window
  - Handle empty state with helpful message
  - Support grid and list view modes
  - _Requirements: 1.2, 1.4, 1.5, 2.2, 2.5, 15.2_

- [ ] 7.1 Write property test for subject filtering correctness
  - **Property 2: Subject filtering correctness**
  - **Validates: Requirements 1.2**

- [ ] 7.2 Write property test for result count accuracy
  - **Property 7: Result count accuracy**
  - **Validates: Requirements 2.5**

- [ ] 7.3 Write property test for virtual scrolling activation
  - **Property 35: Virtual scrolling activation**
  - **Validates: Requirements 15.2**

- [ ] 7.4 Write property test for client-side filtering
  - **Property 36: Client-side filtering**
  - **Validates: Requirements 15.4**

- [ ] 8. Build PDF viewer modal component
  - Create `src/components/portal/PDFViewerModal.js` component
  - Integrate react-pdf library for PDF rendering
  - Implement page navigation controls (prev/next, jump to page)
  - Add zoom controls (fit width, fit page, zoom in/out)
  - Add download button within viewer
  - Implement keyboard shortcuts (arrows, ESC)
  - Display loading state with progress indicator
  - Preserve scroll position when closing modal
  - Make responsive for mobile with touch gestures
  - _Requirements: 4.1, 4.2, 4.4, 4.5, 7.5_

- [ ] 8.1 Write property test for preview modal correctness
  - **Property 10: Preview modal correctness**
  - **Validates: Requirements 4.1**

- [ ] 8.2 Write property test for modal scroll position preservation
  - **Property 11: Modal scroll position preservation**
  - **Validates: Requirements 4.5**

- [ ] 9. Implement download functionality
  - Create download handler in `src/utils/downloadUtils.js`
  - Implement single PDF download with proper headers
  - Implement "Download Both" (paper + memo) functionality
  - Add download analytics logging (without PII)
  - Handle download errors with retry option
  - Display loading indicators during download
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.5_

- [ ] 9.1 Write property test for download action correctness
  - **Property 8: Download action correctness**
  - **Validates: Requirements 3.1**

- [ ] 9.2 Write property test for download analytics without PII
  - **Property 9: Download analytics without PII**
  - **Validates: Requirements 3.4**

- [ ] 10. Create bookmarks/favorites system
  - Implement bookmark toggle functionality in PaperCard
  - Create `src/components/portal/FavoritesPanel.js` collapsible sidebar
  - Display bookmarked papers in favorites panel
  - Persist bookmarks to local storage
  - Add remove bookmark functionality
  - Display message about local storage limitations
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 10.1 Write property test for bookmark removal correctness
  - **Property 19: Bookmark removal correctness**
  - **Validates: Requirements 8.3**

- [ ] 10.2 Write property test for favorites display accuracy
  - **Property 20: Favorites display accuracy**
  - **Validates: Requirements 8.2**

- [ ] 11. Build recently added section
  - Create `src/components/portal/RecentlyAdded.js` component
  - Implement logic to get 10 most recent papers by uploadDate
  - Sort papers by uploadDate in descending order
  - Display papers using PaperCard components
  - Handle empty state
  - Position section prominently on portal page
  - _Requirements: 9.1, 9.3, 9.4, 9.5_

- [ ] 11.1 Write property test for recently added count and ordering
  - **Property 21: Recently added count and ordering**
  - **Validates: Requirements 9.1, 9.3**

- [ ] 12. Implement year grouping functionality
  - Create year grouping logic in filter utils
  - Implement collapsible year group components
  - Display year headings with paper counts
  - Sort year groups in descending order
  - Add expand/collapse animations
  - Show all papers when year group is expanded
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 12.1 Write property test for year grouping correctness
  - **Property 23: Year grouping correctness**
  - **Validates: Requirements 10.1, 10.2**

- [ ] 12.2 Write property test for year group count accuracy
  - **Property 24: Year group count accuracy**
  - **Validates: Requirements 10.4**

- [ ] 13. Create statistics display component
  - Create `src/components/portal/PortalStatistics.js` component
  - Display total counts (papers, subjects, years)
  - Update statistics based on active filters
  - Show per-grade counts for selected subject
  - Implement animated counters using CounterAnimation component
  - Handle zero counts with "none available" message
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 13.1 Write property test for statistics accuracy
  - **Property 29: Statistics accuracy**
  - **Validates: Requirements 12.1, 12.2**

- [ ] 13.2 Write property test for per-grade statistics accuracy
  - **Property 30: Per-grade statistics accuracy**
  - **Validates: Requirements 12.3**

- [ ] 13.3 Write property test for empty combination indication
  - **Property 31: Empty combination indication**
  - **Validates: Requirements 12.5**

- [ ] 14. Implement search highlighting
  - Create text highlighting utility in `src/utils/textUtils.js`
  - Apply highlighting to matching text in paper cards
  - Use consistent highlight styling (yellow background)
  - Ensure highlights are accessible (sufficient contrast)
  - _Requirements: 5.2_

- [ ] 14.1 Write property test for search highlighting presence
  - **Property 13: Search highlighting presence**
  - **Validates: Requirements 5.2**

- [ ] 15. Add error handling and messaging
  - Create `src/components/portal/ErrorMessage.js` component
  - Handle file not found errors with appropriate messages
  - Handle authentication errors with re-auth prompts
  - Handle network errors with retry buttons
  - Display contact link in all error messages
  - Handle paper removal from dataset
  - _Requirements: 3.5, 11.3, 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 15.1 Write property test for paper removal propagation
  - **Property 33: Paper removal propagation**
  - **Validates: Requirements 14.4**

- [ ] 15.2 Write property test for error contact link presence
  - **Property 34: Error contact link presence**
  - **Validates: Requirements 14.5**

- [ ] 16. Implement accessibility features
  - Add ARIA labels to all interactive elements
  - Ensure keyboard navigation works throughout portal
  - Add visible focus indicators (2px outline)
  - Implement skip links for main content
  - Test with screen reader
  - Ensure minimum touch target sizes (44x44px)
  - Verify color contrast ratios meet WCAG 2.1 AA
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 16.1 Write property test for accessibility labels completeness
  - **Property 32: Accessibility labels completeness**
  - **Validates: Requirements 13.2**

- [ ] 17. Add responsive mobile optimizations
  - Optimize layout for mobile screens
  - Implement collapsible filter drawer for mobile
  - Use card-based layout on mobile
  - Ensure touch-friendly tap targets
  - Optimize PDF viewer for mobile
  - Test on various mobile devices and screen sizes
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 18. Implement filter preferences persistence
  - Save filter preferences to local storage on change
  - Load saved preferences on authentication
  - Apply saved preferences automatically
  - Clear preferences on logout
  - _Requirements: 11.5_

- [ ] 18.1 Write property test for filter preferences persistence
  - **Property 28: Filter preferences persistence**
  - **Validates: Requirements 11.5**

- [ ] 19. Add SEO and meta tags
  - Create SEO component for portal page
  - Add Open Graph meta tags
  - Add Twitter card meta tags
  - Include descriptive meta description
  - Add structured data (JSON-LD) for educational resources
  - Update sitemap.xml to include portal route
  - _Requirements: General best practices_

- [ ] 20. Create sample papers data
  - Create sample papers metadata JSON with 50+ papers
  - Include variety of subjects, grades, years, and exam types
  - Create placeholder PDF files or use sample PDFs
  - Ensure some papers have memos, some don't
  - Include papers from various years (2015-2024)
  - Add realistic file sizes and page counts
  - _Requirements: All requirements need data_

- [ ] 21. Integrate portal into main navigation
  - Add "Past Papers" link to main navigation menu
  - Add portal link to mobile menu
  - Update breadcrumbs to include portal
  - Add portal link to footer
  - Ensure consistent styling with rest of site
  - _Requirements: General integration_

- [ ] 22. Performance optimizations
  - Implement code splitting for PDF viewer
  - Add lazy loading for PDF thumbnails
  - Optimize bundle size (tree-shaking, minification)
  - Add memoization for expensive computations
  - Test and optimize Lighthouse performance score
  - _Requirements: 15.1, 15.3, 15.5_

- [ ] 23. Final testing and polish
  - Test all user flows end-to-end
  - Verify all filters work correctly in combination
  - Test authentication and session expiry
  - Test bookmarks persistence across sessions
  - Verify mobile responsiveness
  - Test accessibility with keyboard and screen reader
  - Fix any visual inconsistencies
  - Ensure all error states display correctly
  - _Requirements: All requirements_

- [ ] 24. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
