// components/AnimatedLayout.js
import React, { Suspense, useLayoutEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Page transition variants: a subtle fade combined with a small vertical slide.
 * The outgoing page fades + lifts up, the incoming page fades + rises into place.
 */
const variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/**
 * Resets scroll to the top whenever a new page mounts. Because the parent uses
 * AnimatePresence mode="wait", this only mounts after the previous page has
 * finished animating out — so the outgoing page is never yanked mid-exit.
 */
const ScrollReset = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

/**
 * Layout route that wraps the active page in an animated container.
 * Keyed by pathname so AnimatePresence animates both the exit of the outgoing
 * page and the entrance of the incoming one. Honors prefers-reduced-motion by
 * rendering instant (no) transitions.
 */
const AnimatedLayout = ({ fallback = null }) => {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial={reduceMotion ? false : 'initial'}
        animate={reduceMotion ? false : 'enter'}
        exit={reduceMotion ? undefined : 'exit'}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollReset />
        <Suspense fallback={fallback}>{outlet}</Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
