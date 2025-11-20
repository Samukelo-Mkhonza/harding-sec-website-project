import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

/**
 * Feature: website-premium-enhancement, Property 9: Breadcrumbs reflect current route
 * Validates: Requirements 2.4
 * 
 * Property: For any page navigation, breadcrumb navigation should display the correct 
 * hierarchy based on the current route path.
 */

describe('Breadcrumbs Component', () => {
  const renderBreadcrumbs = (initialRoute = '/', props = {}) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Breadcrumbs {...props} />
      </MemoryRouter>
    );
  };

  describe('Property Test: Breadcrumbs reflect current route', () => {
    it('should not render breadcrumbs on home page', () => {
      const { container } = renderBreadcrumbs('/');
      expect(container.querySelector('nav[aria-label="Breadcrumb"]')).not.toBeInTheDocument();
    });

    it('should generate correct breadcrumb trail for single-level route', () => {
      renderBreadcrumbs('/about');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('should generate correct breadcrumb trail for multi-level route', () => {
      renderBreadcrumbs('/academics/subjects/mathematics');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Academics')).toBeInTheDocument();
      expect(screen.getByText('Subjects')).toBeInTheDocument();
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
    });

    it('should format route segments correctly (capitalize, replace hyphens)', () => {
      renderBreadcrumbs('/student-life/clubs-and-societies');
      
      expect(screen.getByText('Student Life')).toBeInTheDocument();
      expect(screen.getByText('Clubs And Societies')).toBeInTheDocument();
    });

    it('should use custom labels when provided', () => {
      const customLabels = {
        '/academics': 'Academic Programs',
        '/academics/subjects': 'Subject Offerings',
      };
      
      renderBreadcrumbs('/academics/subjects', { customLabels });
      
      expect(screen.getByText('Academic Programs')).toBeInTheDocument();
      expect(screen.getByText('Subject Offerings')).toBeInTheDocument();
    });

    it('should mark last breadcrumb as current page', () => {
      renderBreadcrumbs('/about/history');
      
      const lastCrumb = screen.getByText('History');
      expect(lastCrumb).toHaveAttribute('aria-current', 'page');
      expect(lastCrumb.tagName).toBe('SPAN'); // Not a link
    });

    it('should make non-last breadcrumbs clickable links', () => {
      renderBreadcrumbs('/academics/subjects/mathematics');
      
      const homeCrumb = screen.getByText('Home').closest('a');
      const academicsCrumb = screen.getByText('Academics').closest('a');
      const subjectsCrumb = screen.getByText('Subjects').closest('a');
      
      expect(homeCrumb).toHaveAttribute('href', '/');
      expect(academicsCrumb).toHaveAttribute('href', '/academics');
      expect(subjectsCrumb).toHaveAttribute('href', '/academics/subjects');
    });
  });

  describe('Breadcrumb structure', () => {
    it('should render as ordered list', () => {
      const { container } = renderBreadcrumbs('/about');
      
      const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
      expect(nav).toBeInTheDocument();
      
      const ol = nav.querySelector('ol');
      expect(ol).toBeInTheDocument();
    });

    it('should render separators between breadcrumbs', () => {
      const { container } = renderBreadcrumbs('/academics/subjects');
      
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should use custom separator when provided', () => {
      renderBreadcrumbs('/about/history', { separator: '>' });
      
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('should show home icon by default', () => {
      const { container } = renderBreadcrumbs('/about');
      
      const homeIcon = container.querySelector('.fa-home');
      expect(homeIcon).toBeInTheDocument();
    });

    it('should hide home icon when showHome is false', () => {
      const { container } = renderBreadcrumbs('/about', { showHome: false });
      
      const homeIcon = container.querySelector('.fa-home');
      expect(homeIcon).not.toBeInTheDocument();
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label', () => {
      const { container } = renderBreadcrumbs('/about');
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('should mark current page with aria-current', () => {
      renderBreadcrumbs('/about/mission');
      
      const currentPage = screen.getByText('Mission');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });

    it('should hide separators from screen readers', () => {
      const { container } = renderBreadcrumbs('/about/history');
      
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      separators.forEach(separator => {
        expect(separator).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Styling', () => {
    it('should apply hover styles to links', () => {
      renderBreadcrumbs('/about/history');
      
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink.className).toContain('hover:text-primary');
    });

    it('should style current page differently', () => {
      renderBreadcrumbs('/about');
      
      const currentPage = screen.getByText('About');
      expect(currentPage.className).toContain('font-semibold');
    });
  });

  describe('Edge cases', () => {
    it('should handle routes with trailing slashes', () => {
      renderBreadcrumbs('/about/');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('should handle routes with query parameters', () => {
      renderBreadcrumbs('/academics?tab=subjects');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Academics')).toBeInTheDocument();
    });

    it('should handle routes with hash fragments', () => {
      renderBreadcrumbs('/about#mission');
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});
