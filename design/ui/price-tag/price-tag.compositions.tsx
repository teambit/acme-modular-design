import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { PriceTag } from './price-tag.js';

export const BasicPrice = () => (
  <AcmeTheme>
    <PriceTag cents={4900} />
  </AcmeTheme>
);

export const DiscountedPrice = () => (
  <AcmeTheme>
    <PriceTag cents={35910} compareAtCents={39900} size="large" />
  </AcmeTheme>
);

export const EuroPrice = () => (
  <AcmeTheme>
    <PriceTag cents={12900} currency="EUR" size="small" />
  </AcmeTheme>
);
