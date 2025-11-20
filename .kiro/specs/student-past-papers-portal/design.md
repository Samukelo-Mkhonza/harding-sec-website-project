# Design Document

## Overview

The Student Past Papers Portal is a dedicated feature within the Harding Secondary School website that provides students with organized access to historical examination papers and marking memos in PDF format. The portal will be implemented as a new route (`/student-portal` or `/past-papers`) with a clean, intuitive interface optimized for quick discovery and access to study materials.

The design emphasizes simplicity, performance, and accessibility, ensuring students can efficiently find and download the papers they need across all devices. The portal will integrate seamlessly with the existing website design while providing specialized functionality for document management and filtering.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  Portal Page     │────────▶│  Filter System   │          │
│  │  Component       │         │  Component       │          │
│  └──────────────────┘         └──────────────────┘          │
│           │                            │                     │
│           │                            │                     │
│           ▼                            ▼                     │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  Papers List     │         │  Search          │          │
│  │  Component       │         │  Component       │          │
│  └──────────────────┘         └──────────────────┘          │
│           │                            │                     │
│           └────────────┬───────────────┘                     │
│                        │                                     │
│                        ▼                                     │
│           ┌────────────────────────┐                        │
│           │  PDF Viewer Modal      │                        │
│           └────────────────────────┘                        │
│                        │                                     │
├────────────────────────┼─────────────────────────────────────┤
│                        │                                     │
│           ┌────────────▼────────────┐                       │
│           │  Data Management Layer  │                       │
│           │  - Papers Metadata      │                       │
│           │  - Local Storage        │                       │
│           │  - Filter Logic         │                       │
│           └─────────────────────────┘                       │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Static PDF Files   │
              │   (public/papers/)   │
              └──────────────────────┘
```

### Component Hierarchy

```
PastPapersPortal (Page)
├── SEO (Meta tags)
├── Breadcrumbs
├── PortalHeader
│   ├── Title & Description
│   └── Statistics Display
├── AuthenticationGate (if not authenticated)
│   └── AccessCodeForm
├── PortalControls
│   ├── SearchBar
│   ├── FilterPanel
│   │   ├── GradeFilter
│   │   ├── SubjectFilter
│   │   ├── YearFilter
│   │   └── ExamTypeFilter
│   └── ViewToggle (Grid/List)
├── RecentlyAdded (Section)
│   └── PaperCard[]
├── PapersList (Main Content)
│   ├── ResultsHeader (count, sort options)
│   └── PaperCard[]
│       ├── PaperInfo
│       ├── DownloadButton
│       ├── PreviewButton
│       ├── MemoButton (if available)
│       └── BookmarkButton
├── PDFViewerModal
│   ├── PDFRenderer
│   ├── NavigationControls
│   └── DownloadButton
└── FavoritesPanel (Collapsible sidebar)
    └── BookmarkedPapers[]
