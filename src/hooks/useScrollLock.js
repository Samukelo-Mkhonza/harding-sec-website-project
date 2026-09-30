import { useEffect } from 'react';

// Shared across every caller so stacked overlays (e.g. search opened over the
// mobile menu) only unlock the page when the last one closes.
let lockCount = 0;
let saved = null;

/**
 * Stops the page behind a modal or drawer from scrolling while `active`.
 * Where the scrollbar takes up layout space (desktop), scrollbar-gutter keeps
 * that space so the page and fixed header don't jump sideways. It is skipped
 * for overlay scrollbars (phones, macOS): reserving a gutter there would
 * narrow the page and reflow it.
 */
const useScrollLock = (active = true) => {
  useEffect(() => {
    if (!active) return undefined;

    const html = document.documentElement;
    const { body } = document;
    if (lockCount === 0) {
      saved = {
        htmlOverflow: html.style.overflow,
        htmlGutter: html.style.scrollbarGutter,
        bodyOverflow: body.style.overflow,
      };
      if (window.innerWidth - html.clientWidth > 0) html.style.scrollbarGutter = 'stable';
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0 && saved) {
        html.style.overflow = saved.htmlOverflow;
        html.style.scrollbarGutter = saved.htmlGutter;
        body.style.overflow = saved.bodyOverflow;
        saved = null;
      }
    };
  }, [active]);
};

export default useScrollLock;
