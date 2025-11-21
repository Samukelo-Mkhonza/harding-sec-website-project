# Harding Secondary School Website

A premium, modern website for Harding Secondary School in KwaZulu-Natal, South Africa. Built with React 19 and Tailwind CSS, this site showcases the school's 70+ year legacy of educational excellence and serves as the primary digital presence for prospective students, parents, and the community. Features a professional green and white color scheme, advanced UI/UX patterns, and a dedicated student portal for accessing past examination papers.

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-Private-red)

## 🎯 Purpose

- Present school information, programs, and achievements to prospective families
- Provide easy access to admissions information and application processes
- Showcase academic excellence (95% matric pass rate, 67% bachelor's pass)
- Highlight extracurricular activities including sports, arts, and leadership programs
- Share news, events, and announcements with the school community
- Facilitate contact and communication with school administration
- Provide students with centralized access to past examination papers and study materials

## 🆕 Recent Enhancements

### Green & White Redesign (2024)
Complete visual redesign implementing a professional green and white color scheme:
- Replaced blue-based palette with green shades (700-950)
- Implemented consistent spacing system throughout
- Enhanced accessibility with WCAG AA compliant contrast ratios
- Unified icon system using FontAwesome
- Improved text readability with shadows and overlays

### Student Past Papers Portal (2024)
Dedicated portal for accessing examination materials:
- Browse and filter papers by grade, subject, year, and exam type
- Search functionality across all papers
- PDF preview and download capabilities
- Access to marking memos and guidelines
- Bookmark favorite papers for quick access
- Authentication system for student access
- Virtual scrolling for performance with large datasets

### Premium UI/UX Enhancement (2024)
Advanced interactions and polish:
- Scroll-triggered animations and parallax effects
- Smart navigation that adapts to scroll behavior
- Skeleton loaders and loading states
- Toast notifications for user feedback
- Enhanced mega menu navigation
- Improved mobile responsiveness
- Performance optimizations (Lighthouse 90+)

## ✨ Key Features

### Design & Branding
- **Professional Color Scheme**: Green and white palette (green-700 to green-950) reflecting school branding
- **Consistent Spacing**: Polished, professional layout with systematic spacing throughout
- **Premium UI/UX**: Advanced micro-interactions, smooth transitions, and polished animations
- **FontAwesome Icons**: Unified visual language with consistent iconography

### User Experience
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Performance Optimized**: Lazy loading, code splitting, and optimized images
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and sitemap for search engines
- **Smart Navigation**: Header that adapts to scroll behavior with mega menu dropdowns

### Student Portal
- **Past Papers Access**: Dedicated portal for browsing and downloading examination papers
- **Advanced Filtering**: Filter by grade, subject, year, and examination type
- **Search Functionality**: Keyword search across all papers
- **PDF Preview**: In-browser preview before downloading
- **Marking Memos**: Access to marking guidelines alongside papers
- **Bookmarking**: Save favorite papers for quick access
- **Recently Added**: Quick access to latest uploaded materials
- **Authentication**: Simple access control with school credentials

### Core Components
- **Hero Section**: Dynamic image slideshow with parallax effects
- **News Carousel**: Swiper-based carousel for news and events
- **Photo Gallery**: Filterable gallery with lightbox functionality
- **Mega Menu**: Advanced navigation with organized dropdown columns
- **Search Overlay**: Site-wide search with auto-complete suggestions
- **Newsletter Form**: Email subscription with validation
- **Contact Forms**: Inquiry and application forms with real-time validation
- **Breadcrumbs**: Hierarchical navigation for better UX
- **Back to Top**: Smooth scroll to top button
- **Toast Notifications**: User feedback system for actions
- **Loading States**: Skeleton loaders and progress indicators
- **Error Boundaries**: Graceful error handling with custom error pages

### Advanced Features
- **Parallax Effects**: Smooth scrolling animations on hero sections
- **Intersection Observer**: Scroll-triggered fade-in and slide-up animations
- **Counter Animations**: Animated statistics and achievement numbers
- **Tabbed Content**: Organized information display
- **Accordion Components**: Collapsible FAQ and content sections
- **Lazy Image Loading**: Performance-optimized image loading with blur-up effect
- **Route Progress**: Visual feedback during navigation
- **Virtual Scrolling**: Efficient rendering for large lists (React Window)

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd harding-sec-website-project

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development

```bash
npm start
```
Runs the app in development mode with hot reloading.

### Testing

```bash
npm test
```
Launches the test runner in interactive watch mode.

### Building

```bash
npm run build
```
Creates an optimized production build in the `build` folder.

### Image Optimization

```bash
npm run optimize-images
```
Optimizes images in the public directory using Sharp (runs automatically before build).

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Fixed header with scroll behavior
│   ├── Navigation.js   # Desktop navigation with mega menu
│   ├── MegaMenu.js     # Advanced dropdown navigation
│   ├── MobileMenu.js   # Mobile slide-in menu
│   ├── Hero.js         # Hero section with slideshow
│   ├── NewsCarousel.js # News/events carousel
│   ├── FilterableGallery.js # Photo gallery with filters
│   ├── SearchOverlay.js # Site-wide search
│   ├── ContactForm.js  # Contact form with validation
│   ├── NewsletterForm.js # Email subscription
│   ├── Breadcrumbs.js  # Navigation breadcrumbs
│   ├── BackToTop.js    # Scroll to top button
│   ├── LazyImage.js    # Lazy loading images
│   ├── ResponsiveImage.js # Responsive image component
│   ├── SkeletonLoader.js # Loading placeholders
│   ├── ProgressBar.js  # Route progress indicator
│   ├── ParallaxSection.js # Parallax effects
│   ├── CounterAnimation.js # Animated counters
│   ├── TabbedContent.js # Tab interface
│   ├── Accordion.js    # Collapsible sections
│   ├── InfoSection.js  # Reusable content sections
│   ├── GoogleMap.js    # Embedded map component
│   ├── SEO.js          # SEO meta tags
│   ├── ErrorBoundary.js # Error handling
│   ├── ScrollToTop.js  # Scroll restoration utility
│   ├── Footer.js       # Site footer
│   └── portal/         # Student portal components
│       ├── AuthenticationGate.js # Portal access control
│       ├── FilterPanel.js # Multi-criteria filtering
│       ├── SearchBar.js # Portal search functionality
│       ├── PaperCard.js # Individual paper display
│       └── PapersList.js # Papers list with virtual scrolling
│
├── pages/              # Page-level components
│   ├── Home.js         # Landing page
│   ├── About.js        # About the school
│   ├── Academics.js    # Academic programs
│   ├── Admissions.js   # Admissions information
│   ├── StudentLife.js  # Extracurricular activities
│   ├── Gallery.js      # Photo gallery page
│   ├── Contact.js      # Contact form and info
│   ├── PastPapersPortal.js # Student past papers portal
│   ├── NotFound.js     # 404 error page
│   └── ServerError.js  # 500 error page
│
├── contexts/           # React Context providers
│   ├── UIContext.js    # UI state management
│   ├── LoadingContext.js # Loading state
│   └── ToastContext.js # Toast notifications
│
├── hooks/              # Custom React hooks
│   ├── useIntersectionObserver.js # Scroll animations
│   ├── useScrollPosition.js # Scroll tracking
│   ├── useScrollDirection.js # Scroll direction
│   └── useRouteProgress.js # Route loading
│
├── utils/              # Utility functions
│   ├── constants.js    # App-wide constants
│   ├── animations.js   # Animation utilities
│   ├── accessibility.js # A11y helpers
│   ├── imageConstants.js # Image path constants
│   ├── portalConstants.js # Portal configuration
│   ├── portalStorage.js # Portal local storage utilities
│   ├── downloadUtils.js # File download helpers
│   └── filterUtils.js  # Portal filtering logic
│
├── styles/             # Style files
│   ├── GlobalStyles.js # Global styled-components
│   ├── theme.js        # Theme constants
│   ├── HeroSection.css # Hero-specific styles
│   └── Navbar.css      # Navigation styles
│
├── images/             # Image assets
│   ├── logo.png        # School logo
│   └── images.png      # Additional images
│
├── App.js              # Main app component
├── AppRouter.js        # Route configuration
├── AppProviders.js     # Context providers wrapper
├── index.js            # React entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Technology Stack

### Core
- **React 19.0.0** - Modern UI library with hooks
- **React Router DOM 7.6.0** - Client-side routing
- **Create React App 5.0.1** - Build tooling

### Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Styled Components 6.1.15** - CSS-in-JS (legacy)
- **PostCSS 8.5.6** - CSS processing

### UI Libraries
- **Framer Motion 12.12.1** - Animation library
- **React Icons 5.5.0** - Icon library (FontAwesome)
- **Lucide React 0.511.0** - Additional icons
- **Swiper 12.0.3** - Touch-enabled carousel
- **Yet Another React Lightbox 3.25.0** - Image lightbox
- **React Intersection Observer 9.16.0** - Scroll animations
- **React Window 2.2.3** - Virtual scrolling for large lists

### Additional Tools
- **React Helmet Async 2.0.5** - SEO meta tags
- **React Hot Toast 2.6.0** - Toast notifications
- **Web Vitals 4.2.4** - Performance monitoring
- **Sharp 0.34.5** - Image optimization

### Testing
- **@testing-library/react 16.3.0** - Component testing
- **@testing-library/jest-dom 6.9.1** - Jest matchers
- **@testing-library/user-event 14.6.1** - User interaction testing
- **Fast-check 4.3.0** - Property-based testing library

## 🎨 Design System

### Brand Colors
- **Primary Green**: `#147538` (green-700) - Main brand color
- **Secondary Green**: `#0D4E25` (green-800) - Secondary brand color
- **Dark Green**: `#072713` (green-900) - Dark accents
- **Darkest Green**: `#04160A` (green-950) - Darkest accents
- **White**: `#FFFFFF` - Backgrounds and text
- **Light Gray**: `#F8F9FA` - Subtle backgrounds

### Typography
- **Headings**: Montserrat (bold, semi-bold)
- **Body**: Open Sans (regular, medium)
- **Display**: Playfair Display (decorative)

### Responsive Breakpoints
- **xs**: 480px - Small phones
- **sm**: 768px - Tablets
- **md**: 1024px - Small laptops
- **lg**: 1200px - Desktops
- **xl**: 1440px - Large screens

### Spacing & Layout
- **Consistent Spacing**: Systematic use of Tailwind spacing scale
- **Card Spacing**: 24px between cards
- **Border Radius**: 12px for cards and panels
- **Shadow Elevation**: 0-10px on hover states

## 🧪 Testing

The project includes comprehensive unit tests and property-based tests for components, hooks, contexts, and utilities.

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Header.test.js
```

### Test Coverage
- **Components**: Header, MegaMenu, Breadcrumbs, BackToTop, ParallaxSection, ProgressBar, SkeletonLoader, LazyImage, SearchOverlay, NewsletterForm
- **Pages**: PastPapersPortal
- **Contexts**: ToastContext
- **Utils**: filterUtils, portalStorage
- **Testing Approaches**: Unit tests for specific behaviors, property-based tests for universal properties
- All tests use React Testing Library best practices and Fast-check for property-based testing

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder with:
- Minified JavaScript and CSS
- Optimized images
- Cache-busting file names
- Source maps for debugging

### Deployment Options

The build folder can be deployed to:
- **Netlify**: Drag and drop or connect to Git
- **Vercel**: Import project from Git
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build folder to S3 bucket
- **Traditional Hosting**: Upload build folder via FTP

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📚 Additional Documentation

- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Development guidelines
- [Code Splitting Guide](CODE_SPLITTING_GUIDE.md) - Performance optimization
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Deployment instructions
- [Project Completion Summary](PROJECT_COMPLETION_SUMMARY.md) - Feature overview
- [Redesign Summary](REDESIGN_SUMMARY.md) - Green/white color scheme redesign
- [Past Papers Portal Summary](PAST_PAPERS_PORTAL_IMPLEMENTATION_SUMMARY.md) - Student portal implementation
- [Responsive Design Audit](RESPONSIVE_DESIGN_AUDIT.md) - Mobile responsiveness review
- [Image Audit Summary](IMAGE_AUDIT_SUMMARY.md) - Image optimization details

### Spec-Driven Development

This project uses spec-driven development with formal requirements, design documents, and implementation plans:

- **Green/White Redesign**: `.kiro/specs/green-white-redesign/`
- **Student Past Papers Portal**: `.kiro/specs/student-past-papers-portal/`
- **Premium Enhancement**: `.kiro/specs/website-premium-enhancement/`

Each spec includes:
- `requirements.md` - User stories and acceptance criteria (EARS format)
- `design.md` - Architecture, components, and correctness properties
- `tasks.md` - Implementation task list with testing requirements

## 🗺️ Routes

The application includes the following routes:

- `/` - Home page with hero, news carousel, and key information
- `/about` - About the school, history, and mission
- `/academics` - Academic programs and curriculum
- `/admissions` - Admissions process and requirements
- `/student-life` - Extracurricular activities and student services
- `/gallery` - Photo gallery with category filtering
- `/contact` - Contact form and school information
- `/past-papers` - Student portal for accessing examination papers
- `*` - 404 Not Found page for invalid routes

## 🔧 Configuration

### Tailwind Configuration
Customize design tokens in `tailwind.config.js`:
- Green color palette (700-950 shades)
- Typography (Montserrat, Open Sans, Playfair Display)
- Responsive breakpoints
- Custom utilities and plugins

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## 🤝 Contributing

This is a private project for Harding Secondary School. For internal development:

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Write/update tests for new features
4. Ensure all tests pass
5. Submit a pull request for review

## 📄 License

Private - All rights reserved by Harding Secondary School

## 📞 Contact

For questions or support regarding this website:
- **Email**: info@hardingsec.co.za
- **Phone**: +27 (0)39 433 1149
- **Address**: Harding Secondary School, KwaZulu-Natal, South Africa

---

Built with ❤️ for Harding Secondary School
