import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './alert.module.css';

export type AlertTone = 'info' | 'positive' | 'warning' | 'negative';

export type AlertProps = {
  /** semantic tone. defaults to `info`. */
  tone?: AlertTone;
  /** optional bold heading above the message. */
  title?: string;
  /** the message. */
  children?: ReactNode;
  className?: string;
};

/**
 * An inline message banner. `negative` and `warning` render `role="alert"` so they
 * interrupt screen readers; `info` and `positive` use the polite `role="status"`.
 */
export function Alert({ tone = 'info', title, children, className }: AlertProps) {
  const urgent = tone === 'negative' || tone === 'warning';
  return (
    <div role={urgent ? 'alert' : 'status'} className={classNames(styles.alert, styles[tone], className)} data-tone={tone}>
      {title && <p className={styles.title}>{title}</p>}
      {children && <div className={styles.message}>{children}</div>}
    </div>
  );
}
