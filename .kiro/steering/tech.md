# Technology Stack

## Core Framework

- **React 19.0.0** - Modern UI library with hooks and functional components
- **React Router DOM 7.6.0** - Client-side routing and navigation
- **Create React App** - Build tooling and development environment

## Styling & UI

- **Tailwind CSS 3.4.18** - Utility-first CSS framework (primary styling approach)
- **Styled Components 6.1.15** - CSS-in-JS (legacy, being phased out)
- **PostCSS 8.5.6** - CSS processing and autoprefixer
- **Custom CSS** - Global styles in `src/index.css` with Tailwind layers

### Design System

- **Brand Colors**: Primary blue (#19467E), Secondary green (#00A651), Dark (#0D3F2F)
- **Typography**: Montserrat (headings), Open Sans (body), Playfair Display (display)
- **Responsive Breakpoints**: xs (480px), sm (768px), md (1024px), lg (1200px), xl (1440px)

## UI Components & Libraries

- **Framer Motion 12.12.1** - Animation library for smooth transitions
- **React Icons 5.5.0** - Icon library (Font Awesome, Material Design, etc.)
- **Lucide React 0.511.0** - Additional icon set
- **Swiper 12.0.3** - Touch-enabled carousel/slider for news and galleries
- **Yet Another React Lightbox 3.25.0** - Image lightbox for gallery
- **React Intersection Observer 9.16.0** - Scroll-based animations and lazy loading

## Development Tools

- **React Scripts 5.0.1** - Build scripts and webpack configuration
- **Web Vitals 4.2.4** - Performance monitoring
- **ESLint** - Code linting (react-app config)

## Common Commands

```bash
# Development
npm start              # Start dev server at http://localhost:3000

# Building
npm run build          # Create production build in /build folder

# Testing
npm test               # Run tests in watch mode

# Other
npm run eject          # Eject from CRA (one-way operation, avoid unless necessary)
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance Considerations

- Images should be optimized before upload
- Lazy loading implemented for images and components
- Code splitting via React Router
- Tailwind CSS purges unused styles in production
- GPU-accelerated CSS transforms for animations
