/**
 * Accessibility Utilities
 * Helper functions for accessibility compliance
 */

/**
 * Check if an element has sufficient color contrast
 * @param {string} foreground - Foreground color (hex or rgb)
 * @param {string} background - Background color (hex or rgb)
 * @returns {Object} - { ratio, passes: { AA, AAA } }
 */
export const checkColorContrast = (foreground, background) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Calculate relative luminance
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) return null;

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    passes: {
      AA: ratio >= 4.5,
      AALarge: ratio >= 3,
      AAA: ratio >= 7,
      AAALarge: ratio >= 4.5,
    },
  };
};

/**
 * Generate accessible label for form inputs
 * @param {string} name - Input name
 * @param {boolean} required - Is field required
 * @returns {string} - Accessible label
 */
export const generateAccessibleLabel = (name, required = false) => {
  const label = name
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/^./, (str) => str.toUpperCase());
  return required ? `${label} (required)` : label;
};

/**
 * Check if element is keyboard accessible
 * @param {HTMLElement} element - DOM element to check
 * @returns {boolean} - Is keyboard accessible
 */
export const isKeyboardAccessible = (element) => {
  if (!element) return false;

  const tabIndex = element.getAttribute('tabindex');
  const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
    element.tagName
  );

  return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0);
};

/**
 * Get ARIA attributes for an element
 * @param {Object} options - ARIA options
 * @returns {Object} - ARIA attributes
 */
export const getAriaAttributes = (options = {}) => {
  const {
    label,
    describedBy,
    expanded,
    controls,
    hasPopup,
    invalid,
    required,
    disabled,
    hidden,
    live,
    atomic,
  } = options;

  const attrs = {};

  if (label) attrs['aria-label'] = label;
  if (describedBy) attrs['aria-describedby'] = describedBy;
  if (expanded !== undefined) attrs['aria-expanded'] = expanded;
  if (controls) attrs['aria-controls'] = controls;
  if (hasPopup) attrs['aria-haspopup'] = hasPopup;
  if (invalid !== undefined) attrs['aria-invalid'] = invalid;
  if (required !== undefined) attrs['aria-required'] = required;
  if (disabled !== undefined) attrs['aria-disabled'] = disabled;
  if (hidden !== undefined) attrs['aria-hidden'] = hidden;
  if (live) attrs['aria-live'] = live;
  if (atomic !== undefined) attrs['aria-atomic'] = atomic;

  return attrs;
};

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Trap focus within an element (for modals, dialogs)
 * @param {HTMLElement} element - Container element
 * @returns {Function} - Cleanup function
 */
export const trapFocus = (element) => {
  if (!element) return () => {};

  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Check heading hierarchy
 * @returns {Array} - Array of heading issues
 */
export const checkHeadingHierarchy = () => {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const issues = [];
  let previousLevel = 0;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName[1]);

    // Check for h1
    if (index === 0 && level !== 1) {
      issues.push({
        element: heading,
        issue: 'Page should start with h1',
        level,
      });
    }

    // Check for skipped levels
    if (level - previousLevel > 1) {
      issues.push({
        element: heading,
        issue: `Skipped from h${previousLevel} to h${level}`,
        level,
      });
    }

    previousLevel = level;
  });

  return issues;
};

/**
 * Check for images without alt text
 * @returns {Array} - Array of images without alt
 */
export const checkImageAltText = () => {
  const images = Array.from(document.querySelectorAll('img'));
  return images.filter((img) => !img.hasAttribute('alt') || img.alt.trim() === '');
};

/**
 * Check for form inputs without labels
 * @returns {Array} - Array of inputs without labels
 */
export const checkFormLabels = () => {
  const inputs = Array.from(
    document.querySelectorAll('input:not([type="hidden"]), select, textarea')
  );

  return inputs.filter((input) => {
    const id = input.id;
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const label = id ? document.querySelector(`label[for="${id}"]`) : null;

    return !label && !ariaLabel && !ariaLabelledBy;
  });
};

/**
 * Run accessibility audit
 * @returns {Object} - Audit results
 */
export const runAccessibilityAudit = () => {
  return {
    headingIssues: checkHeadingHierarchy(),
    imagesWithoutAlt: checkImageAltText(),
    inputsWithoutLabels: checkFormLabels(),
    timestamp: new Date().toISOString(),
  };
};

export default {
  checkColorContrast,
  generateAccessibleLabel,
  isKeyboardAccessible,
  getAriaAttributes,
  announceToScreenReader,
  trapFocus,
  checkHeadingHierarchy,
  checkImageAltText,
  checkFormLabels,
  runAccessibilityAudit,
};
