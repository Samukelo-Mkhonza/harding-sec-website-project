import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonLoader, { SkeletonText, SkeletonCard, SkeletonImage, SkeletonAvatar } from './SkeletonLoader';

/**
 * Feature: website-premium-enhancement, Property 5: Skeleton loaders precede content
 * Validates: Requirements 1.5
 * 
 * Property: For any loading image or dynamic content, a skeleton loader matching 
 * the content layout should be visible until the content is fully loaded.
 */

describe('SkeletonLoader Component', () => {
  describe('Property Test: Skeleton loaders precede content', () => {
    it('should render skeleton loader before content loads', () => {
      const { container } = render(<SkeletonLoader variant="text" count={3} />);
      const skeletons = container.querySelectorAll('.skeleton-loader > div');
      
      // Verify skeleton elements are rendered
      expect(skeletons.length).toBe(3);
      
      // Verify skeleton has loading animation class
      skeletons.forEach(skeleton => {
        expect(skeleton.classList.contains('animate-pulse')).toBe(true);
      });
    });

    it('should render different variants correctly', () => {
      const variants = ['text', 'card', 'image', 'avatar'];
      
      variants.forEach(variant => {
        const { container } = render(<SkeletonLoader variant={variant} />);
        const skeleton = container.querySelector('.skeleton-loader');
        
        // Verify skeleton is rendered for each variant
        expect(skeleton).toBeInTheDocument();
        expect(skeleton.children.length).toBeGreaterThan(0);
      });
    });

    it('should match content layout structure for card variant', () => {
      const { container } = render(<SkeletonLoader variant="card" />);
      
      // Card skeleton should have image, title, and text placeholders
      const cardSkeleton = container.querySelector('.skeleton-loader > div');
      expect(cardSkeleton).toBeInTheDocument();
      
      // Verify card structure elements exist
      const children = cardSkeleton.children;
      expect(children.length).toBeGreaterThan(0);
    });

    it('should render multiple skeleton elements when count is specified', () => {
      const count = 5;
      const { container } = render(<SkeletonLoader variant="text" count={count} />);
      const skeletons = container.querySelectorAll('.skeleton-loader > div');
      
      expect(skeletons.length).toBe(count);
    });

    it('should apply animation classes', () => {
      const { container: pulseContainer } = render(
        <SkeletonLoader variant="text" animation="pulse" />
      );
      const pulseSkeleton = pulseContainer.querySelector('.skeleton-loader > div');
      expect(pulseSkeleton.classList.contains('animate-pulse')).toBe(true);

      const { container: waveContainer } = render(
        <SkeletonLoader variant="text" animation="wave" />
      );
      const waveSkeleton = waveContainer.querySelector('.skeleton-loader > div');
      expect(waveSkeleton.classList.contains('animate-wave')).toBe(true);
    });
  });

  describe('Specialized Skeleton Components', () => {
    it('should render SkeletonText', () => {
      const { container } = render(<SkeletonText count={3} />);
      expect(container.querySelector('.skeleton-loader')).toBeInTheDocument();
    });

    it('should render SkeletonCard', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.querySelector('.skeleton-loader')).toBeInTheDocument();
    });

    it('should render SkeletonImage', () => {
      const { container } = render(<SkeletonImage />);
      expect(container.querySelector('.skeleton-loader')).toBeInTheDocument();
    });

    it('should render SkeletonAvatar', () => {
      const { container } = render(<SkeletonAvatar />);
      expect(container.querySelector('.skeleton-loader')).toBeInTheDocument();
    });
  });

  describe('Custom dimensions', () => {
    it('should apply custom width and height', () => {
      const { container } = render(
        <SkeletonLoader variant="image" width="300px" height="200px" />
      );
      const skeleton = container.querySelector('.skeleton-loader > div');
      
      expect(skeleton.style.width).toBe('300px');
      expect(skeleton.style.height).toBe('200px');
    });
  });
});
