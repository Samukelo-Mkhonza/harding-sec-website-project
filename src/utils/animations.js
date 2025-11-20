/**
 * Animation utility functions and configurations
 */

// Animation configuration constants
export const ANIMATION_CONFIG = {
  fadeIn: {
    duration: 600,
    easing: 'ease-in-out',
    delay: 0,
  },
  slideUp: {
    duration: 600,
    easing: 'ease-out',
    delay: 0,
  },
  slideDown: {
    duration: 600,
    easing: 'ease-out',
    delay: 0,
  },
  slideLeft: {
    duration: 600,
    easing: 'ease-out',
    delay: 0,
  },
  slideRight: {
    duration: 600,
    easing: 'ease-out',
    delay: 0,
  },
  scaleHover: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    scale: 1.05,
  },
  parallax: {
    speed: 0.5, // 50% of scroll speed
  },
  skeleton: {
    duration: 1500,
    easing: 'ease-in-out',
  },
};

// Framer Motion variants for common animations
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.fadeIn.duration / 1000,
      ease: ANIMATION_CONFIG.fadeIn.easing,
    },
  },
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.slideUp.duration / 1000,
      ease: ANIMATION_CONFIG.slideUp.easing,
    },
  },
};

export const slideDownVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.slideDown.duration / 1000,
      ease: ANIMATION_CONFIG.slideDown.easing,
    },
  },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.slideLeft.duration / 1000,
      ease: ANIMATION_CONFIG.slideLeft.easing,
    },
  },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.slideRight.duration / 1000,
      ease: ANIMATION_CONFIG.slideRight.easing,
    },
  },
};

export const scaleVariants = {
  initial: { scale: 1 },
  hover: {
    scale: ANIMATION_CONFIG.scaleHover.scale,
    transition: {
      duration: ANIMATION_CONFIG.scaleHover.duration / 1000,
      ease: ANIMATION_CONFIG.scaleHover.easing,
    },
  },
};

// Stagger children animation
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Calculate parallax transform value
 * @param {number} scrollY - Current scroll position
 * @param {number} speed - Parallax speed (0-1, default 0.5)
 * @returns {number} - Transform value
 */
export const calculateParallax = (scrollY, speed = ANIMATION_CONFIG.parallax.speed) => {
  return scrollY * speed;
};

/**
 * Easing functions
 */
export const easingFunctions = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  linear: 'linear',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

/**
 * Get animation delay based on index
 * @param {number} index - Element index
 * @param {number} baseDelay - Base delay in ms
 * @returns {number} - Calculated delay in ms
 */
export const getStaggerDelay = (index, baseDelay = 100) => {
  return index * baseDelay;
};
