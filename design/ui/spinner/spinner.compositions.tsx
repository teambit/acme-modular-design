import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Button } from '@acme-modular/design.ui.button';
import { Spinner } from './spinner.js';

export const LoadingProducts = () => (
  <AcmeTheme>
    <div style={{ display: 'grid', placeItems: 'center', gap: 8, padding: 32 }}>
      <Spinner label="Loading products" />
      <span>Loading products…</span>
    </div>
  </AcmeTheme>
);

export const SmallSpinnerInButton = () => (
  <AcmeTheme>
    <Button disabled>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Spinner size="small" label="Placing order" />
        Placing order
      </span>
    </Button>
  </AcmeTheme>
);

export const Sizes = () => (
  <AcmeTheme>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
    </div>
  </AcmeTheme>
);
