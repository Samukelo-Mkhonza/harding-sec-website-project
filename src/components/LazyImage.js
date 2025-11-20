import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const LazyImage = ({
  src,
  alt,
  placeholder,
  className = '',
  blurAmount = 20,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.01,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {isIntersecting && (
        <>
          {!isLoaded && placeholder && (
            <img
              src={placeholder}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: `blur(${blurAmount}px)` }}
              aria-hidden="true"
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
        </>
      )}
      {!isIntersecting && (
        <div className="w-full h-full bg-neutral-200 animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;
