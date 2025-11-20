# Harding Secondary School Website

A modern, responsive website for Harding Secondary School in KwaZulu-Natal, South Africa. Built with React 19 and Tailwind CSS, this site showcases the school's 70+ year legacy of educational excellence and serves as the primary digital presence for prospective students, parents, and the community.

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

## ✨ Key Features

### User Experience
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Performance Optimized**: Lazy loading, code splitting, and optimized images
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and sitemap for search engines
- **Progressive Enhancement**: Works on older browsers with graceful degradation

### Components
- **Hero Section**: Dynamic image slideshow showcasing school life
- **News Carousel**: Swiper-based carousel for news and events
- **Photo Gallery**: Filterable gallery with lightbox functionality
- **Mega Menu**: Advanced navigation with dropdown menus
- **Search Overlay**: Site-wide search functionality
- **Newsletter Form**: Email subscription with validation
- **Contact Forms**: Inquiry and application forms
- **Breadcrumbs**: Hierarchical navigation for better UX
- **Back to Top**: Smooth scroll to top button
- **Toast Notifications**: User feedback system
- **Loading States**: Skeleton loaders and progress indicators
- **Error Boundaries**: Graceful error handling

### Advanced Features
- **Parallax Effects**: Smooth scrolling animations
- **Intersection Observer**: Scroll-triggered animations
- **Counter Animations**: Animated statistics
- **Tabbed Content**: Organized information display
- **Accordion Components**: Collapsible content sections
- **Lazy Image Loading**: Performance-optimized image loading
- **Route Progress**: Visual feedback during navigation

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
│   ├── Header.js       # Fixed header with navigation
│   ├── MegaMenu.js     # Advanced dropdown navigation
│   ├── MobileMenu.js   # Mobile slide-in menu
│   ├── Hero.js         # Hero section with slideshow
│   ├── NewsCarousel.js # News/events carousel
│   ├── FilterableGallery.js # Photo gallery with filters
│   ├── SearchOverlay.js # Site-wide search
│   ├── NewsletterForm.js # Email subscription
│   ├── Breadcrumbs.js  # Navigation breadcrumbs
│   ├── BackToTop.js    # Scroll to top button
│   ├── LazyImage.js    # Lazy loading images
│   ├── SkeletonLoader.js # Loading placeholders
│   ├── ProgressBar.js  # Route progress indicator
│   ├── ParallaxSection.js # Parallax effects
│   ├── CounterAnimation.js # Animated counters
│   ├── TabbedContent.js # Tab interface
│   ├── Accordion.js    # Collapsible sections
│   ├── SEO.js          # SEO meta tags
│   ├── ErrorBoundary.js # Error handling
│   └── Footer.js       # Site footer
│
├── pages/              # Page-level components
│   ├── Home.js         # Landing page
│   ├── About.js        # About the school
│   ├── Academics.js    # Academic programs
│   ├── Admissions.js   # Admissions information
│   ├── StudentLife.js  # Extracurricular activities
│   ├── Gallery.js      # Photo gallery page
│   ├── Contact.js      # Contact form and info
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
│   └── accessibility.js # A11y helpers
│
├── styles/             # Style files
│   ├── GlobalStyles.js # Global styled-components
│   └── theme.js        # Theme constants
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
- **React Icons 5.5.0** - Icon library
- **Lucide React 0.511.0** - Additional icons
- **Swiper 12.0.3** - Touch-enabled carousel
- **Yet Another React Lightbox 3.25.0** - Image lightbox
- **React Intersection Observer 9.16.0** - Scroll animations

### Additional Tools
- **React Helmet Async 2.0.5** - SEO meta tags
- **React Hot Toast 2.6.0** - Toast notifications
- **Web Vitals 4.2.4** - Performance monitoring
- **Sharp 0.34.5** - Image optimization

### Testing
- **@testing-library/react 16.3.0** - Component testing
- **@testing-library/jest-dom 6.9.1** - Jest matchers
- **@testing-library/user-event 14.6.1** - User interaction testing

## 🎨 Design System

### Brand Colors
- **Primary Blue**: `#19467E` - Main brand color
- **Secondary Green**: `#00A651` - Accent color
- **Dark**: `#0D3F2F` - Text and backgrounds
- **Light**: `#F8F9FA` - Backgrounds

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

## 🧪 Testing

The project includes comprehensive unit tests for components, hooks, and contexts.

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Header.test.js
```

### Test Coverage
- Components: Header, MegaMenu, Breadcrumbs, BackToTop, ParallaxSection, ProgressBar, SkeletonLoader, LazyImage, SearchOverlay, NewsletterForm
- Contexts: ToastContext
- All tests use React Testing Library best practices

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

## 🔧 Configuration

### Tailwind Configuration
Customize design tokens in `tailwind.config.js`:
- Colors, fonts, spacing
- Breakpoints and screens
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
