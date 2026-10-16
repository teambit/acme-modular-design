import { render, screen } from '@testing-library/react';
import { Alert } from './alert.js';

it('uses a polite status for info by default', () => {
  render(<Alert title="Almost there">Add 3 more items for 10% off.</Alert>);
  const status = screen.getByRole('status');
  expect(status.textContent).toContain('Almost there');
  expect(status.textContent).toContain('Add 3 more items for 10% off.');
  expect(screen.queryByRole('alert')).toBeNull();
});

it('uses role="alert" for negative and warning tones', () => {
  render(
    <>
      <Alert tone="negative">Payment declined.</Alert>
      <Alert tone="warning">Only 3 left.</Alert>
    </>
  );
  expect(screen.getAllByRole('alert')).toHaveLength(2);
});

it('uses role="status" for positive', () => {
  render(<Alert tone="positive">Order placed.</Alert>);
  expect(screen.getByRole('status').textContent).toBe('Order placed.');
});
