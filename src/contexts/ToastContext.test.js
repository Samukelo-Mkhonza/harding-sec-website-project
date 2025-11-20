import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastContext';

/**
 * Feature: website-premium-enhancement, Property 26 & 27: Toast timing
 * Validates: Requirements 6.1, 6.2
 * 
 * Property 26: For any successful form submission, a success toast should appear 
 * and automatically dismiss after exactly 4 seconds.
 * 
 * Property 27: For any failed form submission, an error toast should appear and 
 * remain visible until the user manually dismisses it.
 */

// Mock matchMedia for react-hot-toast
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Test component to use toast
const TestComponent = ({ onToastShow }) => {
  const toast = useToast();

  React.useEffect(() => {
    if (onToastShow) {
      onToastShow(toast);
    }
  }, [toast, onToastShow]);

  return <div>Test Component</div>;
};

describe('ToastContext', () => {
  describe('Property Test: Success toast auto-dismisses after 4 seconds', () => {
    it('should auto-dismiss success toast after 4000ms', async () => {
      jest.useFakeTimers();
      let toastInstance;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      // Show success toast
      act(() => {
        toastInstance.success('Form submitted successfully!');
      });

      // Toast should be visible initially
      await waitFor(() => {
        expect(screen.queryByText('Form submitted successfully!')).toBeInTheDocument();
      });

      // Fast-forward time by 4000ms
      act(() => {
        jest.advanceTimersByTime(4000);
      });

      // Toast should be dismissed after 4 seconds
      await waitFor(() => {
        expect(screen.queryByText('Form submitted successfully!')).not.toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should respect custom duration for success toast', async () => {
      jest.useFakeTimers();
      let toastInstance;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      // Show success toast with custom duration
      act(() => {
        toastInstance.success('Custom duration toast', { duration: 2000 });
      });

      await waitFor(() => {
        expect(screen.queryByText('Custom duration toast')).toBeInTheDocument();
      });

      // Fast-forward by 2000ms
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Should be dismissed after custom duration
      await waitFor(() => {
        expect(screen.queryByText('Custom duration toast')).not.toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Property Test: Error toast persists until dismissed', () => {
    it('should not auto-dismiss error toast (duration = 0)', async () => {
      jest.useFakeTimers();
      let toastInstance;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      // Show error toast
      act(() => {
        toastInstance.error('An error occurred');
      });

      await waitFor(() => {
        expect(screen.queryByText('An error occurred')).toBeInTheDocument();
      });

      // Fast-forward time significantly
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Toast should still be visible (persistent)
      await waitFor(() => {
        expect(screen.queryByText('An error occurred')).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should allow manual dismissal of error toast', async () => {
      let toastInstance;
      let toastId;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      // Show error toast and capture ID
      act(() => {
        toastId = toastInstance.error('Dismissible error');
      });

      await waitFor(() => {
        expect(screen.queryByText('Dismissible error')).toBeInTheDocument();
      });

      // Manually dismiss
      act(() => {
        toastInstance.dismiss(toastId);
      });

      // Toast should be dismissed
      await waitFor(() => {
        expect(screen.queryByText('Dismissible error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toast types', () => {
    it('should show info toast', async () => {
      let toastInstance;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      act(() => {
        toastInstance.info('Information message');
      });

      await waitFor(() => {
        expect(screen.queryByText('Information message')).toBeInTheDocument();
      });
    });

    it('should show warning toast', async () => {
      let toastInstance;

      render(
        <ToastProvider>
          <TestComponent
            onToastShow={(toast) => {
              toastInstance = toast;
            }}
          />
        </ToastProvider>
      );

      await waitFor(() => {
        expect(toastInstance).toBeDefined();
      });

      act(() => {
        toastInstance.warning('Warning message');
      });

      await waitFor(() => {
        expect(screen.queryByText('Warning message')).toBeInTheDocument();
      });
    });
  });
});
