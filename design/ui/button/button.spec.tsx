import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button.js';

it('renders its label and defaults to a non-submitting button', () => {
  render(<Button>Add to cart</Button>);
  const button = screen.getByRole('button', { name: 'Add to cart' });
  expect(button.getAttribute('type')).toBe('button');
});

it('calls onClick when pressed', () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Pay</Button>);
  fireEvent.click(screen.getByRole('button', { name: 'Pay' }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('does not fire when disabled', () => {
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>Pay</Button>);
  fireEvent.click(screen.getByRole('button', { name: 'Pay' }));
  expect(onClick).not.toHaveBeenCalled();
});
