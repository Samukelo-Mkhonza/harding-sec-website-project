// Plain validators used by the contact and newsletter forms. Each returns an
// error message, or '' when the value is valid.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// South African numbers: 0XX XXX XXXX or +27 XX XXX XXXX (spaces/dashes allowed)
const ZA_PHONE_RE = /^(\+27|0)[1-9]\d{8}$/;

export const validateRequired = (value, label = 'This field') =>
  value && value.trim() ? '' : `${label} is required.`;

export const validateEmail = (value) => {
  if (!value || !value.trim()) return 'Email address is required.';
  return EMAIL_RE.test(value.trim()) ? '' : 'Enter a valid email address, e.g. name@example.com.';
};

export const validatePhone = (value, { required = false } = {}) => {
  const compact = (value || '').replace(/[\s()-]/g, '');
  if (!compact) return required ? 'Phone number is required.' : '';
  return ZA_PHONE_RE.test(compact) ? '' : 'Enter a valid South African number, e.g. 039 433 1223.';
};

export const validateMinLength = (value, min, label = 'This field') => {
  if (!value || !value.trim()) return `${label} is required.`;
  return value.trim().length >= min ? '' : `${label} must be at least ${min} characters.`;
};

/** Builds a mailto: URL with an encoded subject and body. */
export const buildMailto = (to, subject, body) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
