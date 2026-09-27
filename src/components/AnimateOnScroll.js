import { useInView } from 'react-intersection-observer';

// Pages historically used a few names that never had keyframes; map them so
// every element animates the same way instead of some silently not animating.
const ALIASES = {
  fade: 'fade-in',
  'fade-up': 'slide-up',
};
const SUPPORTED = new Set(['fade-in', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom-in']);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * AnimateOnScroll — plays a one-off entrance animation when the element
 * scrolls into view.
 *
 * Content is only hidden while we know an observer will reveal it: without
 * IntersectionObserver, with reduced motion, or when printing it is shown as-is.
 */
const AnimateOnScroll = ({
  children,
  animation = 'fade-in',
  delay = 0,
  threshold = 0,
  triggerOnce = true,
  className = '',
  as: Component = 'div',
}) => {
  const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const skip = !canObserve || prefersReducedMotion();

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    skip,
    fallbackInView: true,
    rootMargin: '0px 0px -40px 0px',
  });

  if (skip) {
    return <Component className={className}>{children}</Component>;
  }

  const name = ALIASES[animation] || animation;
  const animationClass = SUPPORTED.has(name) ? `animate-${name}` : 'animate-fade-in';

  return (
    <Component
      ref={ref}
      className={`${inView ? animationClass : 'opacity-0 print:opacity-100'} ${className}`}
      style={inView ? { animationDelay: delay ? `${Math.min(delay, 400)}ms` : undefined, animationFillMode: 'both' } : undefined}
    >
      {children}
    </Component>
  );
};

export default AnimateOnScroll;
