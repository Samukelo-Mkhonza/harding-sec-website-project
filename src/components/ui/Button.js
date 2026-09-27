import React from 'react';
import { Link } from 'react-router-dom';
import cx from './cx';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
  secondary: 'bg-white text-primary-dark border border-neutral-300 hover:border-primary hover:text-primary',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
  // For use on dark (green) backgrounds
  inverse: 'bg-white text-primary-dark hover:bg-accent-neon hover:text-white',
  'outline-inverse': 'border-2 border-white/70 text-white hover:bg-white hover:text-primary-dark',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

/**
 * Button — renders a <Link> when given `to`, an <a> when given `href`,
 * otherwise a <button>. All variants share size, focus and disabled styles.
 */
const Button = React.forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, className, children, fullWidth, type, ...rest },
  ref
) {
  const classes = cx(
    'inline-flex items-center justify-center font-semibold rounded-none transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    fullWidth && 'w-full',
    className
  );

  if (to) {
    return <Link ref={ref} to={to} className={classes} {...rest}>{children}</Link>;
  }
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type={type || 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
});

export default Button;
