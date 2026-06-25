import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastContext';
import toast from 'react-hot-toast';

/**
 * Feature: website-premium-enhancement, Property 26 & 27: Toast timing.
 *
 * ToastContext is a thin wrapper around react-hot-toast. Rather than depend on
 * the library's timers/animation in jsdom (flaky + memory-heavy), we mock
 * react-hot-toast and assert the wrapper forwards the correct configuration:
 *   - success toasts auto-dismiss (default duration 4000ms)
 *   - error toasts are persistent (duration 0)
 *   - dismiss() forwards to toast.dismiss()
 */

jest.mock('react-hot-toast', () => {
  const toast = jest.fn(() => 'toast-id');
  toast.success = jest.fn(() => 'success-id');
  toast.error = jest.fn(() => 'error-id');
  toast.dismiss = jest.fn();
  toast.promise = jest.fn();
  return { __esModule: true, default: toast, Toaster: () => null };
});

// Capture the toast API exposed by the provider.
const TestComponent = ({ onReady }) => {
  const api = useToast();
  React.useEffect(() => {
    onReady(api);
  }, [api, onReady]);
  return <div>Test Component</div>;
};

const getToastApi = async () => {
  let api;
  render(
    <ToastProvider>
      <TestComponent onReady={(t) => { api = t; }} />
    </ToastProvider>
  );
  await waitFor(() => expect(api).toBeDefined());
  return api;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ToastContext', () => {
  describe('Property 26: success toasts auto-dismiss after 4 seconds', () => {
    it('uses a 4000ms default duration', async () => {
      const api = await getToastApi();

      act(() => {
        api.success('Form submitted successfully!');
      });

      expect(toast.success).toHaveBeenCalledWith(
        'Form submitted successfully!',
        expect.objectContaining({ duration: 4000, position: 'top-right' })
      );
    });

    it('respects a custom duration', async () => {
      const api = await getToastApi();

      act(() => {
        api.success('Custom duration toast', { duration: 2000 });
      });

      expect(toast.success).toHaveBeenCalledWith(
        'Custom duration toast',
        expect.objectContaining({ duration: 2000 })
      );
    });
  });

  describe('Property 27: error toasts persist until dismissed', () => {
    it('uses duration 0 (persistent) by default', async () => {
      const api = await getToastApi();

      act(() => {
        api.error('An error occurred');
      });

      expect(toast.error).toHaveBeenCalledWith(
        'An error occurred',
        expect.objectContaining({ duration: 0 })
      );
    });

    it('forwards manual dismissal with the toast id', async () => {
      const api = await getToastApi();

      act(() => {
        api.dismiss('toast-123');
      });

      expect(toast.dismiss).toHaveBeenCalledWith('toast-123');
    });

    it('dismisses all toasts when no id is given', async () => {
      const api = await getToastApi();

      act(() => {
        api.dismiss();
      });

      expect(toast.dismiss).toHaveBeenCalledWith();
    });
  });

  describe('Toast types', () => {
    it('shows an info toast with an info icon', async () => {
      const api = await getToastApi();

      act(() => {
        api.info('Information message');
      });

      expect(toast).toHaveBeenCalledWith(
        'Information message',
        expect.objectContaining({ icon: 'ℹ️', duration: 4000 })
      );
    });

    it('shows a warning toast with a warning icon', async () => {
      const api = await getToastApi();

      act(() => {
        api.warning('Warning message');
      });

      expect(toast).toHaveBeenCalledWith(
        'Warning message',
        expect.objectContaining({ icon: '⚠️', duration: 4000 })
      );
    });
  });
});
