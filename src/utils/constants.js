/**
 * Application-wide constants
 */

// Scroll thresholds
export const SCROLL_THRESHOLDS = {
  HEADER_MINIMIZE: 100, // px
  BACK_TO_TOP: 500, // px
  PARALLAX_START: 0, // px
};

// Animation durations (ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 600,
  COUNTER: 2000,
  TOAST_SUCCESS: 4000,
  CAROUSEL_INTERVAL: 5000,
};

// Intersection Observer thresholds
export const INTERSECTION_THRESHOLDS = {
  TRIGGER_ANIMATION: 0.1,
  LAZY_LOAD: 0.01,
  COUNTER_START: 0.3,
};

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};

// Performance targets
export const PERFORMANCE_TARGETS = {
  LIGHTHOUSE_SCORE: 90,
  FCP: 1800, // ms
  LCP: 2500, // ms
  FID: 100, // ms
  CLS: 0.1,
};

// Cache configuration
export const CACHE_CONFIG = {
  MAX_SIZE: 50 * 1024 * 1024, // 50MB
  STATIC_CACHE_NAME: 'harding-static-v1',
  DYNAMIC_CACHE_NAME: 'harding-dynamic-v1',
  MAX_AGE: 365 * 24 * 60 * 60 * 1000, // 1 year
};

// Form validation
export const VALIDATION = {
  DEBOUNCE_DELAY: 300, // ms
  MIN_SEARCH_CHARS: 3,
  MAX_META_DESCRIPTION: 160,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Gallery configuration
export const GALLERY_CONFIG = {
  ITEMS_PER_PAGE: 12,
  FILTER_ANIMATION_DURATION: 400, // ms
};

// Toast notification positions
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

// Accessibility
export const A11Y = {
  FOCUS_OUTLINE_WIDTH: 2, // px
  MIN_CONTRAST_RATIO: 4.5,
  SKIP_LINK_ID: 'main-content',
};

// SEO
export const SEO = {
  OG_IMAGE_MIN_WIDTH: 1200,
  OG_IMAGE_MIN_HEIGHT: 630,
  SITE_NAME: 'Harding Secondary School',
  SITE_URL: 'https://hardingsec.co.za', // Update with actual URL
};

export default {
  SCROLL_THRESHOLDS,
  ANIMATION_DURATIONS,
  INTERSECTION_THRESHOLDS,
  BREAKPOINTS,
  PERFORMANCE_TARGETS,
  CACHE_CONFIG,
  VALIDATION,
  GALLERY_CONFIG,
  TOAST_POSITIONS,
  A11Y,
  SEO,
};
