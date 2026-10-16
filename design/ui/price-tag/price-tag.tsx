import classNames from 'classnames';
import { formatPrice } from '@acme-modular/platform.utils.format-price';
import styles from './price-tag.module.css';

export type PriceTagProps = {
  /** the price in minor units (cents). */
  cents: number;
  /** ISO 4217 currency code. defaults to USD. */
  currency?: string;
  /** the price before a discount, shown struck through. */
  compareAtCents?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

/**
 * Renders a price from integer cents, with an optional struck-through
 * compare-at price for discounts.
 */
export function PriceTag({ cents, currency = 'USD', compareAtCents, size = 'medium', className }: PriceTagProps) {
  const discounted = compareAtCents !== undefined && compareAtCents > cents;
  return (
    <span className={classNames(styles.priceTag, styles[size], className)}>
      <span className={classNames(styles.price, discounted && styles.sale)}>{formatPrice(cents, { currency })}</span>
      {discounted && <s className={styles.compareAt}>{formatPrice(compareAtCents, { currency })}</s>}
    </span>
  );
}
