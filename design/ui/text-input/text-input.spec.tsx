import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './text-input.js';

it('binds the label to the input', () => {
  render(<TextInput label="City" value="Austin" onChange={() => {}} />);
  const input = screen.getByLabelText('City') as HTMLInputElement;
  expect(input.value).toBe('Austin');
});

it('calls onChange with the new string value', () => {
  const onChange = vi.fn();
  render(<TextInput label="Street address" value="" onChange={onChange} />);
  fireEvent.change(screen.getByLabelText('Street address'), { target: { value: '500 Congress Ave' } });
  expect(onChange).toHaveBeenCalledWith('500 Congress Ave');
});

it('shows an error as an alert and marks the input invalid', () => {
  render(<TextInput label="ZIP code" value="787" onChange={() => {}} error="Enter a 5-digit ZIP code." />);
  const alert = screen.getByRole('alert');
  const input = screen.getByLabelText('ZIP code');
  expect(alert.textContent).toBe('Enter a 5-digit ZIP code.');
  expect(input.getAttribute('aria-invalid')).toBe('true');
  expect(input.getAttribute('aria-describedby')).toBe(alert.id);
});

it('renders no alert without an error', () => {
  render(<TextInput label="Email" type="email" value="" onChange={() => {}} id="email" />);
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByLabelText('Email').id).toBe('email');
});