```

## Components and Interfaces

### 1. Data Models

#### Paper Metadata Structure

```javascript
{
  id: string,              // Unique identifier (e.g., "math-g12-2023-final")
  subject: string,         // Subject name (e.g., "Mathematics")
  grade: number,           // Grade level (8-12)
  year: number,            // Academic year (e.g., 2023)
  examType: string,        // "Mid-Year" | "Final" | "Trial" | "Preliminary"
  title: string,           // Display title
  pdfUrl: string,          // Path to PDF file
  memoUrl: string | null,  // Path to memo PDF (if available)
  fileSize: number,        // Size in bytes
  uploadDate: string,      // ISO date string
  pageCount: number,       // Number of pages
  tags: string[]           // Additional searchable tags
}
```

#### Filter State Structure

```javascript
{
  grade: number | null,
  subject: string | null,
  year: number | null,
  examType: string | null,
  searchQuery: string
}
```

#### User Preferences Structure (Local Storage)

```javascript
{
  bookmarkedPapers: string[],     // Array of paper IDs
  recentlyViewed: string[],       // Array of paper IDs (max 10)
  filterPreferences: FilterState,  // Last used filters
  viewMode: "grid" | "list",
  authToken: string | null,
  authExpiry: string | null
}
```

### 2. Core Components

#### PastPapersPortal (Page Component)

**Purpose**: Main page component that orchestrates the entire portal experience.

**Props**: None (route-based)

**State**:
- `papers`: Array of all paper metadata
- `filteredPapers`: Array of papers after applying filters
- `filters`: Current filter state
- `isAuthenticated`: Boolean authentication status
- `loading`: Boolean loading state
- `viewMode`: "grid" | "list"

**Key Methods**:
- `loadPapersData()`: Fetch/load papers metadata
- `applyFilters()`: Filter papers based on current filter state
- `handleSearch()`: Debounced search handler
- `handleAuthentication()`: Verify access credentials

#### FilterPanel Component

**Purpose**: Provides all filtering controls for narrowing down papers.

**Props**:
- `filters`: Current filter state
- `onFilterChange`: Callback for filter updates
- `availableOptions`: Object containing available values for each filter
- `resultCount`: Number of matching papers

**Features**:
- Multi-select capability for subjects
- Year range slider
- Clear all filters button
- Active filter chips display
- Responsive collapse on mobile

#### PaperCard Component

**Purpose**: Displays individual paper information with action buttons.

**Props**:
- `paper`: Paper metadata object
- `viewMode`: "grid" | "list"
- `isBookmarked`: Boolean
- `onDownload`: Download handler
- `onPreview`: Preview handler
- `onBookmark`: Bookmark toggle handler

**Display Elements**:
- Subject icon/color coding
- Grade badge
- Year and exam type
- File size indicator
- "New" badge (if within 30 days)
- Memo availability indicator

#### PDFViewerModal Component

**Purpose**: In-browser PDF preview with navigation controls.

**Props**:
- `pdfUrl`: URL to PDF file
- `isOpen`: Boolean modal state
- `onClose`: Close handler
- `paperTitle`: Display title

**Features**:
- Page navigation (prev/next, jump to page)
- Zoom controls (fit width, fit page, custom zoom)
- Download button
- Keyboard shortcuts (arrow keys, ESC)
- Loading state with progress indicator

**Implementation**: Use `react-pdf` library for rendering

#### SearchBar Component

**Purpose**: Real-time search across paper metadata.

**Props**:
- `value`: Current search query
- `onChange`: Search handler
- `placeholder`: Placeholder text
- `resultCount`: Number of matching results

**Features**:
- 300ms debounce
- Clear button
- Search icon
- Keyboard shortcut (Ctrl/Cmd + K)
- Highlighted matching text in results

### 3. Data Management

#### Papers Data Source

**Option 1: Static JSON File** (Recommended for initial implementation)
- Store metadata in `/public/data/papers-metadata.json`
- Load once on portal mount
- Client-side filtering and search
- Easy to update by adding to JSON file

**Option 2: Backend API** (Future enhancement)
- RESTful API endpoints for papers CRUD
- Server-side filtering and pagination
- Better for large datasets (1000+ papers)

#### File Organization Structure

```
public/
└── papers/
    ├── grade-8/
    │   ├── mathematics/
    │   │   ├── 2023-final.pdf
    │   │   ├── 2023-final-memo.pdf
    │   │   ├── 2023-midyear.pdf
    │   │   └── ...
    │   ├── english/
    │   └── ...
    ├── grade-9/
    ├── grade-10/
    ├── grade-11/
    └── grade-12/
