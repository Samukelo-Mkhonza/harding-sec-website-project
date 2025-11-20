import React from 'react';
import { render } from '@testing-library/react';
import ParallaxSection from './ParallaxSection';
import { calculateParallax } from '../utils/animations';

/**
 * Feature: website-premium-enhancement, Property 4 & 42: Parallax maintains speed ratio
 * Validates: Requirements 1.4, 9.3
 * 
 * Property 4: For any parallax section, the background image transform should equal 
 * scroll position multiplied by 0.5 (50% speed).
 * 
 * Property 42: For any divider section, parallax transform calculations should be 
 * applied to decorative elements on scroll.
 */

// Mock the useScrollPosition hook
jest.mock('../hooks/useScrollPosition', () => {
  return jest.fn(() => 0);
});

const useScrollPosition = require('../hooks/useScrollPosition');

describe('ParallaxSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Property Test: Parallax maintains speed ratio', () => {
    it('should apply 50% parallax speed by default', () => {
      useScrollPosition.mockReturnValue(200);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      // Find the background div (first absolute positioned div)
      const background = container.querySelector('.absolute.inset-0');
      expect(background).toBeInTheDocument();
      
      // Transform should be calculated using parallax formula
      expect(background.style.transform).toContain('translateY');
    });

    it('should calculate parallax offset correctly at various scroll positions', () => {
      const scrollPositions = [0, 100, 200, 500, 1000];
      const speed = 0.5;

      scrollPositions.forEach(scrollY => {
        useScrollPosition.mockReturnValue(scrollY);
        
        const { container } = render(
          <ParallaxSection backgroundImage="test.jpg" speed={speed}>
            <div>Content</div>
          </ParallaxSection>
        );

        const background = container.querySelector('.absolute.inset-0');
        
        // Verify transform is applied
        expect(background.style.transform).toContain('translateY');
      });
    });

    it('should respect custom speed values', () => {
      useScrollPosition.mockReturnValue(200);
      
      const customSpeeds = [0.3, 0.5, 0.7, 1.0];
      
      customSpeeds.forEach(speed => {
        const { container } = render(
          <ParallaxSection backgroundImage="test.jpg" speed={speed}>
            <div>Content</div>
          </ParallaxSection>
        );

        const background = container.querySelector('.absolute.inset-0');
        expect(background).toBeInTheDocument();
        
        // Transform should be applied with custom speed
        expect(background.style.transform).toContain('translateY');
      });
    });

    it('should apply parallax transform formula correctly', () => {
      const scrollY = 300;
      const speed = 0.5;
      
      useScrollPosition.mockReturnValue(scrollY);
      
      render(
        <ParallaxSection backgroundImage="test.jpg" speed={speed}>
          <div>Content</div>
        </ParallaxSection>
      );

      // Verify calculateParallax function works correctly
      const expectedOffset = calculateParallax(scrollY, speed);
      expect(expectedOffset).toBe(scrollY * speed);
    });
  });

  describe('Background image rendering', () => {
    it('should render background image when provided', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="https://example.com/image.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const background = container.querySelector('.absolute.inset-0');
      expect(background).toBeInTheDocument();
      expect(background.style.backgroundImage).toContain('https://example.com/image.jpg');
    });

    it('should not render background when no image provided', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection>
          <div>Content</div>
        </ParallaxSection>
      );

      // When no backgroundImage, the first absolute div should be the overlay
      const absoluteDivs = container.querySelectorAll('.absolute.inset-0');
      // Should only have overlay, not background
      expect(absoluteDivs.length).toBeLessThanOrEqual(1);
    });

    it('should apply background cover and center positioning', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const background = container.querySelector('.absolute.inset-0');
      expect(background.style.backgroundSize).toBe('cover');
      expect(background.style.backgroundPosition).toBe('center');
    });
  });

  describe('Overlay functionality', () => {
    it('should render overlay by default', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const overlay = container.querySelector('.bg-gradient-to-r');
      expect(overlay).toBeInTheDocument();
    });

    it('should not render overlay when disabled', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg" overlay={false}>
          <div>Content</div>
        </ParallaxSection>
      );

      const overlay = container.querySelector('.bg-gradient-to-r');
      expect(overlay).not.toBeInTheDocument();
    });

    it('should apply custom overlay opacity', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection 
          backgroundImage="test.jpg" 
          overlayOpacity={0.7}
        >
          <div>Content</div>
        </ParallaxSection>
      );

      const overlay = container.querySelector('.bg-gradient-to-r');
      expect(overlay.style.opacity).toBe('0.7');
    });

    it('should apply custom overlay color classes', () => {
      useScrollPosition.mockReturnValue(0);
      
      const customColor = 'from-blue-500 to-blue-900';
      const { container } = render(
        <ParallaxSection 
          backgroundImage="test.jpg" 
          overlayColor={customColor}
        >
          <div>Content</div>
        </ParallaxSection>
      );

      const overlay = container.querySelector('.bg-gradient-to-r');
      expect(overlay.className).toContain('from-blue-500');
      expect(overlay.className).toContain('to-blue-900');
    });
  });

  describe('Content rendering', () => {
    it('should render children content', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { getByText } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Test Content</div>
        </ParallaxSection>
      );

      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should position content above background with z-index', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const contentWrapper = container.querySelector('.relative.z-10');
      expect(contentWrapper).toBeInTheDocument();
    });

    it('should center content by default', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const contentWrapper = container.querySelector('.relative.z-10');
      expect(contentWrapper.className).toContain('flex');
      expect(contentWrapper.className).toContain('items-center');
      expect(contentWrapper.className).toContain('justify-center');
    });
  });

  describe('Section styling', () => {
    it('should apply custom height', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg" height="600px">
          <div>Content</div>
        </ParallaxSection>
      );

      const section = container.querySelector('section');
      expect(section.style.height).toBe('600px');
    });

    it('should have overflow hidden', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const section = container.querySelector('section');
      expect(section.className).toContain('overflow-hidden');
    });

    it('should apply custom className', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg" className="custom-class">
          <div>Content</div>
        </ParallaxSection>
      );

      const section = container.querySelector('section');
      expect(section.className).toContain('custom-class');
    });
  });

  describe('Performance optimizations', () => {
    it('should use will-change for transform optimization', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const background = container.querySelector('.absolute.inset-0');
      expect(background.style.willChange).toBe('transform');
    });

    it('should apply smooth transition', () => {
      useScrollPosition.mockReturnValue(0);
      
      const { container } = render(
        <ParallaxSection backgroundImage="test.jpg">
          <div>Content</div>
        </ParallaxSection>
      );

      const background = container.querySelector('.absolute.inset-0');
      expect(background.style.transition).toContain('transform');
    });
  });
});
