import React from 'react';

/**
 * SkeletonLoader Component
 * Displays placeholder UI while content is loading
 * 
 * @param {string} variant - Type of skeleton (text, card, image, avatar)
 * @param {number} count - Number of skeleton elements to render
 * @param {string} width - Width of skeleton
 * @param {string} height - Height of skeleton
 * @param {string} animation - Animation type (pulse, wave)
 * @param {string} className - Additional CSS classes
 */
const SkeletonLoader = ({
  variant = 'text',
  count = 1,
  width,
  height,
  animation = 'pulse',
  className = '',
}) => {
  const baseClasses = 'bg-neutral-200 rounded';
  const animationClasses = animation === 'pulse' ? 'animate-pulse' : 'animate-wave';

  const renderSkeleton = (index) => {
    switch (variant) {
      case 'text':
        return (
          <div
            key={index}
            className={`${baseClasses} ${animationClasses} h-4 mb-2 ${className}`}
            style={{
              width: width || `${100 - (index % 3) * 10}%`,
              height: height || '1rem',
            }}
          />
        );

      case 'card':
        return (
          <div
            key={index}
            className={`${baseClasses} ${animationClasses} p-4 ${className}`}
            style={{ width: width || '100%', height: height || '300px' }}
          >
            {/* Card image skeleton */}
            <div className="bg-neutral-300 rounded h-48 mb-4" />
            
            {/* Card title skeleton */}
            <div className="bg-neutral-300 rounded h-6 mb-2 w-3/4" />
            
            {/* Card text skeleton */}
            <div className="bg-neutral-300 rounded h-4 mb-2 w-full" />
            <div className="bg-neutral-300 rounded h-4 mb-2 w-5/6" />
            <div className="bg-neutral-300 rounded h-4 w-2/3" />
          </div>
        );

      case 'image':
        return (
          <div
            key={index}
            className={`${baseClasses} ${animationClasses} ${className}`}
            style={{
              width: width || '100%',
              height: height || '200px',
              aspectRatio: '16/9',
            }}
          />
        );

      case 'avatar':
        return (
          <div
            key={index}
            className={`${baseClasses} ${animationClasses} rounded-full ${className}`}
            style={{
              width: width || '48px',
              height: height || '48px',
            }}
          />
        );

      default:
        return (
          <div
            key={index}
            className={`${baseClasses} ${animationClasses} ${className}`}
            style={{ width, height }}
          />
        );
    }
  };

  return (
    <div className="skeleton-loader">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
};

/**
 * Specialized skeleton components for common use cases
 */
export const SkeletonText = (props) => <SkeletonLoader variant="text" {...props} />;
export const SkeletonCard = (props) => <SkeletonLoader variant="card" {...props} />;
export const SkeletonImage = (props) => <SkeletonLoader variant="image" {...props} />;
export const SkeletonAvatar = (props) => <SkeletonLoader variant="avatar" {...props} />;

export default SkeletonLoader;
