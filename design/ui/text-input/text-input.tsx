import { useId } from 'react';
import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './text-input.module.css';

export type TextInputProps = {
  /** visible label, bound to the input. */
  label: string;
  value: string;
  /** called with the new string value, not the event. */
  onChange: (value: string) => void;
  /** input type, e.g. `email`, `tel` or `password`. defaults to `text`. */
  type?: string;
  placeholder?: string;
  /** validation message shown under the input. marks the input invalid. */
  error?: string;
  /** input id. generated when omitted. */
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  /** virtual keyboard hint, e.g. `numeric` for a postal code. */
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  className?: string;
};

/**
 * A labelled text field. The label is always bound to the input, and an `error`
 * is rendered under it with `role="alert"` and linked via `aria-describedby`.
 */
export function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  id,
  name,
  autoComplete,
  required,
  inputMode,
  className,
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={classNames(styles.field, className)}>
      {/* the required marker comes from CSS so the label's text stays exactly `label`. */}
      <label htmlFor={inputId} className={classNames(styles.label, required && styles.required)}>
        {label}
      </label>
      <input
        id={inputId}
        className={classNames(styles.input, error && styles.invalid)}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        required={required}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
