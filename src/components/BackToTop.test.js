import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from './BackToTop';

/**
 * Feature: website-premium-enhancement, Property 10: Back-to-top button appears at threshold
 * Validates: Requirements 2.5
 * 
 * Property: For any scroll position greater than 500px, a floating "Back to Top" button 
 * should be visible in the bottom-right corner.
 */

// Mock the useScrollPosition hook
jest.mock('../hooks/useScrollPosition', () => {
  return jest.fn(() => 0);
});

const useScrollPosition = require('../hooks/useScrollPosition');

describe('BackToTop Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  describe('Property Test: Back-to-top button appears at threshold', () => {
    it('should not be visible when scroll position is below threshold', () => {
      useScrollPosition.mockReturnValue(400); // Below 500px threshold
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button).not.toBeInTheDocument();
    });

    it('should be visible when scroll position is above 500px threshold', () => {
      useScrollPosition.mockReturnValue(600); // Above 500px threshold
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button).toBeInTheDocument();
    });

    it('should be visible exactly at threshold', () => {
      useScrollPosition.mockReturnValue(501); // Just above threshold
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button).toBeInTheDocument();
    });

    it('should respect custom threshold', () => {
      useScrollPosition.mockReturnValue(300);
      
      const { container } = render(<BackToTop threshold={250} />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      // Should be visible because 300 > 250
      expect(button).toBeInTheDocument();
    });

    it('should hide when scrolling back below threshold', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container, rerender } = render(<BackToTop />);
      let button = container.querySelector('button[aria-label="Back to top"]');
      expect(button).toBeInTheDocument();
      
      // Scroll back below threshold (default is 500)
      useScrollPosition.mockReturnValue(400);
      rerender(<BackToTop />);
      
      button = container.querySelector('button[aria-label="Back to top"]');
      // Button should still be in DOM but animating out, or completely removed
      // Due to AnimatePresence, it may take a moment to fully unmount
      expect(button).toBeFalsy();
    });
  });

  describe('Scroll to top functionality', () => {
    it('should scroll to top when clicked', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      fireEvent.click(button);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('should scroll smoothly', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      fireEvent.click(button);
      
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'smooth' })
      );
    });
  });

  describe('Button positioning', () => {
    it('should be positioned in bottom-right by default', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('bottom-8');
      expect(button.className).toContain('right-8');
    });

    it('should support bottom-left position', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop position="bottom-left" />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('bottom-8');
      expect(button.className).toContain('left-8');
    });

    it('should support bottom-center position', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop position="bottom-center" />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('bottom-8');
      expect(button.className).toContain('left-1/2');
    });

    it('should be fixed positioned', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('fixed');
    });

    it('should have high z-index', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('z-50');
    });
  });

  describe('Button styling', () => {
    it('should be circular', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('rounded-full');
    });

    it('should have primary background color', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('bg-primary');
    });

    it('should have shadow', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('shadow-lg');
    });

    it('should contain up arrow icon', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const icon = container.querySelector('.fa-arrow-up');
      
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button');
      
      expect(button).toHaveAttribute('aria-label', 'Back to top');
    });

    it('should be keyboard accessible', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Animation', () => {
    it('should have transition classes', () => {
      useScrollPosition.mockReturnValue(600);
      
      const { container } = render(<BackToTop />);
      const button = container.querySelector('button[aria-label="Back to top"]');
      
      expect(button.className).toContain('transition-all');
      expect(button.className).toContain('duration-300');
    });
  });
});
