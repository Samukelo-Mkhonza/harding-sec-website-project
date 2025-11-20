# Code Splitting Implementation Guide

## Overview

This project implements code splitting to optimize bundle sizes and improve initial load performance. Each page is lazy-loaded, and vendor libraries are split into separate chunks.

## Implementation

### 1. Route-Based Code Splitting

All page components are lazy-loaded using `React.lazy()`:

```javascript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
// ... other pages
```

### 2. Chunk Strategy

The webpack configuration splits code into the following chunks:

- **runtime**: Webpack runtime code (~5KB)
- **react-vendor**: React and ReactDOM (~130KB)
- **framer-motion**: Framer Motion library (~80KB)
- **vendors**: Other node_modules dependencies
- **common**: Shared code between pages
- **[page]**: Individual page chunks (lazy-loaded)

### 3. Bundle Size Targets

- Maximum chunk size: 200KB
- Initial bundle (runtime + react-vendor + main): ~150KB gzipped
- Each page chunk: ~30-50KB gzipped

## Usage

### Standard Build

```bash
npm run build
```

### Analyze Bundle Sizes

To analyze bundle sizes and see what's in each chunk:

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Run build with analyzer
ANALYZE=true npm run build
```

This will open an interactive treemap visualization of your bundle.

## Verification

### Check Chunk Sizes

After building, check the `build/static/js` directory:

```bash
ls -lh build/static/js
```

You should see multiple chunk files:
- `runtime-*.js` - Webpack runtime
- `react-vendor.*.chunk.js` - React libraries
- `framer-motion.*.chunk.js` - Framer Motion
- `vendors.*.chunk.js` - Other dependencies
- `[number].*.chunk.js` - Page chunks
- `main.*.chunk.js` - Main app code

### Lighthouse Performance

Run Lighthouse audit to verify:
- First Contentful Paint < 1.8s
- Time to Interactive < 3.8s
- Total Bundle Size < 500KB

## Best Practices

### 1. Lazy Load Heavy Components

For components that aren't needed immediately:

```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyPage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. Preload Critical Routes

For routes users are likely to visit:

```javascript
// Preload on hover
<Link 
  to="/about"
  onMouseEnter={() => import('./pages/About')}
>
  About
</Link>
```

### 3. Monitor Bundle Sizes

Regularly check bundle sizes:

```bash
npm run build
# Check the output for chunk sizes
```

### 4. Avoid Import Side Effects

Don't import entire libraries when you only need specific functions:

```javascript
// ❌ Bad - imports entire library
import _ from 'lodash';

// ✅ Good - imports only what's needed
import debounce from 'lodash/debounce';
```

## Troubleshooting

### Chunks Too Large

If chunks exceed 200KB:

1. Check for duplicate dependencies
2. Use dynamic imports for heavy libraries
3. Consider lazy loading more components
4. Use the bundle analyzer to identify large modules

### Too Many Chunks

If you have too many small chunks:

1. Adjust `minChunks` in webpack config
2. Increase `maxSize` limit
3. Reduce the number of lazy-loaded components

### Slow Initial Load

If initial load is slow:

1. Preload critical chunks
2. Inline critical CSS
3. Use resource hints (preload, prefetch)
4. Optimize images and fonts

## Performance Metrics

Target metrics for production:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Total Blocking Time**: < 200ms
- **Cumulative Layout Shift**: < 0.1

## Resources

- [React Code Splitting](https://reactjs.org/docs/code-splitting.html)
- [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [Web.dev Performance](https://web.dev/performance/)
