import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ANIMATION_DURATIONS, INTERSECTION_THRESHOLDS } from '../utils/constants';

const CounterAnimation = ({
  end,
  start = 0,
  duration = ANIMATION_DURATIONS.COUNTER,
  suffix = '',
  prefix = '',
  decimals = 0,
  triggerOnView = true,
  className = '',
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: INTERSECTION_THRESHOLDS.COUNTER_START,
    triggerOnce: true,
  });

  useEffect(() => {
    if ((!triggerOnView || isIntersecting) && !hasAnimated) {
      setHasAnimated(true);
      const startTime = Date.now();
      const range = end - start;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentCount = start + range * easeProgress;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isIntersecting, triggerOnView, hasAnimated, start, end, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default CounterAnimation;
