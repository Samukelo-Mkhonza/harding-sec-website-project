import { render, screen } from '@testing-library/react';
import AppProviders from './AppProviders';
import AppRouter from './AppRouter';

test('renders the site shell with header, main landmark and footer', () => {
  render(
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getAllByText(/Harding Secondary/i).length).toBeGreaterThan(0);
});
