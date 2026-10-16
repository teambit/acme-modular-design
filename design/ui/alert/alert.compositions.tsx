import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { mockProducts } from '@acme-modular/platform.entities.product';
import { Alert } from './alert.js';

export const BulkDiscountHint = () => (
  <AcmeTheme>
    <Alert tone="info" title="Almost there">
      Add 3 more items for 10% off your order.
    </Alert>
  </AcmeTheme>
);

export const OrderStatuses = () => {
  const corner = mockProducts()[1];
  return (
    <AcmeTheme>
      <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <Alert tone="positive" title="Order placed">
          We emailed your receipt. Your Standing Desk ships within 2 business days.
        </Alert>
        <Alert tone="warning" title="Low stock">
          Only {corner.stock} {corner.name} units left. Check out soon to reserve yours.
        </Alert>
        <Alert tone="negative" title="Payment declined">
          Your card was declined. Try another card or contact your bank.
        </Alert>
      </div>
    </AcmeTheme>
  );
};

export const MessageOnly = () => (
  <AcmeTheme>
    <Alert>Free shipping on orders over $500 within the continental US.</Alert>
  </AcmeTheme>
);
