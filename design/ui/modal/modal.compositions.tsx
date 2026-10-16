import { useState } from 'react';
import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Button } from '@acme-modular/design.ui.button';
import { PriceTag } from '@acme-modular/design.ui.price-tag';
import { mockProducts } from '@acme-modular/platform.entities.product';
import { Modal } from './modal.js';

const [standingDesk, , taskChair] = mockProducts();

export const RemoveFromCartConfirmation = () => {
  const [open, setOpen] = useState(true);
  return (
    <AcmeTheme>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Remove
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Remove ${standingDesk.name} from cart?`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep it
            </Button>
            <Button onClick={() => setOpen(false)}>Remove</Button>
          </>
        }
      >
        <p>
          You'll lose the bulk discount if your cart drops below 10 items. You can add the {standingDesk.name} back at
          any time.
        </p>
      </Modal>
    </AcmeTheme>
  );
};

export const ProductQuickView = () => {
  const [open, setOpen] = useState(false);
  return (
    <AcmeTheme>
      <Button onClick={() => setOpen(true)}>Quick view</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={taskChair.name}
        footer={<Button onClick={() => setOpen(false)}>Add to cart</Button>}
      >
        <p>{taskChair.description}</p>
        <PriceTag cents={taskChair.price.amountCents} size="large" />
      </Modal>
    </AcmeTheme>
  );
};

export const NoFooter = () => {
  const [open, setOpen] = useState(false);
  return (
    <AcmeTheme>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Shipping policy
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Shipping policy">
        <p>Orders over $500 ship free within the continental US. Furniture ships in 2 to 5 business days.</p>
      </Modal>
    </AcmeTheme>
  );
};
