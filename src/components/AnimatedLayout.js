// components/AnimatedLayout.js
import React, { Suspense, useLayoutEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * Layout route for every page: resets scroll on navigation, handles Suspense
 * for lazy pages and plays a short CSS entrance animation.
 *
 * This used framer-motion's AnimatePresence, which put ~40 kB of animation
 * library in the initial bundle for a 300 ms fade. A keyed CSS animation gives
 * the same entrance; prefers-reduced-motion is honoured globally in index.css.
 */
const AnimatedLayout = ({ fallback = null }) => {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className="animate-page-in">
      <Suspense fallback={fallback}>{outlet}</Suspense>
    </div>
  );
};

export default AnimatedLayout;
