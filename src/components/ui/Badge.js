import React from 'react';
import cx from './cx';

const TONES = {
  brand: 'bg-primary/10 text-primary-dark',
  solid: 'bg-primary text-white',
  neutral: 'bg-neutral-100 text-neutral-500',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

/** Badge — small status / category pill. */
const Badge = ({ tone = 'brand', className, children, ...rest }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap',
      TONES[tone] || TONES.brand,
      className
    )}
    {...rest}
  >
    {children}
  </span>
);

export default Badge;
