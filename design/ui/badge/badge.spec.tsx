import { render, screen } from '@testing-library/react';
import { Badge } from './badge.js';

it('renders its label', () => {
  render(<Badge tone="positive">In stock</Badge>);
  expect(screen.getByText('In stock')).toBeTruthy();
});

it('defaults to the neutral tone', () => {
  render(<Badge>Bestseller</Badge>);
  expect(screen.getByText('Bestseller').getAttribute('data-tone')).toBe('neutral');
});

it('exposes the requested tone', () => {
  render(<Badge tone="negative">Out of stock</Badge>);
  expect(screen.getByText('Out of stock').getAttribute('data-tone')).toBe('negative');
});
