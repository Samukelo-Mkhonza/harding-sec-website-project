import React from 'react';
import { FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import Button from './Button';
import cx from './cx';

/** LoadingState — spinner with a label, announced to screen readers. */
export const LoadingState = ({ label = 'Loading…', className }) => (
  <div role="status" aria-live="polite" className={cx('flex flex-col items-center justify-center py-24 gap-4', className)}>
    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" aria-hidden="true" />
    <p className="text-neutral-400 text-sm">{label}</p>
  </div>
);

/** ErrorState — message plus a retry action. */
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We could not load this content. Please check your connection and try again.',
  onRetry,
  className,
}) => (
  <div role="alert" className={cx('max-w-md mx-auto bg-white border border-red-200 p-8 text-center shadow-sm', className)}>
    <FaExclamationTriangle className="mx-auto text-3xl text-red-500 mb-4" aria-hidden="true" />
    <h2 className="!text-xl font-bold text-neutral-600 mb-2">{title}</h2>
    <p className="text-neutral-400 !text-sm mb-6">{message}</p>
    <Button variant="primary" onClick={onRetry || (() => window.location.reload())}>
      Try again
    </Button>
  </div>
);

/** EmptyState — shown when a list or search has no results. */
export const EmptyState = ({
  icon: Icon = FaSearch,
  title = 'No results found',
  message,
  action,
  className,
}) => (
  <div className={cx('text-center py-16 px-6 bg-white border border-dashed border-neutral-300', className)}>
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="text-xl text-primary" aria-hidden="true" />
    </div>
    <h3 className="!text-lg font-bold text-neutral-600 mb-1">{title}</h3>
    {message && <p className="text-neutral-400 !text-sm max-w-sm mx-auto">{message}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);
