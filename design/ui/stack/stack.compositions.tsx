import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Button } from '@acme-modular/design.ui.button';
import { PriceTag } from '@acme-modular/design.ui.price-tag';
import { mockProducts } from '@acme-modular/platform.entities.product';
import { Stack } from './stack.js';

export const CartLines = () => (
  <AcmeTheme>
    <Stack gap="medium" className="cart-lines">
      {mockProducts()
        .slice(0, 3)
        .map((product) => (
          <Stack key={product.id} direction="row" justify="space-between" align="center">
            <span>{product.name}</span>
            <PriceTag cents={product.price.amountCents} />
          </Stack>
        ))}
    </Stack>
  </AcmeTheme>
);

export const CheckoutActions = () => (
  <AcmeTheme>
    <Stack direction="row" gap="small" justify="flex-end">
      <Button variant="ghost">Back to cart</Button>
      <Button>Place order</Button>
    </Stack>
  </AcmeTheme>
);

export const WrappingCategories = () => (
  <AcmeTheme>
    <div style={{ maxWidth: 260 }}>
      <Stack direction="row" gap="small" wrap>
        {['Desks', 'Chairs', 'Lighting', 'Storage', 'Electronics', 'Accessories'].map((category) => (
          <Button key={category} variant="secondary">
            {category}
          </Button>
        ))}
      </Stack>
    </div>
  </AcmeTheme>
);
