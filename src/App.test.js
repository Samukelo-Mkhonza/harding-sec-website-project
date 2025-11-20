import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Harding Secondary School website', () => {
  render(<App />);
  const heading = screen.getByText(/Harding Secondary/i);
  expect(heading).toBeInTheDocument();
});
