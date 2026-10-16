import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Button } from './button.js';

export const PrimaryButton = () => (
  <AcmeTheme>
    <Button onClick={() => alert('Added to cart')}>Add to cart</Button>
  </AcmeTheme>
);

export const ButtonVariants = () => (
  <AcmeTheme>
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="primary">Checkout</Button>
      <Button variant="secondary">Save for later</Button>
      <Button variant="ghost">Remove</Button>
    </div>
  </AcmeTheme>
);

export const DisabledButton = () => (
  <AcmeTheme>
    <Button disabled>Out of stock</Button>
  </AcmeTheme>
);
