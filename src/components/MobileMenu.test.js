import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const renderMenu = (props) =>
  render(
    <BrowserRouter>
      <MobileMenu isOpen={false} onClose={() => {}} {...props} />
    </BrowserRouter>
  );

describe('MobileMenu', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('keeps the closed drawer out of the tab order', () => {
    renderMenu();
    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).toHaveAttribute('inert');
  });

  it('is an accessible dialog that takes focus and locks page scroll when open', () => {
    renderMenu({ isOpen: true });
    const drawer = screen.getByRole('dialog', { name: 'Site menu' });
    expect(drawer).not.toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    renderMenu({ isOpen: true, onClose });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('restores page scroll when closed', () => {
    const { rerender } = renderMenu({ isOpen: true });
    rerender(
      <BrowserRouter>
        <MobileMenu isOpen={false} onClose={() => {}} />
      </BrowserRouter>
    );
    expect(document.body.style.overflow).toBe('');
  });
});
