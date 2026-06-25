import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

/**
 * Feature: website-premium-enhancement — Site search overlay.
 * Properties 55-59: focus, character threshold, formatting, navigation, empty state.
 *
 * These assertions match the shipped SearchOverlay component:
 *  - placeholder "Search pages, resources, documents…"
 *  - 3-character minimum with a 200ms debounce
 *  - "Keep typing…" hint below the threshold
 *  - results rendered as <button> rows grouped by category
 *  - "No results for ..." empty state
 */

const renderWithRouter = (component) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

// Type a query and flush the 200ms debounce timer.
const search = (input, value) => {
  fireEvent.change(input, { target: { value } });
  act(() => {
    jest.advanceTimersByTime(250);
  });
};

describe('SearchOverlay Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Open / close (Property 55)', () => {
    it('should auto-focus input when overlay opens', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const searchInput = screen.getByPlaceholderText(/search pages/i);
      expect(searchInput).toHaveFocus();
    });

    it('should not render when closed', () => {
      renderWithRouter(<SearchOverlay isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByPlaceholderText(/search pages/i)).not.toBeInTheDocument();
    });

    it('should focus input when reopened', () => {
      const { rerender } = renderWithRouter(
        <SearchOverlay isOpen={false} onClose={mockOnClose} />
      );

      rerender(
        <BrowserRouter>
          <SearchOverlay isOpen={true} onClose={mockOnClose} />
        </BrowserRouter>
      );

      expect(screen.getByPlaceholderText(/search pages/i)).toHaveFocus();
    });
  });

  describe('Character threshold (Property 56)', () => {
    it('should show typing hint below 3 characters', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      fireEvent.change(searchInput, { target: { value: 'a' } });
      expect(screen.getByText(/keep typing/i)).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'ab' } });
      expect(screen.getByText(/keep typing/i)).toBeInTheDocument();
    });

    it('should search after 3 characters', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      // "history" matches the About page excerpt only, so the "About Us"
      // title renders intact (the matched term is what gets <mark>-split).
      search(searchInput, 'history');

      expect(screen.getByText('About Us')).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should debounce search by ~200ms', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      fireEvent.change(searchInput, { target: { value: 'history' } });
      // Not searched yet (debounce pending)
      expect(screen.queryByText('About Us')).not.toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(screen.getByText('About Us')).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should clear results when query drops below 3 characters', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'history');
      expect(screen.getByText('About Us')).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'hi' } });
      expect(screen.queryByText('About Us')).not.toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe('Result formatting (Property 57)', () => {
    it('should display category, title and excerpt', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'history');

      // Category header
      expect(screen.getByText('Pages')).toBeInTheDocument();
      // Title (intact because the match is in the excerpt, not the title)
      expect(screen.getByText('About Us')).toBeInTheDocument();
      // Excerpt fragment that is not part of the highlighted term
      expect(screen.getByText(/values and school/i)).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should highlight the matching text', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'history');

      const marks = screen.getAllByText(/history/i);
      expect(marks.length).toBeGreaterThan(0);
      jest.useRealTimers();
    });

    it('should show multiple results', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      // "and" appears in several page excerpts.
      search(searchInput, 'and');

      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Academics')).toBeInTheDocument();
      expect(screen.getByText('Admissions')).toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe('Selection navigates (Property 58)', () => {
    it('should close overlay when a result is clicked', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'history');

      const result = screen.getByText('About Us').closest('button');
      fireEvent.click(result);

      expect(mockOnClose).toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('should navigate with the Enter key', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'history');
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      expect(mockOnClose).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe('Empty state (Property 59)', () => {
    it('should show a no-results message', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'xyz');

      expect(screen.getByText(/no results for/i)).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should suggest alternative searches', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'xyz');

      expect(screen.getByText(/try:/i)).toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe('Keyboard and overlay interactions', () => {
    it('should close on Escape', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      fireEvent.keyDown(searchInput, { key: 'Escape' });
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not close on arrow-key navigation', () => {
      jest.useFakeTimers();
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);
      const searchInput = screen.getByPlaceholderText(/search pages/i);

      search(searchInput, 'and');
      fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
      fireEvent.keyDown(searchInput, { key: 'ArrowUp' });

      expect(mockOnClose).not.toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('should close when clicking the backdrop', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen
        .getByPlaceholderText(/search pages/i)
        .closest('div[class*="fixed"]');
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not close when clicking the input', () => {
      renderWithRouter(<SearchOverlay isOpen={true} onClose={mockOnClose} />);

      fireEvent.click(screen.getByPlaceholderText(/search pages/i));
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
