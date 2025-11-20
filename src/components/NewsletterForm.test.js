import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterForm from './NewsletterForm';
import { ToastProvider } from '../contexts/ToastContext';

/**
 * Feature: website-premium-enhancement, Property 30: Newsletter confirmation within time limit
 * Validates: Requirements 6.5
 */

// Mock the toast context
jest.mock('../contexts/ToastContext', () => ({
  ...jest.requireActual('../contexts/ToastContext'),
  useToast: () => ({
    success: jest.fn(),
    error: jest.fn(),
  }),
}));

const renderWithProviders = (component) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('NewsletterForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Property Test: Newsletter confirmation within time limit (2 seconds)', () => {
    it('should complete subscription within 2 seconds', async () => {
      jest.useFakeTimers();
      const startTime = Date.now();

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      // Enter valid email
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      // Submit form
      fireEvent.click(submitButton);

      // Fast-forward time by 1.5 seconds (the simulated API delay)
      jest.advanceTimersByTime(1500);

      // Should show success within 2 seconds
      await waitFor(() => {
        expect(screen.getByText(/Successfully Subscribed!/i)).toBeInTheDocument();
      }, { timeout: 2000 });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Verify it completed within 2 seconds
      expect(duration).toBeLessThan(2000);

      jest.useRealTimers();
    });

    it('should show loading state during submission', async () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      // Should show loading state
      expect(screen.getByText(/Subscribing.../i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should show success state after subscription', async () => {
      jest.useFakeTimers();

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      // Fast-forward time
      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        expect(screen.getByText(/Successfully Subscribed!/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should store email in localStorage', async () => {
      jest.useFakeTimers();

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        expect(subscribers).toContain('test@example.com');
      });

      jest.useRealTimers();
    });

    it('should not add duplicate emails', async () => {
      jest.useFakeTimers();

      // Pre-populate with an email
      localStorage.setItem('newsletter_subscribers', JSON.stringify(['test@example.com']));

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        expect(subscribers).toEqual(['test@example.com']);
        expect(subscribers.length).toBe(1);
      });

      jest.useRealTimers();
    });
  });

  describe('Email validation', () => {
    it('should validate email format', async () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      // Invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should require email field', async () => {
      renderWithProviders(<NewsletterForm />);

      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      // Submit without email
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      });
    });

    it('should clear error on input change', async () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      // Trigger error
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      });

      // Start typing
      fireEvent.change(emailInput, { target: { value: 't' } });

      // Error should be cleared after typing
      await waitFor(() => {
        expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Inline variant', () => {
    it('should render inline layout', () => {
      renderWithProviders(<NewsletterForm inline />);

      const emailInput = screen.getByPlaceholderText(/Enter your email/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe/i });

      expect(emailInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should work with inline variant', async () => {
      jest.useFakeTimers();

      renderWithProviders(<NewsletterForm inline />);

      const emailInput = screen.getByPlaceholderText(/Enter your email/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        expect(screen.getByText(/Subscribed!/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Form reset', () => {
    it('should reset form after successful subscription', async () => {
      jest.useFakeTimers();

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      // Fast-forward to completion
      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        expect(screen.getByText(/Successfully Subscribed!/i)).toBeInTheDocument();
      });

      // Fast-forward to reset (3 seconds after success)
      jest.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(emailInput.value).toBe('');
        expect(screen.getByRole('button', { name: /Subscribe to Newsletter/i })).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);

      expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('should update ARIA attributes on error', async () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-describedby');
      });
    });

    it('should have accessible labels', () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByLabelText(/Email address/i);
      expect(emailInput).toBeInTheDocument();
    });
  });

  describe('Disabled states', () => {
    it('should disable input during submission', async () => {
      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      expect(emailInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });

    it('should disable input after successful subscription', async () => {
      jest.useFakeTimers();

      renderWithProviders(<NewsletterForm />);

      const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
      const submitButton = screen.getByRole('button', { name: /Subscribe to Newsletter/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      jest.advanceTimersByTime(1500);

      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });

      jest.useRealTimers();
    });
  });
});
