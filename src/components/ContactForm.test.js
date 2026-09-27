import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

const fill = (label, value) =>
  fireEvent.change(screen.getByLabelText(new RegExp(label, 'i')), { target: { value } });

describe('ContactForm', () => {
  const originalLocation = window.location;
  beforeEach(() => {
    delete window.location;
    window.location = { href: '' };
  });
  afterEach(() => {
    window.location = originalLocation;
  });

  it('has visible labels for every field', () => {
    render(<ContactForm />);
    ['Full name', 'Email address', 'Phone number', 'Subject', 'Message'].forEach((label) => {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    });
  });

  it('shows errors and does not open email when the form is invalid', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(window.location.href).toBe('');
  });

  it('validates the email on blur', () => {
    render(<ContactForm />);
    fill('Email address', 'nope');
    fireEvent.blur(screen.getByLabelText(/email address/i));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it('opens a pre-filled email to the school when valid', () => {
    render(<ContactForm />);
    fill('Full name', 'Thandi Dlamini');
    fill('Email address', 'thandi@example.co.za');
    fill('Phone number', '082 123 4567');
    fill('Subject', 'Grade 8 admission');
    fill('Message', 'Please send the 2026 admission form.');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(window.location.href).toMatch(/^mailto:hardingsec@telkomsa\.net\?subject=Grade%208%20admission/);
    expect(decodeURIComponent(window.location.href)).toMatch(/Name: Thandi Dlamini/);
    expect(screen.getByRole('status')).toHaveTextContent(/email app should now open/i);
  });
});
