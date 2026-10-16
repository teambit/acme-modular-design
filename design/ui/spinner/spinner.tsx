import classNames from 'classnames';
import styles from './spinner.module.css';

export type SpinnerProps = {
  /** what is loading, announced to screen readers. defaults to "Loading". */
  label?: string;
  size?: 'small' | 'medium';
  className?: string;
};

/**
 * An indeterminate loading indicator. Renders `role="status"` so assistive
 * technology announces the label politely.
 */
export function Spinner({ label = 'Loading', size = 'medium', className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={classNames(styles.spinner, styles[size], className)}>
      <span className={styles.circle} aria-hidden="true" />
      {/* visually hidden so the label is still in the text for tests and older readers. */}
      <span className={styles.visuallyHidden}>{label}</span>
    </span>
  );
}
