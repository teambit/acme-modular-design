import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './card.module.css';

export type CardProps = {
  /** heading shown above the body, e.g. a product name. */
  title?: ReactNode;
  /** full-bleed media on top of the card, such as a product image. */
  media?: ReactNode;
  /** actions or meta shown at the bottom, e.g. a price and an "Add to cart" button. */
  footer?: ReactNode;
  /** the card body. */
  children?: ReactNode;
  className?: string;
  /** makes the whole card clickable and keyboard-focusable. */
  onClick?: () => void;
};

// clicks on nested controls (e.g. an "Add to cart" button) must not also trigger the card's own action.
const INTERACTIVE = 'button, a, input, select, textarea, label, [role="button"]';

function fromNestedControl(target: EventTarget, card: HTMLElement) {
  const control = target instanceof Element ? target.closest(INTERACTIVE) : null;
  return control !== null && control !== card && card.contains(control);
}

/**
 * A surface that groups related content, such as a product, an order or an address.
 * Pass `onClick` to make the whole card act as a link-like target; nested buttons keep their own behavior.
 */
export function Card({ title, media, footer, children, className, onClick }: CardProps) {
  const clickable = Boolean(onClick);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!onClick || fromNestedControl(event.target, event.currentTarget)) return;
    onClick();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    // only react when the card itself has focus, not a control inside it.
    if (!onClick || event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={classNames(styles.card, clickable && styles.clickable, className)}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {media && <div className={styles.media}>{media}</div>}
      {(title || children) && (
        <div className={styles.body}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {children}
        </div>
      )}
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
