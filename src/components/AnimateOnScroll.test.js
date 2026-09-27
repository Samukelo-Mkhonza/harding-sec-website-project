import { render, screen } from '@testing-library/react';
import AnimateOnScroll from './AnimateOnScroll';

describe('AnimateOnScroll', () => {
  const originalIO = window.IntersectionObserver;
  afterEach(() => {
    window.IntersectionObserver = originalIO;
    global.IntersectionObserver = originalIO;
  });

  it('renders content visibly when IntersectionObserver is unavailable', () => {
    delete window.IntersectionObserver;
    delete global.IntersectionObserver;
    render(<AnimateOnScroll animation="slide-up"><p>Visible</p></AnimateOnScroll>);
    const wrapper = screen.getByText('Visible').parentElement;
    expect(wrapper.className).not.toMatch(/opacity-0/);
  });

  it('keeps content printable while waiting to animate', () => {
    render(<AnimateOnScroll><p>Pending</p></AnimateOnScroll>);
    const wrapper = screen.getByText('Pending').parentElement;
    expect(wrapper.className).toMatch(/opacity-0/);
    expect(wrapper.className).toMatch(/print:opacity-100/);
  });

  it('renders the requested element and passes className through', () => {
    render(<AnimateOnScroll as="section" className="extra"><p>X</p></AnimateOnScroll>);
    const wrapper = screen.getByText('X').parentElement;
    expect(wrapper.tagName).toBe('SECTION');
    expect(wrapper.className).toMatch(/extra/);
  });
});
