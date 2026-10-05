import { renderHook } from '@testing-library/react';
import useScrollLock from './useScrollLock';

const html = document.documentElement;

describe('useScrollLock', () => {
  afterEach(() => {
    html.style.overflow = '';
    html.style.scrollbarGutter = '';
    document.body.style.overflow = '';
  });

  it('locks page scroll while active and restores it on unmount', () => {
    const { unmount } = renderHook(() => useScrollLock());
    expect(html.style.overflow).toBe('hidden');
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(html.style.overflow).toBe('');
    expect(document.body.style.overflow).toBe('');
  });

  it('does nothing when inactive and follows the flag when it changes', () => {
    const { rerender } = renderHook(({ active }) => useScrollLock(active), {
      initialProps: { active: false },
    });
    expect(html.style.overflow).toBe('');
    rerender({ active: true });
    expect(html.style.overflow).toBe('hidden');
    rerender({ active: false });
    expect(html.style.overflow).toBe('');
  });

  it('keeps the page locked until the last of several overlays closes', () => {
    const { unmount: closeFirst } = renderHook(() => useScrollLock());
    const { unmount: closeSecond } = renderHook(() => useScrollLock());
    closeFirst();
    expect(document.body.style.overflow).toBe('hidden');
    closeSecond();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores inline styles that were already set before locking', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = renderHook(() => useScrollLock());
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });
});

describe('useScrollLock scrollbar gutter', () => {
  const setScrollbarWidth = (px) => {
    Object.defineProperty(html, 'clientWidth', { configurable: true, value: window.innerWidth - px });
  };

  afterEach(() => {
    delete html.clientWidth;
    html.style.overflow = '';
    html.style.scrollbarGutter = '';
    document.body.style.overflow = '';
  });

  it('reserves the gutter when a classic scrollbar takes up space', () => {
    setScrollbarWidth(15);
    const { unmount } = renderHook(() => useScrollLock());
    expect(html.style.scrollbarGutter).toBe('stable');
    unmount();
    expect(html.style.scrollbarGutter).toBe('');
  });

  it('leaves layout alone with overlay scrollbars', () => {
    setScrollbarWidth(0);
    const { unmount } = renderHook(() => useScrollLock());
    expect(html.style.scrollbarGutter).toBe('');
    unmount();
  });
});
