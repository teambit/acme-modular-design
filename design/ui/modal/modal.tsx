import { useEffect, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import styles from './modal.module.css';

export type ModalProps = {
  /** whether the modal is shown. nothing is rendered when false. */
  open: boolean;
  /** called on Escape, on an overlay click and on the close button. */
  onClose: () => void;
  /** the heading, also used as the dialog's accessible name. */
  title: string;
  /** the modal body. */
  children?: ReactNode;
  /** actions, e.g. Cancel and Confirm buttons. */
  footer?: ReactNode;
};

/**
 * A modal dialog rendered over an overlay. It renders nothing when closed, closes
 * on Escape and on an overlay click, moves focus into the dialog on open and
 * returns it to the previously focused element on close.
 */
export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // keep the latest onClose without re-subscribing listeners on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);

    // stop the page behind the overlay from scrolling.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    // only clicks on the overlay itself close; clicks inside the dialog bubble up here too.
    if (event.target === event.currentTarget) onClose();
  };

  // rendered in place (fixed-positioned) rather than portalled, so it inherits the
  // theme's CSS variables, which AcmeTheme scopes to its own element.
  return (
    <div className={styles.overlay} onClick={onOverlayClick} data-testid="modal-overlay">
      <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        {children && <div className={styles.body}>{children}</div>}
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}
