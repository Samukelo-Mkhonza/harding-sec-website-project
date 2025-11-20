import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @returns {number} - Current scroll Y position
 */
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      setScrollY(window.pageYOffset);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    
    // Set initial position
    setScrollY(window.pageYOffset);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
};

export default useScrollPosition;
