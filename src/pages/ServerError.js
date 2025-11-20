import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components';

/**
 * 500 Server Error Page
 * Custom error page for server errors with retry mechanism
 */
const ServerError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <SEO
        title="Server Error - Harding Secondary School"
        description="We're experiencing technical difficulties. Please try again in a moment."
        url="https://hardingsecondary.edu.za/500"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Error Code */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mb-6">
              <i className="fas fa-exclamation-triangle text-5xl text-red-500"></i>
            </div>
            <h1 className="text-7xl font-bold text-red-600 mb-4">500</h1>
            <div className="h-1 w-32 bg-red-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Something Went Wrong
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <i className="fas fa-home"></i>
              Go Home
            </Link>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Need Immediate Assistance?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-neutral-50">
                <i className="fas fa-phone text-3xl text-primary"></i>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Call Us</p>
                  <a
                    href="tel:0394331223"
                    className="font-semibold text-primary hover:text-primary-dark"
                  >
                    039 433 1223
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-neutral-50">
                <i className="fas fa-envelope text-3xl text-primary"></i>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Email Us</p>
                  <a
                    href="mailto:info@hardingsecondary.edu.za"
                    className="font-semibold text-primary hover:text-primary-dark text-sm"
                  >
                    info@hardingsecondary.edu.za
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-neutral-50">
                <i className="fas fa-clock text-3xl text-primary"></i>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Office Hours</p>
                  <p className="font-semibold text-neutral-900 text-sm">
                    Mon-Fri: 7:30 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-neutral-100 border-2 border-neutral-300 rounded-lg p-6 text-left">
              <div className="flex items-start gap-4">
                <i className="fas fa-code text-neutral-500 text-2xl flex-shrink-0 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Development Mode</h4>
                  <p className="text-neutral-600 text-sm mb-2">
                    This error page is being displayed because an unexpected error occurred.
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Check the browser console for more details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Message */}
          <div className="mt-8 text-sm text-neutral-500">
            <p>Error Code: 500 | Server Error</p>
            <p className="mt-2">
              If this problem persists, please{' '}
              <Link to="/contact" className="text-primary hover:underline font-semibold">
                contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerError;
