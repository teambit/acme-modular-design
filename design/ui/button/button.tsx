import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = {
  /** the button label or content. */
  children?: ReactNode;
  /** visual weight. `primary` is the single main action of a view. */
  variant?: ButtonVariant;
  /** stretch to the width of the container. */
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The ACME button. Use one `primary` button per view for the main action,
 * `secondary` for alternatives and `ghost` for low-emphasis actions.
 */
export function Button({ children, variant = 'primary', fullWidth, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
