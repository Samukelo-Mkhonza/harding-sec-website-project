# Project Structure

## Directory Organization

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Fixed header with navigation
│   ├── Navigation.js   # Desktop navigation with dropdowns
│   ├── MobileMenu.js   # Mobile slide-in menu
│   ├── Hero.js         # Hero section with slideshow
│   ├── NewsCarousel.js # News/events carousel
│   ├── Footer.js       # Site footer
│   └── ScrollToTop.js  # Scroll restoration utility
│
├── pages/              # Page-level components (route targets)
│   ├── Home.js         # Landing page
│   ├── About.js        # About the school
│   ├── Academics.js    # Academic programs
│   ├── Admissions.js   # Admissions information
│   ├── StudentLife.js  # Extracurricular activities
│   ├── Gallery.js      # Photo gallery
│   └── Contact.js      # Contact form and info
│
├── styles/             # Style-related files
│   ├── GlobalStyles.js # Styled-components global styles (legacy)
│   ├── HeroSection.css # Hero-specific styles (legacy)
│   ├── Navbar.css      # Navigation styles (legacy)
│   └── theme.js        # Theme constants (legacy, use Tailwind config)
│
├── images/             # Image assets
│   └── images.png
│
├── utils/              # Utility functions and constants
│   └── constants.js    # App-wide constants
│
├── App.js              # Main app component with routing
├── App.css             # App-specific styles
├── index.js            # React entry point
└── index.css           # Global styles with Tailwind directives
```

## Component Architecture

### Layout Components
- **Header**: Fixed header that compresses on scroll, includes top bar with contact info
- **Navigation**: Desktop-only dropdown navigation
- **MobileMenu**: Slide-in menu for mobile/tablet devices
- **Footer**: Multi-column footer with links, newsletter, and contact info

### Content Components
- **Hero**: Configurable hero section with slideshow, CTAs, and statistics
- **NewsCarousel**: Swiper-based carousel for news and events
- **InfoSection**: Reusable content sections (if exists)

### Page Components
Each page component represents a full route and typically includes:
- Hero section (using Hero component)
- Multiple content sections
- Call-to-action elements
- Relevant images and media

## Styling Approach

### Primary: Tailwind CSS
- Use Tailwind utility classes for all new components
- Custom utilities defined in `tailwind.config.js`
- Global styles and custom classes in `src/index.css`

### Legacy: Styled Components & CSS
- Some older components use styled-components
- Gradually migrate to Tailwind for consistency
- Keep existing styles functional during transition

## File Naming Conventions

- **Components**: PascalCase (e.g., `Header.js`, `NewsCarousel.js`)
- **Pages**: PascalCase (e.g., `Home.js`, `About.js`)
- **Utilities**: camelCase (e.g., `constants.js`)
- **Styles**: kebab-case for CSS files (e.g., `hero-section.css`)

## Component Patterns

### Functional Components with Hooks
All components use functional components with React hooks (useState, useEffect, etc.)

### Props-Based Configuration
Components like Hero accept props for customization:
```javascript
<Hero
  title="Custom Title"
  subtitle="Custom Subtitle"
  images={[...]}
  primaryCTA={{ text: "...", link: "..." }}
/>
```

### Responsive Design
- Mobile-first approach
- Conditional rendering based on screen size
- Tailwind responsive classes (sm:, md:, lg:, xl:)
- `isMobile` state for complex responsive logic

## Asset Management

- **Public folder**: Static assets (favicon, logos, manifest)
- **src/images**: Component-specific images
- **External URLs**: Placeholder images from Unsplash (replace with real assets)

## State Management

- Local component state with useState
- No global state management (Redux, Context) currently
- Page navigation via React Router
- Form state managed locally in components

## Routing

Routes defined in `App.js` using React Router:
- `/` - Home
- `/about` - About
- `/academics` - Academics
- `/admissions` - Admissions
- `/student-life` - Student Life
- `/gallery` - Gallery
- `/contact` - Contact
