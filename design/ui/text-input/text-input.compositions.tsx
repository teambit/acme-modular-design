import { useState } from 'react';
import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { mockCustomer } from '@acme-modular/platform.entities.customer';
import { TextInput } from './text-input.js';

export const ShippingAddressFields = () => {
  const office = mockCustomer().defaultAddress;
  const [name, setName] = useState(office?.name ?? '');
  const [line1, setLine1] = useState(office?.line1 ?? '');
  const [city, setCity] = useState(office?.city ?? '');
  const [postalCode, setPostalCode] = useState(office?.postalCode ?? '');
  return (
    <AcmeTheme>
      <form style={{ display: 'grid', gap: 16, maxWidth: 360 }} onSubmit={(event) => event.preventDefault()}>
        <TextInput label="Full name" value={name} onChange={setName} name="name" autoComplete="name" required />
        <TextInput label="Street address" value={line1} onChange={setLine1} name="line1" autoComplete="address-line1" required />
        <TextInput label="City" value={city} onChange={setCity} name="city" autoComplete="address-level2" required />
        <TextInput
          label="ZIP code"
          value={postalCode}
          onChange={setPostalCode}
          name="postalCode"
          autoComplete="postal-code"
          inputMode="numeric"
          required
        />
      </form>
    </AcmeTheme>
  );
};

export const PostalCodeWithError = () => {
  const [postalCode, setPostalCode] = useState('787');
  const error = /^\d{5}$/.test(postalCode) ? undefined : 'Enter a 5-digit ZIP code.';
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 360 }}>
        <TextInput
          label="ZIP code"
          value={postalCode}
          onChange={setPostalCode}
          inputMode="numeric"
          autoComplete="postal-code"
          error={error}
          required
        />
      </div>
    </AcmeTheme>
  );
};

export const EmailInput = () => {
  const [email, setEmail] = useState('');
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 360 }}>
        <TextInput
          label="Email for order updates"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={mockCustomer().email}
          autoComplete="email"
        />
      </div>
    </AcmeTheme>
  );
};
