import React, { useState } from 'react';
import { FaLock, FaExclamationCircle, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { setAuthToken } from '../../utils/portalStorage';

const VALID_ACCESS_CODE = 'HSS2024';

const AuthenticationGate = ({ onAuthenticate }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (accessCode.trim().toUpperCase() === VALID_ACCESS_CODE) {
      setAuthToken(accessCode.trim());
      setLoading(false);
      onAuthenticate(true);
    } else {
      setError('Invalid access code. Please contact the school administration for access.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden">

        {/* Card header band */}
        <div className="bg-primary-dark px-8 py-7 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-white text-xl" />
          </div>
          <h2 className="text-xl font-heading font-bold text-white mb-1">Access Required</h2>
          <p className="text-white/65 text-sm">Enter your school-issued access code to continue</p>
        </div>

        {/* Form body */}
        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accessCode" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Access Code
              </label>
              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
                <input
                  type="text"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder-neutral-400"
                  placeholder="e.g. HSS2024"
                  required
                  aria-describedby={error ? 'error-message' : undefined}
                  autoComplete="off"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                id="error-message"
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
              >
                <FaExclamationCircle className="flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !accessCode.trim()}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Verifying…
                </span>
              ) : (
                'Access Portal'
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2 text-center">
            <p className="text-sm text-neutral-500">
              Don't have a code?{' '}
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Contact the school office
              </Link>
            </p>
            <p className="text-xs text-neutral-400">
              Demo code: <span className="font-mono font-semibold text-neutral-600">HSS2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGate;