```

#### Local Storage Management

**Keys**:
- `hss_portal_bookmarks`: Bookmarked paper IDs
- `hss_portal_recent`: Recently viewed papers
- `hss_portal_auth`: Authentication token
- `hss_portal_preferences`: User preferences

**Utilities**:
```javascript
// src/utils/portalStorage.js
export const PortalStorage = {
  getBookmarks: () => JSON.parse(localStorage.getItem('hss_portal_bookmarks') || '[]'),
  addBookmark: (paperId) => { /* ... */ },
  removeBookmark: (paperId) => { /* ... */ },
  getRecentlyViewed: () => { /* ... */ },
  addToRecent: (paperId) => { /* ... */ },
  // ... other methods
}
```

## Data Models

### Subject Categories

```javascript
const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator', color: '#19467E' },
  { id: 'english', name: 'English Home Language', icon: 'book', color: '#00A651' },
  { id: 'afrikaans', name: 'Afrikaans', icon: 'language', color: '#0D3F2F' },
  { id: 'physical-sciences', name: 'Physical Sciences', icon: 'atom', color: '#19467E' },
  { id: 'life-sciences', name: 'Life Sciences', icon: 'dna', color: '#00A651' },
  { id: 'accounting', name: 'Accounting', icon: 'calculator', color: '#0D3F2F' },
  { id: 'business-studies', name: 'Business Studies', icon: 'briefcase', color: '#19467E' },
  { id: 'economics', name: 'Economics', icon: 'trending-up', color: '#00A651' },
  { id: 'geography', name: 'Geography', icon: 'globe', color: '#0D3F2F' },
  { id: 'history', name: 'History', icon: 'clock', color: '#19467E' },
  { id: 'life-orientation', name: 'Life Orientation', icon: 'heart', color: '#00A651' }
];
```

### Exam Types

```javascript
const EXAM_TYPES = [
  { id: 'midyear', name: 'Mid-Year Examination', shortName: 'Mid-Year' },
  { id: 'final', name: 'Final Examination', shortName: 'Final' },
  { id: 'trial', name: 'Trial Examination', shortName: 'Trial' },
  { id: 'preliminary', name: 'Preliminary Examination', shortName: 'Prelim' },
  { id: 'test', name: 'Class Test', shortName: 'Test' }
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Subject alphabetical ordering
*For any* set of subjects loaded in the portal, the displayed subject list should be sorted alphabetically by subject name.
**Validates: Requirements 1.1**

### Property 2: Subject filtering correctness
*For any* subject selection, all displayed papers should have a subject field matching the selected subject, and papers should be grouped by grade level.
**Validates: Requirements 1.2**

### Property 3: Paper information completeness
*For any* paper displayed in the list, the rendered output should contain the examination type, academic year, and file size.
**Validates: Requirements 1.3**

### Property 4: Grade filter correctness
*For any* grade filter selection, all displayed papers should have a grade field matching the selected grade.
**Validates: Requirements 1.4**

### Property 5: Multi-filter AND logic
*For any* combination of filters (grade, subject, year, exam type), all displayed papers should match ALL selected filter criteria.
**Validates: Requirements 2.2**

### Property 6: Filter clear round trip
*For any* filter state, applying filters then clearing all filters should restore the complete unfiltered list of papers.
**Validates: Requirements 2.4**

### Property 7: Result count accuracy
*For any* filter state, the displayed count of matching papers should equal the length of the filtered papers array.
**Validates: Requirements 2.5**

### Property 8: Download action correctness
*For any* paper, clicking the download button should trigger a download action with the correct PDF URL from that paper's metadata.
**Validates: Requirements 3.1**

### Property 9: Download analytics without PII
*For any* download action, the analytics log entry should contain paper metadata but no personally identifiable information about the user.
**Validates: Requirements 3.4**

### Property 10: Preview modal correctness
*For any* paper, clicking the preview button should open the PDF viewer modal with that paper's PDF URL.
**Validates: Requirements 4.1**

### Property 11: Modal scroll position preservation
*For any* scroll position on the papers list, opening and closing the preview modal should preserve that scroll position.
**Validates: Requirements 4.5**

### Property 12: Search filter correctness
*For any* search query, all displayed papers should have at least one searchable field (subject, year, or exam type) containing the query string (case-insensitive).
**Validates: Requirements 5.1**

### Property 13: Search highlighting presence
*For any* search query with results, the rendered paper cards should contain highlighted text matching the search query.
**Validates: Requirements 5.2**

### Property 14: Search clear round trip
*For any* search query, entering a search then clearing the search field should restore the full filtered list (respecting other active filters).
**Validates: Requirements 5.5**

### Property 15: Memo indicator presence
*For any* paper with a non-null memoUrl field, the rendered paper card should display a memo indicator icon.
**Validates: Requirements 6.1**

### Property 16: Memo absence message
*For any* paper with a null memoUrl field, the rendered paper card should display "Memo not available" text.
**Validates: Requirements 6.4**

### Property 17: Download both option availability
*For any* paper where both pdfUrl and memoUrl are non-null, the paper card should provide a "Download Both" button.
**Validates: Requirements 6.5**

### Property 18: Bookmark persistence
*For any* paper, clicking the bookmark button should add the paper's ID to local storage, and that ID should persist across page reloads.
**Validates: Requirements 8.1, 8.4**

### Property 19: Bookmark removal correctness
*For any* bookmarked paper, clicking the bookmark button again should remove the paper's ID from local storage.
**Validates: Requirements 8.3**

### Property 20: Favorites display accuracy
*For any* set of bookmarked paper IDs in local storage, the favorites panel should display exactly those papers.
**Validates: Requirements 8.2**

### Property 21: Recently added count and ordering
*For any* set of papers, the "Recently Added" section should display exactly the 10 papers with the most recent uploadDate values, sorted in descending order by uploadDate.
**Validates: Requirements 9.1, 9.3**

### Property 22: New badge display logic
*For any* paper, the "New" badge should be displayed if and only if the uploadDate is within 30 days of the current date.
**Validates: Requirements 9.2**

### Property 23: Year grouping correctness
*For any* set of papers, when grouped by year, all papers within a year group should have the same year value, and year groups should be sorted in descending order.
**Validates: Requirements 10.1, 10.2**

### Property 24: Year group count accuracy
*For any* year group in collapsed state, the displayed count should equal the number of papers with that year value.
**Validates: Requirements 10.4**

### Property 25: Year filter correctness
*For any* year filter selection, all displayed papers should have a year field matching the selected year.
**Validates: Requirements 10.5**

### Property 26: Authentication token storage
*For any* valid authentication, the system should store an auth token in local storage with an expiry date 30 days in the future.
**Validates: Requirements 11.2**

### Property 27: Expired session handling
*For any* expired auth token (expiry date in the past), download attempts should trigger re-authentication before proceeding.
**Validates: Requirements 11.4**

### Property 28: Filter preferences persistence
*For any* successful authentication, the system should load and apply the user's previously saved filter preferences from local storage.
**Validates: Requirements 11.5**

### Property 29: Statistics accuracy
*For any* filter state, the displayed statistics (total papers, subjects, years) should accurately reflect the counts from the filtered dataset.
**Validates: Requirements 12.1, 12.2**

### Property 30: Per-grade statistics accuracy
*For any* selected subject, the displayed count of papers per grade should accurately reflect the number of papers matching that subject-grade combination.
**Validates: Requirements 12.3**

### Property 31: Empty combination indication
*For any* subject-grade combination with zero papers, the statistics should display zero or "none available".
**Validates: Requirements 12.5**

### Property 32: Accessibility labels completeness
*For any* interactive element (button, link, input), the element should have an aria-label, aria-labelledby, or visible text label.
**Validates: Requirements 13.2**

### Property 33: Paper removal propagation
*For any* paper removed from the dataset, that paper should not appear in any list (main list, recently added, favorites, search results).
**Validates: Requirements 14.4**

### Property 34: Error contact link presence
*For any* error state displayed to the user, the error message should include a contact link for reporting issues.
**Validates: Requirements 14.5**

### Property 35: Virtual scrolling activation
*For any* paper list with more than 50 items, the system should activate virtual scrolling to render only visible items.
**Validates: Requirements 15.2**

### Property 36: Client-side filtering
*For any* filter change, the filtering operation should execute without making network requests (all filtering done client-side).
**Validates: Requirements 15.4**

## Error Handling

### Error Categories and Handling Strategies

#### 1. File Not Found Errors
- **Scenario**: PDF file missing or URL broken
- **Handling**: 
  - Display toast notification: "This file is temporarily unavailable"
  - Log error with paper ID for admin review
  - Provide "Report Issue" button
  - Disable download/preview buttons for that paper

#### 2. Authentication Errors
- **Scenario**: Invalid access code, expired session
- **Handling**:
  - Redirect to authentication form
  - Display clear error message
  - Preserve intended action (e.g., download) after re-auth
  - Provide contact information for access issues

#### 3. Local Storage Errors
- **Scenario**: Storage quota exceeded, storage disabled
- **Handling**:
  - Gracefully degrade (bookmarks won't persist)
  - Display warning message about limited functionality
  - Suggest clearing browser data or enabling storage

#### 4. Network Errors
- **Scenario**: Failed to load papers metadata
- **Handling**:
  - Display retry button
  - Show cached data if available
  - Provide offline mode indicator
  - Log error for monitoring

#### 5. PDF Rendering Errors
- **Scenario**: PDF viewer fails to render document
- **Handling**:
  - Fall back to direct download
  - Display error message in modal
  - Provide alternative viewer link (browser default)

### Error Boundary Implementation

```javascript
// Wrap portal in error boundary
<ErrorBoundary
  fallback={<PortalErrorFallback />}
  onError={(error, errorInfo) => logError(error, errorInfo)}
>
  <PastPapersPortal />
</ErrorBoundary>
```

## Testing Strategy

### Unit Testing Approach

The portal will use **Jest** and **React Testing Library** for unit tests, focusing on:

1. **Component Rendering**: Verify components render with correct props
2. **User Interactions**: Test button clicks, form submissions, filter changes
3. **State Management**: Verify state updates correctly
4. **Edge Cases**: Empty states, missing data, error conditions
5. **Accessibility**: Test keyboard navigation, ARIA labels

**Example Unit Tests**:
- PaperCard renders all required information
- Filter panel updates filter state on selection
- Bookmark button toggles bookmark status
- Search input debounces correctly
- Empty state displays when no papers match filters

### Property-Based Testing Approach

The portal will use **fast-check** (JavaScript property-based testing library) to verify universal properties across all inputs. Each correctness property listed above will be implemented as a property-based test.

**Configuration**:
- Minimum 100 iterations per property test
- Custom generators for paper metadata, filter states, and user actions
- Each test tagged with format: `**Feature: student-past-papers-portal, Property {number}: {property_text}**`

**Example Property Test Structure**:

```javascript
import fc from 'fast-check';

describe('Property Tests - Filtering', () => {
  it('Property 5: Multi-filter AND logic', () => {
    /**
     * Feature: student-past-papers-portal, Property 5: Multi-filter AND logic
     * Validates: Requirements 2.2
     */
    fc.assert(
      fc.property(
        fc.array(paperGenerator), // Generate random papers
        fc.record({              // Generate random filter state
          grade: fc.option(fc.integer({ min: 8, max: 12 })),
          subject: fc.option(fc.constantFrom(...SUBJECTS)),
          year: fc.option(fc.integer({ min: 2015, max: 2024 })),
          examType: fc.option(fc.constantFrom(...EXAM_TYPES))
        }),
        (papers, filters) => {
          const filtered = applyFilters(papers, filters);
          
          // All filtered papers must match ALL active filters
          return filtered.every(paper => {
            const matchesGrade = !filters.grade || paper.grade === filters.grade;
            const matchesSubject = !filters.subject || paper.subject === filters.subject;
            const matchesYear = !filters.year || paper.year === filters.year;
            const matchesExamType = !filters.examType || paper.examType === filters.examType;
            
            return matchesGrade && matchesSubject && matchesYear && matchesExamType;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Custom Generators**:

```javascript
// Generator for paper metadata
const paperGenerator = fc.record({
  id: fc.uuid(),
  subject: fc.constantFrom(...SUBJECTS.map(s => s.id)),
  grade: fc.integer({ min: 8, max: 12 }),
  year: fc.integer({ min: 2015, max: 2024 }),
  examType: fc.constantFrom(...EXAM_TYPES.map(e => e.id)),
  title: fc.string(),
  pdfUrl: fc.webUrl(),
  memoUrl: fc.option(fc.webUrl(), { nil: null }),
  fileSize: fc.integer({ min: 100000, max: 10000000 }),
  uploadDate: fc.date({ min: new Date('2020-01-01'), max: new Date() }).map(d => d.toISOString()),
  pageCount: fc.integer({ min: 1, max: 50 }),
  tags: fc.array(fc.string(), { maxLength: 5 })
});
```

### Integration Testing

While not part of the initial implementation, integration tests should eventually cover:
- End-to-end user flows (browse → filter → preview → download)
- Authentication flow
- Local storage persistence across sessions
- PDF viewer functionality

### Test Coverage Goals

- **Unit Test Coverage**: 80%+ for component logic
- **Property Test Coverage**: 100% of correctness properties
- **Critical Path Coverage**: 100% for authentication, filtering, and download flows

## Performance Considerations

### Optimization Strategies

1. **Data Loading**
   - Load papers metadata once on mount
   - Cache in memory for session duration
   - Consider service worker caching for repeat visits

2. **Filtering Performance**
   - Client-side filtering using efficient array methods
   - Debounce search input (300ms)
   - Memoize filter results with useMemo

3. **Rendering Optimization**
   - Virtual scrolling for lists > 50 items (react-window)
   - Lazy load PDF thumbnails
   - Code split PDF viewer component

4. **Bundle Size**
   - Lazy load PDF viewer library (react-pdf)
   - Tree-shake unused icons
   - Compress and minify assets

### Performance Targets

- **Initial Load**: < 2 seconds (portal page)
- **Filter Response**: < 400ms (visual feedback)
- **Search Response**: < 300ms (after debounce)
- **PDF Preview Open**: < 1 second (modal display)
- **Lighthouse Score**: 85+ (performance)

## Security Considerations

### Authentication Security

- Access codes stored as hashed values (bcrypt)
- Auth tokens use secure, httpOnly cookies (if backend available)
- Session expiry enforced client-side and server-side
- Rate limiting on authentication attempts

### Data Security

- PDF files served from public directory (no sensitive data)
- No personal student data stored or transmitted
- Analytics data anonymized (no user IDs)
- Local storage data non-sensitive (bookmarks, preferences)

### Content Security

- Validate PDF file types before serving
- Sanitize file names to prevent path traversal
- Implement CORS headers for PDF requests
- CSP headers to prevent XSS attacks

## Accessibility Compliance

### WCAG 2.1 AA Requirements

1. **Keyboard Navigation**
   - All interactive elements focusable
   - Logical tab order
   - Visible focus indicators (2px outline)
   - Keyboard shortcuts documented

2. **Screen Reader Support**
   - Semantic HTML (nav, main, section, article)
   - ARIA labels on all buttons/links
   - ARIA live regions for dynamic content
   - Alt text for icons

3. **Visual Accessibility**
   - Color contrast ratio 4.5:1 minimum
   - Text resizable to 200% without loss of functionality
   - No information conveyed by color alone
   - Minimum touch target size 44x44px

4. **Content Accessibility**
   - Clear, descriptive link text
   - Form labels associated with inputs
   - Error messages clear and actionable
   - Heading hierarchy (h1 → h2 → h3)

## Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Advanced Search**
   - Full-text search within PDFs
   - Search by topic/chapter
   - Search history and suggestions

2. **User Accounts**
   - Personal accounts with cloud sync
   - Study progress tracking
   - Notes and annotations on papers

3. **Social Features**
   - Share papers with classmates
   - Discussion forums per paper
   - Collaborative study groups

4. **Analytics Dashboard**
   - Most downloaded papers
   - Popular subjects/grades
   - Usage trends over time

5. **Content Management**
   - Admin panel for uploading papers
   - Bulk upload functionality
   - Automated paper organization

6. **Mobile App**
   - Native iOS/Android apps
   - Offline download and viewing
   - Push notifications for new papers

### Technical Debt Considerations

- Migrate from static JSON to database (when > 500 papers)
- Implement backend API for better scalability
- Add CDN for PDF file delivery
- Implement proper authentication system (OAuth)
- Add automated testing in CI/CD pipeline
