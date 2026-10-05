import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

const Harness = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  return (
    <BrowserRouter>
      <button type="button">before</button>
      <Navigation
        activeMenu={activeMenu}
        onMenuOpen={setActiveMenu}
        onMenuClose={() => setActiveMenu(null)}
      />
    </BrowserRouter>
  );
};

describe('Navigation mega menus', () => {
  it('opens a mega menu from its toggle button and exposes its state', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'Academics menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    expect(screen.queryByRole('link', { name: 'Curriculum Overview' })).not.toBeInTheDocument();

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', 'mega-menu-academics');
    expect(screen.getByRole('link', { name: 'Curriculum Overview' })).toBeInTheDocument();
  });

  it('lets keyboard users tab from the toggle into the menu links', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'Academics menu' });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.tab();
    expect(screen.getByRole('link', { name: 'Curriculum Overview' })).toHaveFocus();
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'Academics menu' });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.tab();
    fireEvent.keyDown(screen.getByRole('link', { name: 'Curriculum Overview' }), { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes when focus moves out of the menu', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'About menu' });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab({ shift: true });
    await userEvent.tab({ shift: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Navigation mega menus with a mouse', () => {
  it('stays open when the chevron is clicked after hovering', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'About menu' });
    await userEvent.hover(toggle);
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles closed from the keyboard', async () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'About menu' });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
