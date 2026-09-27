import React, { useState } from 'react';
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { Button } from './ui';
import {
  validateRequired, validateEmail, validatePhone, validateMinLength, buildMailto,
} from '../utils/formValidation';
import { SCHOOL_CONTACT } from '../utils/constants';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', hint: 'Optional' },
  { name: 'subject', label: 'Subject', type: 'text', required: true },
];

const validate = (values) => ({
  name: validateRequired(values.name, 'Full name'),
  email: validateEmail(values.email),
  phone: validatePhone(values.phone),
  subject: validateRequired(values.subject, 'Subject'),
  message: validateMinLength(values.message, 10, 'Message'),
});

const inputClass = (hasError) =>
  `w-full px-4 py-3 border bg-white text-base text-neutral-600 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
    hasError ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 hover:border-neutral-400 focus:border-primary'
  }`;

/**
 * Contact form. The site has no backend, so a valid submission opens the
 * visitor's email app with the message pre-filled and addressed to the school.
 */
const ContactForm = () => {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const errors = validate(values);
  const showError = (name) => touched[name] && errors[name];

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setSent(false);
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    const firstInvalid = Object.keys(errors).find((k) => errors[k]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    const body = [
      values.message.trim(),
      '',
      '—',
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phone.trim() && `Phone: ${values.phone.trim()}`,
    ].filter((line) => line !== false && line !== '').join('\n');
    window.location.href = buildMailto(SCHOOL_CONTACT.EMAIL, values.subject.trim(), body);
    setSent(true);
  };

  const describedBy = (name, hint) =>
    [showError(name) && `contact-${name}-error`, hint && `contact-${name}-hint`].filter(Boolean).join(' ') || undefined;

  return (
    <div className="bg-white p-6 md:p-10 border border-neutral-200 shadow-sm">
      <h2 className="!text-2xl md:!text-3xl font-heading font-bold text-primary-dark mb-2">Send us a message</h2>
      <p className="text-neutral-400 !text-sm mb-6">
        Fields marked <span className="text-red-600" aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {sent && (
        <div role="status" className="flex items-start gap-3 p-4 mb-6 bg-green-50 border border-green-200 text-green-900 text-sm">
          <FaCheckCircle className="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
          <p className="!text-sm">
            Your email app should now open with your message ready to send. If it doesn&apos;t, email us at{' '}
            <a className="font-semibold underline" href={`mailto:${SCHOOL_CONTACT.EMAIL}`}>{SCHOOL_CONTACT.EMAIL}</a>{' '}
            or call <a className="font-semibold underline" href={SCHOOL_CONTACT.PHONE_HREF}>{SCHOOL_CONTACT.PHONE}</a>.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FIELDS.map(({ name, label, type, autoComplete, required, hint }) => (
            <div key={name}>
              <label htmlFor={`contact-${name}`} className="block text-sm font-semibold text-neutral-600 mb-1.5">
                {label}
                {required && <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>}
                {hint && <span id={`contact-${name}-hint`} className="ml-1.5 font-normal text-neutral-400">({hint})</span>}
              </label>
              <input
                id={`contact-${name}`}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required={required}
                aria-invalid={Boolean(showError(name))}
                aria-describedby={describedBy(name, hint)}
                className={inputClass(showError(name))}
              />
              {showError(name) && (
                <p id={`contact-${name}-error`} className="mt-1.5 !text-sm text-red-600">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold text-neutral-600 mb-1.5">
            Message<span className="text-red-600 ml-0.5" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="6"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={Boolean(showError('message'))}
            aria-describedby={describedBy('message')}
            className={`${inputClass(showError('message'))} resize-y min-h-[150px]`}
          />
          {showError('message') && (
            <p id="contact-message-error" className="mt-1.5 !text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" fullWidth>
          <FaPaperPlane aria-hidden="true" />
          Send message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
