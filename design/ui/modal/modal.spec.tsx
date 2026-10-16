import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal.js';

const title = 'Remove Standing Desk from cart?';

it('renders nothing when closed', () => {
  render(
    <Modal open={false} onClose={() => {}} title={title}>
      Body
    </Modal>
  );
  expect(screen.queryByRole('dialog')).toBeNull();
});

it('renders an accessible modal dialog with its content and footer', () => {
  render(
    <Modal open onClose={() => {}} title={title} footer={<button>Remove</button>}>
      You can add it back any time.
    </Modal>
  );
  const dialog = screen.getByRole('dialog', { name: title });
  expect(dialog.getAttribute('aria-modal')).toBe('true');
  expect(dialog.textContent).toContain('You can add it back any time.');
  expect(screen.getByRole('button', { name: 'Remove' })).toBeTruthy();
});

it('closes on Escape', () => {
  const onClose = vi.fn();
  render(<Modal open onClose={onClose} title={title} />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('closes on an overlay click but not on a click inside the dialog', () => {
  const onClose = vi.fn();
  render(
    <Modal open onClose={onClose} title={title}>
      <p>Inside</p>
    </Modal>
  );
  fireEvent.click(screen.getByText('Inside'));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.click(screen.getByTestId('modal-overlay'));
  expect(onClose).toHaveBeenCalledTimes(1);
});
