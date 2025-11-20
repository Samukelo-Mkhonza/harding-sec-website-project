import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

/**
 * Feature: website-premium-enhancement, Property 6 & 7: Header scroll behavior
 * Validates: Requirements 2.1, 2.2
 * 
 * Property 6: For any scroll position greater than 100px in the downward direction, 
 * the header height should reduce by 30% and the top contact bar should be hidden.
 * 
 * Property 7: For any upward scroll event at any position, the header should restore 
 * to full size with smooth transitions.
 */

// Mock the useScrollDirection hook
jest.mock('../hooks/useScrollDirection', () => {
  return jest.fn(() => ({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
  }));
});

const useScrollDirection = require('../hooks/useScrollDirection');

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Property Test: Header minimizes at scroll threshold', () => {
    it('should show full header at top of page (scrollY = 0)', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      expect(header).toBeInTheDocument();
      expect(header.classList.contains('py-4')).toBe(true);
    });

    it('should minimize header when scrolling down past 100px', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 150,
        scrollDirection: 'down',
        isScrolled: true,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      // Header should have minimized padding
      expect(header.classList.contains('py-2')).toBe(true);
    });

    it('should hide top contact bar when scrolled', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 150,
        scrollDirection: 'down',
        isScrolled: true,
      });

      const { container } = renderHeader();
      const topBar = container.querySelector('.bg-primary-dark');
      
      // Top bar should have hidden classes
      expect(topBar.classList.contains('h-0')).toBe(true);
      expect(topBar.classList.contains('opacity-0')).toBe(true);
    });

    it('should show top contact bar when at top', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      const { container } = renderHeader();
      const topBar = container.querySelector('.bg-primary-dark');
      
      // Top bar should be visible
      expect(topBar.classList.contains('h-auto')).toBe(true);
      expect(topBar.classList.contains('py-2')).toBe(true);
    });
  });

  describe('Property Test: Header restores on upward scroll', () => {
    it('should restore full header when scrolling up', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 200,
        scrollDirection: 'up',
        isScrolled: true,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      // Header should have normal padding (not minimized)
      expect(header.classList.contains('py-3')).toBe(true);
    });

    it('should restore header at any scroll position when scrolling up', () => {
      const scrollPositions = [150, 300, 500, 1000];
      
      scrollPositions.forEach(scrollY => {
        useScrollDirection.mockReturnValue({
          scrollY,
          scrollDirection: 'up',
          isScrolled: true,
        });

        const { container } = renderHeader();
        const header = container.querySelector('header');
        
        // Header should not be minimized when scrolling up
        expect(header.classList.contains('py-2')).toBe(false);
      });
    });
  });

  describe('Header styling and transitions', () => {
    it('should have transition classes for smooth animations', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      expect(header.classList.contains('transition-all')).toBe(true);
      expect(header.classList.contains('duration-300')).toBe(true);
    });

    it('should be fixed at top with high z-index', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      expect(header.classList.contains('fixed')).toBe(true);
      expect(header.classList.contains('top-0')).toBe(true);
      expect(header.classList.contains('z-50')).toBe(true);
    });

    it('should apply backdrop blur when scrolled', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 150,
        scrollDirection: 'down',
        isScrolled: true,
      });

      const { container } = renderHeader();
      const header = container.querySelector('header');
      
      expect(header.style.backdropFilter).toBe('blur(10px)');
    });
  });

  describe('Logo and branding', () => {
    it('should render school logo and name', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      renderHeader();
      
      expect(screen.getByText('Harding Secondary School')).toBeInTheDocument();
      expect(screen.getByAltText('Harding Secondary School Logo')).toBeInTheDocument();
    });

    it('should reduce title size when minimized', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 150,
        scrollDirection: 'down',
        isScrolled: true,
      });

      const { container } = renderHeader();
      const title = screen.getByText('Harding Secondary School');
      
      expect(title.classList.contains('text-lg')).toBe(true);
    });
  });

  describe('Mobile menu integration', () => {
    it('should render mobile menu button', () => {
      useScrollDirection.mockReturnValue({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
      });

      const { container } = renderHeader();
      const menuButton = container.querySelector('button[aria-label="Toggle mobile menu"]');
      
      expect(menuButton).toBeInTheDocument();
    });
  });
});
