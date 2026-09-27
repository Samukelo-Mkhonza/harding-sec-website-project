import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import cx from './cx';

/**
 * PageHero — the banner at the top of every inner page.
 *
 * Every page used to hand-roll its own hero with different padding, overlay
 * strength and type sizes; this is now the one place that decides those.
 */
const PageHero = ({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  image,
  stats,
  size = 'md',
  breadcrumbs = true,
  breadcrumbLabels,
  className,
  children,
}) => (
  <section
    className={cx('relative overflow-hidden bg-primary-dark text-white', className)}
    aria-labelledby="page-title"
  >
    {image && (
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    )}
    {/* Overlay keeps text at AA contrast regardless of the photo underneath */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-secondary-dark/90 via-primary-dark/85 to-primary-dark/95"
      aria-hidden="true"
    />

    <div className="relative z-10">
      {breadcrumbs && (
        <div className="container-custom pt-5">
          <Breadcrumbs tone="light" customLabels={breadcrumbLabels} />
        </div>
      )}

      <div
        className={cx(
          'container-custom text-center',
          size === 'sm' ? 'py-12 md:py-16' : 'py-16 md:py-24'
        )}
      >
        {eyebrow && (
          <p className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-accent-neon text-xs md:text-sm font-semibold tracking-widest uppercase mb-5">
            {EyebrowIcon && <EyebrowIcon className="text-xs" aria-hidden="true" />}
            {eyebrow}
          </p>
        )}
        <h1
          id="page-title"
          className={cx(
            'font-heading font-bold !text-white leading-tight',
            size === 'sm' ? '!text-3xl md:!text-5xl' : '!text-4xl md:!text-5xl lg:!text-6xl'
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base md:text-xl max-w-2xl mx-auto !text-white/85">{description}</p>
        )}

        {stats && stats.length > 0 && (
          <dl className="mt-10 flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6">
            {stats.map(({ label, value, note }) => (
              <div key={label} className="flex flex-col text-center min-w-[6rem]">
                <dt className="text-white/70 text-xs uppercase tracking-wider mt-1">{label}</dt>
                <dd className="text-2xl md:text-3xl font-heading font-bold text-accent-neon order-first">{value}</dd>
                {note && <dd className="text-white/60 text-xs mt-0.5">{note}</dd>}
              </div>
            ))}
          </dl>
        )}

        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
