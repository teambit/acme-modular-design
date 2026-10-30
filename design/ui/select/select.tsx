import React, { useId } from 'react';
import classNames from 'classnames';
import { ChevronIcon } from './chevron-icon.js';
import type { SelectOption } from './select-option-type.js';
import styles from './select.module.css';

export type SelectProps = {
  /** visible label, bound to the select. */
  label: string;
  /** the available options. */
  options: SelectOption[];
  /** the selected option value. an empty string shows the placeholder. */
  value: string;
  /** called with the chosen option value, not the event. */
  onChange: (value: string) => void;
  /** unselectable first option shown while `value` is empty. */
  placeholder?: string;
  /** validation message shown under the select. marks the select invalid. */
  error?: string;
  /** disables the select. */
  disabled?: boolean;
  /** select id. generated when omitted. */
  id?: string;
  /** class name for the field wrapper. */
  className?: string;
  /** inline style for the field wrapper. */
  style?: React.CSSProperties;
};

/**
 * A labelled native select. The label is always bound to the select, and an `error`
 * is rendered under it with `role="alert"` and linked via `aria-describedby`.
 */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  id,
  className,
  style,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className={classNames(styles.field, className)} style={style}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        <select
          id={selectId}
          className={classNames(styles.select, error && styles.invalid, !value && styles.empty)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronIcon className={styles.chevron} />
      </div>
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
