import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Harding Secondary School website', () => {
  render(<App />);
  // The name appears in multiple places (header, hero, footer), so assert
  // that at least one instance is rendered.
  const headings = screen.getAllByText(/Harding Secondary/i);
  expect(headings.length).toBeGreaterThan(0);
});
