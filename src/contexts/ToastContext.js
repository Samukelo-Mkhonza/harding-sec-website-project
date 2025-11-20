import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

/**
 * Toast Context Provider
 * Wraps the app with toast notification functionality
 */
export const ToastProvider = ({ children }) => {
  const showToast = {
    success: (message, options = {}) => {
      return toast.success(message, {
        duration: options.duration || 4000,
        position: options.position || 'top-right',
        ...options,
      });
    },
    error: (message, options = {}) => {
      return toast.error(message, {
        duration: options.duration || 0, // Persistent by default
        position: options.position || 'top-right',
        ...options,
      });
    },
    info: (message, options = {}) => {
      return toast(message, {
        duration: options.duration || 4000,
        position: options.position || 'top-right',
        icon: 'ℹ️',
        ...options,
      });
    },
    warning: (message, options = {}) => {
      return toast(message, {
        duration: options.duration || 4000,
        position: options.position || 'top-right',
        icon: '⚠️',
        style: {
          background: '#FF9800',
          color: '#fff',
        },
        ...options,
      });
    },
    promise: (promise, messages, options = {}) => {
      return toast.promise(
        promise,
        {
          loading: messages.loading || 'Loading...',
          success: messages.success || 'Success!',
          error: messages.error || 'Error occurred',
        },
        options
      );
    },
    dismiss: (toastId) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#00A651',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #00A651',
            },
          },
          error: {
            iconTheme: {
              primary: '#F44336',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #F44336',
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to use toast notifications
 * @returns {Object} Toast functions
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
