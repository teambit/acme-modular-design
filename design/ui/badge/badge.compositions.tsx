import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { mockProducts } from '@acme-modular/platform.entities.product';
import { Badge } from './badge.js';

export const StockBadges = () => (
  <AcmeTheme>
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
      {mockProducts()
        .slice(0, 4)
        .map((product) => (
          <li key={product.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {product.name}
            {product.inStock ? (
              <Badge tone={product.stock < 5 ? 'warning' : 'positive'}>
                {product.stock < 5 ? `Only ${product.stock} left` : 'In stock'}
              </Badge>
            ) : (
              <Badge tone="negative">Out of stock</Badge>
            )}
          </li>
        ))}
    </ul>
  </AcmeTheme>
);

export const OrderStatusBadges = () => (
  <AcmeTheme>
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge tone="info">Processing</Badge>
      <Badge tone="positive">Delivered</Badge>
      <Badge tone="negative">Cancelled</Badge>
    </div>
  </AcmeTheme>
);

export const TagBadge = () => (
  <AcmeTheme>
    <Badge>Bestseller</Badge>
  </AcmeTheme>
);
