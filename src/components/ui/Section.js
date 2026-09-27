import React from 'react';
import cx from './cx';

const TONES = {
  white: 'bg-white',
  muted: 'bg-neutral-50',
  brand: 'bg-primary-dark text-white',
};

const SPACING = {
  sm: 'py-10 md:py-14',
  md: 'py-16 md:py-24',
};

/** Container — the single max-width + gutter used site-wide. */
export const Container = ({ as: Tag = 'div', className, narrow, children, ...rest }) => (
  <Tag className={cx('container-custom', narrow && '!max-w-4xl', className)} {...rest}>
    {children}
  </Tag>
);

/** Section — a full-width band with standard vertical rhythm and a container. */
const Section = ({ tone = 'white', spacing = 'md', narrow, className, containerClassName, children, ...rest }) => (
  <section className={cx(TONES[tone] || TONES.white, SPACING[spacing] || SPACING.md, className)} {...rest}>
    <Container narrow={narrow} className={containerClassName}>{children}</Container>
  </section>
);

export default Section;
