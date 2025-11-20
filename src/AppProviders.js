import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider, LoadingProvider, UIProvider } from './contexts';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * AppProviders Component
 * Wraps the application with all necessary context providers
 * 
 * Provider hierarchy (outer to inner):
 * 1. ErrorBoundary - Catches and handles errors
 * 2. HelmetProvider - SEO and meta tags management
 * 3. BrowserRouter - Enables routing
 * 4. ToastProvider - Toast notifications
 * 5. LoadingProvider - Loading states
 * 6. UIProvider - UI state (modals, overlays, etc.)
 */
const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ToastProvider>
            <LoadingProvider>
              <UIProvider>
                {children}
              </UIProvider>
            </LoadingProvider>
          </ToastProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
