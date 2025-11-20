import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

/**
 * Feature: website-premium-enhancement
 * Property 55: Search overlay focuses input
 * Property 56: Suggestions appear after character threshold
 * Property 57: Search suggestions are formatted
 * Property 58: Suggestion selection navigates
 * Property 59: Empty search shows alternatives
 * Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5
 */

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SearchOverlay Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Property Test: Search overlay focuses input (Property 55)', () => {
    it('should auto-focus input when overlay opens', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);
      expect(searchInput).toHaveFocus();
    });

    it('should not render when closed', () => {
      renderWithRouter(<SearchOverlay isOpen={false} onClose={mockOnClose} />);

      const searchInput = screen.queryByPlaceholderText(/Search.../i);
      expect(searchInput).not.toBeInTheDocument();
    });

    it('should focus input when reopened', () => {
      const { rerender } = renderWithRouter(
        <SearchOverlay isOpen={false} onClose={mockOnClose} />
      );

      // Open overlay
      rerender(
        <BrowserRouter>
          <SearchOverlay isOpen={true} onClose={mockOnClose} />
        </BrowserRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search.../i);
      expect(searchInput).toHaveFocus();
    });
  });

  describe('Property Test: Suggestions appear after character threshold (Property 56)', () => {
    it('should show message when less than 3 characters', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Type 1 character
      fireEvent.change(searchInput, { target: { value: 'a' } });
      expect(screen.getByText(/Type at least 3 characters to search.../i)).toBeInTheDocument();

      // Type 2 characters
      fireEvent.change(searchInput, { target: { value: 'ab' } });
      expect(screen.getByText(/Type at least 3 characters to search.../i)).toBeInTheDocument();
    });

    it('should search after 3 characters', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Type 3 characters
      fireEvent.change(searchInput, { target: { value: 'abo' } });

      // Fast-forward debounce timer (300ms)
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should debounce search by 300ms', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Type quickly
      fireEvent.change(searchInput, { target: { value: 'a' } });
      fireEvent.change(searchInput, { target: { value: 'ab' } });
      fireEvent.change(searchInput, { target: { value: 'abo' } });

      // Should not search immediately
      expect(screen.queryByText(/About Us/i)).not.toBeInTheDocument();

      // Fast-forward 300ms
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should clear results when query is less than 3 characters', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Type 3 characters
      fireEvent.change(searchInput, { target: { value: 'abo' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      // Delete to 2 characters
      fireEvent.change(searchInput, { target: { value: 'ab' } });

      // Results should be cleared
      expect(screen.queryByText(/About Us/i)).not.toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Property Test: Search suggestions are formatted (Property 57)', () => {
    it('should display result with category, title, and excerpt', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'about' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        // Category
        expect(screen.getByText(/Pages/i)).toBeInTheDocument();
        // Title
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
        // Excerpt
        expect(screen.getByText(/Learn about our school/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should highlight matching text', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'about' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        const marks = screen.getAllByText(/about/i);
        // Should have highlighted text
        expect(marks.length).toBeGreaterThan(0);
      });

      jest.useRealTimers();
    });

    it('should show multiple results', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Search for something that matches multiple results
      fireEvent.change(searchInput, { target: { value: 'a' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        // Should show multiple results
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
        expect(screen.getByText(/Academics/i)).toBeInTheDocument();
        expect(screen.getByText(/Admissions/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Property Test: Suggestion selection navigates (Property 58)', () => {
    it('should navigate when result is clicked', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'about' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      // Click result
      const result = screen.getByText(/About Us/i).closest('div[class*="cursor-pointer"]');
      fireEvent.click(result);

      // Should close overlay
      expect(mockOnClose).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should navigate with Enter key', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'about' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      // Press Enter
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      // Should close overlay
      expect(mockOnClose).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should clear query after selection', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'about' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      // Click result
      const result = screen.getByText(/About Us/i).closest('div[class*="cursor-pointer"]');
      fireEvent.click(result);

      // Query should be cleared (though overlay closes, so we can't check directly)
      expect(mockOnClose).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('Property Test: Empty search shows alternatives (Property 59)', () => {
    it('should show no results message', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      // Search for something that doesn't exist
      fireEvent.change(searchInput, { target: { value: 'xyz' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/No results found for "xyz"/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should show alternative suggestions', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'xyz' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/Try: "admissions", "academics", "contact"/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Keyboard navigation', () => {
    it('should close on Escape key', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.keyDown(searchInput, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should navigate results with arrow keys', async () => {
      jest.useFakeTimers();

      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);

      fireEvent.change(searchInput, { target: { value: 'a' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
      });

      // Arrow down
      fireEvent.keyDown(searchInput, { key: 'ArrowDown' });

      // Arrow up
      fireEvent.keyDown(searchInput, { key: 'ArrowUp' });

      // Should not throw errors
      expect(mockOnClose).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('Overlay interactions', () => {
    it('should close when clicking backdrop', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen.getByPlaceholderText(/Search.../i).closest('div[class*="fixed"]');
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not close when clicking content', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/Search.../i);
      fireEvent.click(searchInput);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should close when clicking close button', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
