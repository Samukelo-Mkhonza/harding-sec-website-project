import React, { useRef, useEffect, useState } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import { calculateParallax } from '../utils/animations';

/**
 * ParallaxSection Component
 * Creates parallax scrolling effect where background moves slower than foreground
 * 
 * @param {string} backgroundImage - URL of background image
 * @param {number} speed - Parallax speed (0-1, default 0.5 = 50% of scroll speed)
 * @param {ReactNode} children - Content to display over background
 * @param {boolean} overlay - Show gradient overlay for text readability
 * @param {number} overlayOpacity - Overlay opacity (0-1, default 0.5)
 * @param {string} overlayColor - Overlay color (default: 'from-primary/90 to-primary-dark/80')
 * @param {string} height - Section height (default: '500px')
 * @param {string} className - Additional CSS classes
 */
const ParallaxSection = ({
  backgroundImage,
  speed = 0.5,
  children,
  overlay = true,
  overlayOpacity = 0.5,
  overlayColor = 'from-primary/90 to-primary-dark/80',
  height = '500px',
  className = '',
}) => {
  const sectionRef = useRef(null);
  const scrollY = useScrollPosition();
  const [offsetTop, setOffsetTop] = useState(0);

  // Get section's offset from top of page
  useEffect(() => {
    if (sectionRef.current) {
      setOffsetTop(sectionRef.current.offsetTop);
    }
  }, []);

  // Calculate parallax transform
  const getParallaxTransform = () => {
    if (!sectionRef.current) return 0;
    
    // Calculate how much the section has been scrolled
    const scrolled = scrollY - offsetTop;
    
    // Only apply parallax when section is in view
    if (scrolled < -window.innerHeight || scrolled > window.innerHeight) {
      return 0;
    }
    
    return calculateParallax(scrolled, speed);
  };

  const parallaxOffset = getParallaxTransform();

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${parallaxOffset}px)`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        />
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
