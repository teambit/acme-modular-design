import { render, screen } from '@testing-library/react';
import { PriceTag } from './price-tag.js';

it('formats cents as a price', () => {
  render(<PriceTag cents={4900} />);
  expect(screen.getByText('$49.00')).toBeTruthy();
});

it('strikes through the compare-at price on a discount', () => {
  const { container } = render(<PriceTag cents={35910} compareAtCents={39900} />);
  expect(container.querySelector('s')?.textContent).toBe('$399.00');
});

it('hides the compare-at price when it is not higher', () => {
  const { container } = render(<PriceTag cents={4900} compareAtCents={4900} />);
  expect(container.querySelector('s')).toBeNull();
});
