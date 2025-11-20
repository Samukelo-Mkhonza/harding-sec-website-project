import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll direction
 * @param {number} threshold - Minimum scroll distance to trigger direction change
 * @returns {Object} - { scrollY, scrollDirection, isScrolled }
 */
const useScrollDirection = (threshold = 0) => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      setScrollState({
        scrollY,
        scrollDirection: scrollY !== lastScrollY ? direction : null,
        isScrolled: scrollY > threshold,
      });

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrollState;
};

export default useScrollDirection;
