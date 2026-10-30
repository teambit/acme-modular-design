import React from 'react';
import { vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Select } from './select.js';
import styles from './select.module.css';

const OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'express', label: 'Express' },
  { value: 'pickup', label: 'Pickup', disabled: true },
];

it('binds the label to the select', () => {
  const { container } = render(<Select label="Shipping" options={OPTIONS} value="express" onChange={() => {}} />);
  const select = container.querySelector('select') as HTMLSelectElement;
  const label = container.querySelector('label') as HTMLLabelElement;
  expect(label.htmlFor).toBe(select.id);
  expect(select.value).toBe('express');
});

it('uses the provided id', () => {
  const { container } = render(<Select label="Shipping" options={OPTIONS} value="" id="ship" onChange={() => {}} />);
  expect((container.querySelector('select') as HTMLSelectElement).id).toBe('ship');
});

it('calls onChange with the chosen value', () => {
  const onChange = vi.fn();
  const { container } = render(<Select label="Shipping" options={OPTIONS} value="standard" onChange={onChange} />);
  fireEvent.change(container.querySelector('select') as HTMLSelectElement, { target: { value: 'express' } });
  expect(onChange).toHaveBeenCalledWith('express');
});

it('renders a disabled placeholder option plus all options', () => {
  const { container } = render(
    <Select label="Shipping" options={OPTIONS} value="" onChange={() => {}} placeholder="Choose one" />
  );
  const options = container.querySelectorAll('option');
  expect(options.length).toBe(4);
  expect(options[0].textContent).toBe('Choose one');
  expect(options[0].disabled).toBe(true);
  expect(options[3].disabled).toBe(true);
});

it('shows an error as an alert and marks the select invalid', () => {
  const { container } = render(
    <Select label="Shipping" options={OPTIONS} value="" onChange={() => {}} error="Pick a method." />
  );
  const alert = container.querySelector(`.${styles.error}`) as HTMLElement;
  const select = container.querySelector('select') as HTMLSelectElement;
  expect(alert.textContent).toBe('Pick a method.');
  expect(alert.getAttribute('role')).toBe('alert');
  expect(select.getAttribute('aria-invalid')).toBe('true');
  expect(select.getAttribute('aria-describedby')).toBe(alert.id);
});

it('renders no error without one', () => {
  const { container } = render(<Select label="Shipping" options={OPTIONS} value="standard" onChange={() => {}} />);
  expect(container.querySelector(`.${styles.error}`)).toBeNull();
  expect(container.querySelector('select')?.getAttribute('aria-invalid')).toBeNull();
});

it('disables the select', () => {
  const { container } = render(<Select label="Shipping" options={OPTIONS} value="standard" onChange={() => {}} disabled />);
  expect((container.querySelector('select') as HTMLSelectElement).disabled).toBe(true);
});
