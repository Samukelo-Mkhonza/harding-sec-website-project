import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';

/**
 * Newsletter Subscription Form Component
 * Features email validation and success confirmation within 2 seconds
 * Validates: Requirements 6.5
 */
const NewsletterForm = ({ inline = false, className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError('');

    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call (completes within 2 seconds as per requirement 6.5)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store in localStorage (mock persistence)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }

      // Show success state
      setIsSubscribed(true);
      toast.success('Successfully subscribed! Check your email for confirmation.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);

    } catch (error) {
      setError('Something went wrong. Please try again.');
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error on change
  };

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={isSubmitting || isSubscribed}
            className={`
              w-full px-4 py-3 border rounded-lg transition-all duration-200
              ${error 
                ? 'border-accent-error focus:border-accent-error focus:ring-accent-error/20' 
                : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
              }
              ${isSubscribed ? 'bg-green-50 border-green-500' : 'bg-white'}
              disabled:bg-neutral-100 disabled:cursor-not-allowed
              focus:outline-none focus:ring-4
              placeholder:text-neutral-400
            `}
            aria-label="Email address"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                id="newsletter-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-accent-error mt-1"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSubscribed}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-300
            flex items-center gap-2 whitespace-nowrap
            ${isSubscribed
              ? 'bg-green-500 text-white'
              : isSubmitting
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </>
          ) : isSubscribed ? (
            <>
              <i className="fas fa-check"></i>
              Subscribed!
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Subscribe
            </>
          )}
        </button>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <i className="fas fa-envelope text-2xl text-primary"></i>
        </div>
        <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
          Stay Updated
        </h3>
        <p className="text-neutral-600">
          Subscribe to our newsletter for the latest news, events, and updates from Harding Secondary School.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email address"
            disabled={isSubmitting || isSubscribed}
            className={`
              w-full px-4 py-3 border rounded-lg transition-all duration-200
              ${error 
                ? 'border-accent-error focus:border-accent-error focus:ring-accent-error/20' 
                : 'border-neutral-300 focus:border-primary focus:ring-primary/20'
              }
              ${isSubscribed ? 'bg-green-50 border-green-500' : 'bg-white'}
              disabled:bg-neutral-100 disabled:cursor-not-allowed
              focus:outline-none focus:ring-4
              placeholder:text-neutral-400
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'newsletter-error-full' : undefined}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                id="newsletter-error-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-sm text-accent-error mt-2"
                role="alert"
              >
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubscribed}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
            flex items-center justify-center gap-2
            ${isSubscribed
              ? 'bg-green-500 text-white'
              : isSubmitting
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg transform hover:-translate-y-1'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </>
          ) : isSubscribed ? (
            <>
              <i className="fas fa-check-circle"></i>
              Successfully Subscribed!
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Subscribe to Newsletter
            </>
          )}
        </button>

        <p className="text-xs text-neutral-500 text-center">
          <i className="fas fa-lock mr-1"></i>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </motion.div>
  );
};

export default NewsletterForm;
