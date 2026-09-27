/**
 * Public component exports. Keep this list to components that are actually
 * used — every entry here ends up in whichever chunk imports the barrel.
 */
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Hero } from './Hero';
export { default as SkeletonLoader, SkeletonText, SkeletonCard, SkeletonImage, SkeletonAvatar } from './SkeletonLoader';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as BackToTop } from './BackToTop';
export { default as CounterAnimation } from './CounterAnimation';
export { default as AnimateOnScroll } from './AnimateOnScroll';
export { default as ContactForm } from './ContactForm';
export { default as LazyImage } from './LazyImage';
export { default as SEO, SEOConfigs } from './SEO';
export * from './ui';
