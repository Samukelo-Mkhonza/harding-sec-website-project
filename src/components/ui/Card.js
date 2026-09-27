import React from 'react';
import cx from './cx';

/**
 * Card — white surface with border and optional hover lift / top accent.
 */
const Card = ({ as: Tag = 'div', interactive, accent, padding = 'md', className, children, ...rest }) => (
  <Tag
    className={cx(
      'bg-white border border-neutral-200 shadow-sm',
      padding === 'md' && 'p-6 md:p-8',
      padding === 'sm' && 'p-5',
      accent && 'border-t-4 border-t-primary',
      interactive && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40',
      className
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Card;
