import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiAlertCircle } from 'react-icons/fi';
import { setAuthToken } from '../../utils/portalStorage';

// Simple access code for demo (in production, this would be server-side validation)
const VALID_ACCESS_CODE = 'HSS2024';

const AuthenticationGate = ({ onAuthenticate }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (accessCode.trim().toUpperCase() === VALID_ACCESS_CODE) {
      // Set authentication token with 30-day expiry
      setAuthToken(accessCode.trim());
      setLoading(false);
      onAuthenticate(true);
    } else {
      setError('Invalid access code. Please contact the school administration for access.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <FiLock className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          Authentication Required
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your access code to view past papers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="accessCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Access Code
            </label>
            <input
              type="text"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter access code"
              required
              aria-label="Access code input"
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              id="error-message"
            >
              <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !accessCode.trim()}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Submit access code"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Verifying...
              </span>
            ) : (
              'Access Portal'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Don't have an access code?{' '}
            <a
              href="/contact"
              className="text-primary hover:text-primary-dark underline"
            >
              Contact Administration
            </a>
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Demo code: HSS2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationGate;
