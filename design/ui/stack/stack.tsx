import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './stack.module.css';

export type StackGap = 'small' | 'medium' | 'large' | 'xl';

export type StackProps = {
  /** main axis. defaults to `column`. */
  direction?: 'row' | 'column';
  /** space between children, mapped to the theme spacing scale. defaults to `medium`. */
  gap?: StackGap;
  /** CSS `align-items`. */
  align?: CSSProperties['alignItems'];
  /** CSS `justify-content`. */
  justify?: CSSProperties['justifyContent'];
  /** let children wrap onto new lines. */
  wrap?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Lays children out in a row or a column with consistent spacing from the theme.
 * Use it instead of ad-hoc margins so every scope spaces things the same way.
 */
export function Stack({ direction = 'column', gap = 'medium', align, justify, wrap, children, className }: StackProps) {
  return (
    <div
      className={classNames(styles.stack, styles[direction], styles[gap], wrap && styles.wrap, className)}
      style={{ alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}
