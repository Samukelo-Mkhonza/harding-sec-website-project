import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

/**
 * ResponsiveImage Component
 * Provides WebP with fallback, responsive sizes, and lazy loading
 * 
 * @param {string} src - Base image path (without extension)
 * @param {string} alt - Alt text for accessibility
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {string} className - Additional CSS classes
 * @param {boolean} lazy - Enable lazy loading (default: true)
 * @param {string} fallbackExt - Fallback extension (.jpg or .png, default: .jpg)
 */
const ResponsiveImage = ({
  src,
  alt,
  sizes = '100vw',
  className = '',
  lazy = true,
  fallbackExt = '.jpg',
  ...props
}) => {
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Don't load until intersecting if lazy loading is enabled
  const shouldLoad = !lazy || isIntersecting;

  // Generate srcset for different sizes
  const generateSrcSet = (basePath, ext) => {
    const sizes = [
      { width: 320, suffix: '-sm' },
      { width: 768, suffix: '-md' },
      { width: 1024, suffix: '-lg' },
      { width: 1920, suffix: '-xl' },
    ];

    return sizes
      .map(size => `${basePath}${size.suffix}${ext} ${size.width}w`)
      .join(', ');
  };

  // Extract base path and filename
  const basePath = src.replace(/\.[^/.]+$/, ''); // Remove extension
  const webpSrcSet = generateSrcSet(basePath, '.webp');
  const fallbackSrcSet = generateSrcSet(basePath, fallbackExt);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {shouldLoad ? (
        <>
          {/* Loading placeholder */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
              <i className="fas fa-image text-neutral-400 text-2xl"></i>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p className="text-sm">Image failed to load</p>
              </div>
            </div>
          )}

          {/* Responsive picture element */}
          <picture>
            {/* WebP source with srcset */}
            <source
              type="image/webp"
              srcSet={webpSrcSet}
              sizes={sizes}
            />

            {/* Fallback source with srcset */}
            <source
              type={fallbackExt === '.png' ? 'image/png' : 'image/jpeg'}
              srcSet={fallbackSrcSet}
              sizes={sizes}
            />

            {/* Fallback img element */}
            <img
              src={`${basePath}${fallbackExt}`}
              alt={alt}
              loading={lazy ? 'lazy' : 'eager'}
              onLoad={handleLoad}
              onError={handleError}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              {...props}
            />
          </picture>
        </>
      ) : (
        // Placeholder before intersection
        <div className="w-full h-full bg-neutral-200 animate-pulse flex items-center justify-center">
          <i className="fas fa-image text-neutral-400 text-2xl"></i>
        </div>
      )}
    </div>
  );
};

/**
 * Simple responsive image without WebP (for when you have a full URL)
 */
export const SimpleResponsiveImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  ...props
}) => {
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const shouldLoad = !lazy || isIntersecting;

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {shouldLoad ? (
        <>
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
              <i className="fas fa-image text-neutral-400 text-2xl"></i>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p className="text-sm">Image failed to load</p>
              </div>
            </div>
          )}

          <img
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
        </>
      ) : (
        <div className="w-full h-full bg-neutral-200 animate-pulse flex items-center justify-center">
          <i className="fas fa-image text-neutral-400 text-2xl"></i>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
