import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer API
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.root - Root element selector
 * @param {string} options.rootMargin - Root margin
 * @param {boolean} options.triggerOnce - Only trigger once
 * @returns {Array} - [ref, isIntersecting, entry]
 */
const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (triggerOnce && hasTriggered.current) {
          return;
        }

        setIsIntersecting(isElementIntersecting);
        setEntry(entry);

        if (isElementIntersecting && triggerOnce) {
          hasTriggered.current = true;
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting, entry];
};

export default useIntersectionObserver;
