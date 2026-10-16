import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner.js';

it('renders a status named "Loading" by default', () => {
  render(<Spinner />);
  expect(screen.getByRole('status', { name: 'Loading' })).toBeTruthy();
});

it('announces a custom label', () => {
  render(<Spinner label="Loading products" />);
  const status = screen.getByRole('status', { name: 'Loading products' });
  expect(status.textContent).toBe('Loading products');
});
