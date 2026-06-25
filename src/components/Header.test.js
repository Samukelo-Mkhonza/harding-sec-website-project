import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

/**
 * Feature: website-premium-enhancement — Header scroll behavior.
 *
 * The shipped Header reads `isScrolled` from useScrollDirection and:
 *  - collapses the top utility bar (max-h-12 -> max-h-0, opacity-100 -> opacity-0)
 *  - shrinks the main nav row (h-20 -> h-16) and the logo (h-14 -> h-10)
 *  - reduces the school-name size (text-base -> text-sm)
 */

jest.mock('../hooks/useScrollDirection', () => {
  return jest.fn(() => ({ isScrolled: false }));
});

const useScrollDirection = require('../hooks/useScrollDirection');

const setScrolled = (isScrolled) =>
  useScrollDirection.mockReturnValue({ isScrolled });

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setScrolled(false);
  });

  describe('Structure', () => {
    it('should render a fixed header with high z-index', () => {
      const { container } = renderHeader();
      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header.classList.contains('fixed')).toBe(true);
      expect(header.classList.contains('top-0')).toBe(true);
      expect(header.classList.contains('z-50')).toBe(true);
    });

    it('should render the logo and school name', () => {
      const { container } = renderHeader();

      expect(container.querySelector('header img[alt="Harding Secondary School"]')).toBeInTheDocument();
      expect(screen.getAllByText('Harding Secondary School').length).toBeGreaterThan(0);
    });

    it('should render the mobile menu button', () => {
      const { container } = renderHeader();
      expect(
        container.querySelector('button[aria-label="Toggle mobile menu"]')
      ).toBeInTheDocument();
    });

    it('should render the search button', () => {
      const { container } = renderHeader();
      expect(
        container.querySelector('button[aria-label="Search (Ctrl+K)"]')
      ).toBeInTheDocument();
    });
  });

  describe('Top utility bar collapses on scroll', () => {
    it('should be expanded at the top of the page', () => {
      setScrolled(false);
      const { container } = renderHeader();
      // The top utility bar is the header's first child div. (Scope to the
      // header — MobileMenu, a sibling, also uses max-h-0 accordions.)
      const topBar = container.querySelector('header').children[0];

      expect(topBar.classList.contains('max-h-12')).toBe(true);
      expect(topBar.classList.contains('opacity-100')).toBe(true);
    });

    it('should collapse when scrolled', () => {
      setScrolled(true);
      const { container } = renderHeader();
      const topBar = container.querySelector('header').children[0];

      expect(topBar.classList.contains('max-h-0')).toBe(true);
      expect(topBar.classList.contains('opacity-0')).toBe(true);
    });
  });

  describe('Nav row and logo shrink on scroll', () => {
    it('should use full height when not scrolled', () => {
      setScrolled(false);
      const { container } = renderHeader();
      const header = container.querySelector('header');

      expect(header.querySelector('.h-20')).toBeInTheDocument();
      expect(header.querySelector('img').classList.contains('h-14')).toBe(true);
    });

    it('should use reduced height when scrolled', () => {
      setScrolled(true);
      const { container } = renderHeader();
      const header = container.querySelector('header');

      expect(header.querySelector('.h-16')).toBeInTheDocument();
      expect(header.querySelector('.h-20')).not.toBeInTheDocument();
      expect(header.querySelector('img').classList.contains('h-10')).toBe(true);
    });
  });
});
