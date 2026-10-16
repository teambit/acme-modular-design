import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './card.js';

it('renders the title, body and footer', () => {
  render(
    <Card title="Standing Desk" footer={<span>$399.00</span>}>
      Electric sit-stand desk
    </Card>
  );
  expect(screen.getByRole('heading', { name: 'Standing Desk' })).toBeTruthy();
  expect(screen.getByText('Electric sit-stand desk')).toBeTruthy();
  expect(screen.getByText('$399.00')).toBeTruthy();
});

it('is not focusable unless it is clickable', () => {
  const { container } = render(<Card title="Desk Lamp" />);
  expect(container.querySelector('article')?.getAttribute('tabindex')).toBeNull();
});

it('calls onClick on a click and on Enter', () => {
  const onClick = vi.fn();
  const { container } = render(<Card title="Corner Desk" onClick={onClick} />);
  const card = container.querySelector('article')!;
  fireEvent.click(screen.getByText('Corner Desk'));
  fireEvent.keyDown(card, { key: 'Enter' });
  expect(onClick).toHaveBeenCalledTimes(2);
});

it('does not fire onClick when a nested button is pressed', () => {
  const onClick = vi.fn();
  const onAdd = vi.fn();
  render(<Card title="Task Chair" onClick={onClick} footer={<button onClick={onAdd}>Add to cart</button>} />);
  fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onClick).not.toHaveBeenCalled();
});
