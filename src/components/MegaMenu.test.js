import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MegaMenu from './MegaMenu';

/**
 * Feature: website-premium-enhancement, Property 8: Mega menu displays within timing constraint
 * Validates: Requirements 2.3
 * 
 * Property: For any navigation item with sub-menus, when hovered, the mega menu should 
 * become visible within 200ms.
 */

describe('MegaMenu Component', () => {
  const mockMenuItems = [
    {
      id: 'academics',
      label: 'Academics',
      icon: 'fas fa-graduation-cap',
      columns: [
        {
          title: 'Programs',
          links: [
            { label: 'Grade 8-9', href: '/academics/junior', icon: 'fas fa-book' },
            { label: 'Grade 10-12', href: '/academics/senior', icon: 'fas fa-university' },
          ],
        },
        {
          title: 'Subjects',
          links: [
            { label: 'Sciences', href: '/academics/sciences', description: 'Physics, Chemistry, Biology' },
            { label: 'Mathematics', href: '/academics/math', description: 'Pure & Applied Math' },
          ],
        },
      ],
    },
  ];

  const renderMegaMenu = (props = {}) => {
    return render(
      <BrowserRouter>
        <MegaMenu items={mockMenuItems} {...props} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Property Test: Mega menu displays within timing constraint', () => {
    it('should display mega menu within 200ms on hover', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Mega menu should not be visible initially
      expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();

      // Hover over trigger
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
      });

      // Fast-forward time by 200ms
      act(() => {
        jest.advanceTimersByTime(200);
      });

      // Mega menu should now be visible
      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).toBeInTheDocument();
      });
    });

    it('should not display mega menu before 200ms delay', () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Hover over trigger
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
      });

      // Fast-forward time by only 100ms (less than 200ms)
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Mega menu should not be visible yet
      expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();
    });

    it('should cancel opening if mouse leaves before delay completes', () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');
      const triggerDiv = trigger.closest('div');

      // Hover over trigger
      act(() => {
        fireEvent.mouseEnter(triggerDiv);
      });

      // Fast-forward time by 100ms
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Mouse leaves before 200ms
      act(() => {
        fireEvent.mouseLeave(triggerDiv);
      });

      // Fast-forward remaining time
      act(() => {
        jest.advanceTimersByTime(200);
      });

      // Mega menu should not be visible
      expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();
    });
  });

  describe('Mega menu structure', () => {
    it('should render menu items with icons', () => {
      renderMegaMenu({ showIcons: true });
      
      expect(screen.getByText('Academics')).toBeInTheDocument();
      const trigger = screen.getByText('Academics').closest('button');
      expect(trigger.querySelector('.fas.fa-graduation-cap')).toBeInTheDocument();
    });

    it('should render multi-column layout', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Open mega menu
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        const megaMenu = container.querySelector('.absolute.top-full');
        expect(megaMenu).toBeInTheDocument();
        
        // Should have grid layout
        const grid = megaMenu.querySelector('[class*="grid"]');
        expect(grid).toBeInTheDocument();
      });
    });

    it('should render column titles', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Open mega menu
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(screen.getByText('Programs')).toBeInTheDocument();
        expect(screen.getByText('Subjects')).toBeInTheDocument();
      });
    });

    it('should render links with descriptions', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Open mega menu
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(screen.getByText('Sciences')).toBeInTheDocument();
        expect(screen.getByText('Physics, Chemistry, Biology')).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard navigation', () => {
    it('should open on Enter key', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics').closest('button');

      // Press Enter
      act(() => {
        fireEvent.keyDown(trigger, { key: 'Enter' });
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).toBeInTheDocument();
      });
    });

    it('should close on Escape key', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics').closest('button');

      // Open menu
      act(() => {
        fireEvent.keyDown(trigger, { key: 'Enter' });
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).toBeInTheDocument();
      });

      // Press Escape
      act(() => {
        fireEvent.keyDown(trigger, { key: 'Escape' });
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();
      });
    });
  });

  describe('Mouse interactions', () => {
    it('should close when mouse leaves', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');
      const triggerDiv = trigger.closest('div');

      // Open mega menu
      act(() => {
        fireEvent.mouseEnter(triggerDiv);
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).toBeInTheDocument();
      });

      // Mouse leaves
      act(() => {
        fireEvent.mouseLeave(triggerDiv);
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();
      });
    });

    it('should close when clicking a link', async () => {
      const { container } = renderMegaMenu();
      const trigger = screen.getByText('Academics');

      // Open mega menu
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).toBeInTheDocument();
      });

      // Click a link
      const link = screen.getByText('Grade 8-9');
      act(() => {
        fireEvent.click(link);
      });

      await waitFor(() => {
        expect(container.querySelector('.absolute.top-full')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderMegaMenu();
      const trigger = screen.getByText('Academics').closest('button');

      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when opened', async () => {
      renderMegaMenu();
      const trigger = screen.getByText('Academics').closest('button');

      // Open menu
      act(() => {
        fireEvent.mouseEnter(trigger.closest('div'));
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });
});
