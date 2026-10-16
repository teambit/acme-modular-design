import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Button } from '@acme-modular/design.ui.button';
import { PriceTag } from '@acme-modular/design.ui.price-tag';
import { mockProducts } from '@acme-modular/platform.entities.product';
import { mockCustomer } from '@acme-modular/platform.entities.customer';
import { Card } from './card.js';

const [standingDesk] = mockProducts();

const productImage = (
  <div style={{ height: 140, display: 'grid', placeItems: 'center', color: '#666' }} aria-hidden>
    160 x 80 cm
  </div>
);

export const ProductCard = () => (
  <AcmeTheme>
    <div style={{ maxWidth: 280 }}>
      <Card
        media={productImage}
        title={standingDesk.name}
        footer={
          <>
            <PriceTag cents={standingDesk.price.amountCents} />
            <Button onClick={() => alert(`Added ${standingDesk.name} to cart`)}>Add to cart</Button>
          </>
        }
      >
        <p style={{ margin: 0 }}>{standingDesk.description}</p>
      </Card>
    </div>
  </AcmeTheme>
);

export const ClickableProductCard = () => {
  const desk = mockProducts()[1];
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 280 }}>
        <Card title={desk.name} onClick={() => alert(`Open /products/${desk.slug}`)} footer={<PriceTag cents={desk.price.amountCents} />}>
          <p style={{ margin: 0 }}>{desk.description}</p>
          <small>Only {desk.stock} left in stock</small>
        </Card>
      </div>
    </AcmeTheme>
  );
};

export const AddressCard = () => {
  const address = mockCustomer().defaultAddress;
  if (!address) return null;
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 320 }}>
        <Card title={`${address.label} address`} footer={<Button variant="ghost">Edit</Button>}>
          <address style={{ fontStyle: 'normal' }}>
            {address.name}
            <br />
            {address.line1}
            {address.line2 && `, ${address.line2}`}
            <br />
            {address.city}, {address.region} {address.postalCode}
          </address>
        </Card>
      </div>
    </AcmeTheme>
  );
};
