import {
  validateRequired, validateEmail, validatePhone, validateMinLength, buildMailto,
} from './formValidation';

describe('formValidation', () => {
  it('validateRequired', () => {
    expect(validateRequired('', 'Name')).toBe('Name is required.');
    expect(validateRequired('   ', 'Name')).toBe('Name is required.');
    expect(validateRequired('Thandi', 'Name')).toBe('');
  });

  it('validateEmail', () => {
    expect(validateEmail('')).toMatch(/required/);
    expect(validateEmail('not-an-email')).toMatch(/valid email/);
    expect(validateEmail('a@b')).toMatch(/valid email/);
    expect(validateEmail(' parent@example.co.za ')).toBe('');
  });

  it('validatePhone accepts SA formats and is optional by default', () => {
    expect(validatePhone('')).toBe('');
    expect(validatePhone('', { required: true })).toMatch(/required/);
    expect(validatePhone('039 433 1223')).toBe('');
    expect(validatePhone('+27 82 123 4567')).toBe('');
    expect(validatePhone('082-123-4567')).toBe('');
    expect(validatePhone('12345')).toMatch(/South African/);
    expect(validatePhone('0012345678')).toMatch(/South African/);
  });

  it('validateMinLength', () => {
    expect(validateMinLength('', 10, 'Message')).toBe('Message is required.');
    expect(validateMinLength('short', 10, 'Message')).toBe('Message must be at least 10 characters.');
    expect(validateMinLength('long enough text', 10, 'Message')).toBe('');
  });

  it('buildMailto encodes subject and body', () => {
    expect(buildMailto('info@x.za', 'Hi & bye', 'Line 1\nLine 2')).toBe(
      'mailto:info@x.za?subject=Hi%20%26%20bye&body=Line%201%0ALine%202'
    );
  });
});
