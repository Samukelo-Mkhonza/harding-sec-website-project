import { useInView } from 'react-intersection-observer';

/**
 * AnimateOnScroll - Reusable scroll-triggered animation wrapper
 *
 * Uses react-intersection-observer to detect when elements enter the viewport,
 * then applies CSS animation classes defined in tailwind.config.js.
 *
 * Respects prefers-reduced-motion via CSS media query in index.css.
 */
const AnimateOnScroll = ({
  children,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.15,
  triggerOnce = true,
  className = '',
  as: Component = 'div',
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const animationClass = inView ? `animate-${animation}` : 'opacity-0';
  const delayStyle = delay ? { animationDelay: `${delay}ms`, animationFillMode: 'both' } : { animationFillMode: 'both' };

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${className}`}
      style={inView ? delayStyle : { opacity: 0 }}
    >
      {children}
    </Component>
  );
};

export default AnimateOnScroll;
