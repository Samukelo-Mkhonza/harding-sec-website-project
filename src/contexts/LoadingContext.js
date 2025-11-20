import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

/**
 * Loading Context Provider
 * Manages global loading states for the application
 */
export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);

  const startLoading = (key = 'global') => {
    if (key === 'global') {
      setGlobalLoading(true);
    } else {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
    }
  };

  const stopLoading = (key = 'global') => {
    if (key === 'global') {
      setGlobalLoading(false);
    } else {
      setLoadingStates((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }
  };

  const isLoading = (key = 'global') => {
    if (key === 'global') {
      return globalLoading;
    }
    return loadingStates[key] || false;
  };

  const value = {
    startLoading,
    stopLoading,
    isLoading,
    globalLoading,
    loadingStates,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * Custom hook to use loading state
 * @returns {Object} Loading functions and states
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingContext;
