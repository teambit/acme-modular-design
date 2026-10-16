import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './badge.module.css';

export type BadgeTone = 'neutral' | 'positive' | 'negative' | 'warning' | 'info';

export type BadgeProps = {
  /** semantic color. `positive` for "In stock", `negative` for "Out of stock", and so on. */
  tone?: BadgeTone;
  /** the badge label. keep it to a word or two. */
  children: ReactNode;
  className?: string;
};

/**
 * A small status label, such as a stock level, an order status or a "Bestseller" tag.
 * The tone is backed by text, never by color alone.
 */
export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={classNames(styles.badge, styles[tone], className)} data-tone={tone}>
      {children}
    </span>
  );
}
