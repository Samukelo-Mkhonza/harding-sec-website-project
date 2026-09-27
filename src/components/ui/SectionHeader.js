import React from 'react';
import cx from './cx';

/**
 * SectionHeader — eyebrow + heading + optional lead paragraph.
 * `tone="light"` is for use on dark backgrounds.
 */
const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  as: Heading = 'h2',
  action,
  className,
}) => {
  const centred = align === 'center';
  const light = tone === 'light';

  return (
    <div
      className={cx(
        'mb-10 md:mb-12',
        centred ? 'text-center mx-auto max-w-3xl' : action && 'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4',
        className
      )}
    >
      <div className={cx(!centred && 'max-w-3xl')}>
        {eyebrow && (
          <p className={cx('section-label', light && '!text-accent-neon')}>{eyebrow}</p>
        )}
        <Heading
          className={cx(
            'text-3xl md:text-4xl font-heading font-bold leading-tight',
            light ? '!text-white' : 'text-primary-dark'
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className={cx('mt-4 text-base md:text-lg', light ? 'text-white/80' : 'text-neutral-400', centred && 'mx-auto')}>
            {description}
          </p>
        )}
      </div>
      {action && !centred && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
