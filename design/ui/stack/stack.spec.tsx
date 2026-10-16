import { render, screen } from '@testing-library/react';
import { Stack } from './stack.js';

it('renders its children in order', () => {
  const { container } = render(
    <Stack>
      <span>Standing Desk</span>
      <span>Task Chair</span>
    </Stack>
  );
  expect(container.firstElementChild?.textContent).toBe('Standing DeskTask Chair');
  expect(screen.getByText('Task Chair')).toBeTruthy();
});

it('applies align and justify as inline styles', () => {
  const { container } = render(
    <Stack direction="row" align="center" justify="space-between">
      <span>Subtotal</span>
    </Stack>
  );
  const stack = container.firstElementChild as HTMLElement;
  expect(stack.style.alignItems).toBe('center');
  expect(stack.style.justifyContent).toBe('space-between');
});

it('keeps a custom className', () => {
  const { container } = render(<Stack className="checkout-actions" />);
  expect(container.firstElementChild?.classList.contains('checkout-actions')).toBe(true);
});
