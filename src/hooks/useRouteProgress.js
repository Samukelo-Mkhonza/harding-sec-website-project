import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to show progress bar during route transitions
 * @returns {boolean} - Whether a route transition is in progress
 */
const useRouteProgress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start loading on route change
    setIsLoading(true);

    // Simulate route transition time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading;
};

export default useRouteProgress;
