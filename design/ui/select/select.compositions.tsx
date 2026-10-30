import React, { useState } from 'react';
import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Select } from './select.js';

const SHIPPING_OPTIONS = [
  { value: 'standard', label: 'Standard (3-5 business days)' },
  { value: 'express', label: 'Express (1-2 business days)' },
  { value: 'overnight', label: 'Overnight' },
  { value: 'pickup', label: 'In-store pickup', disabled: true },
];

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
];

export const ShippingMethod = () => {
  const [method, setMethod] = useState('standard');
  return (
    <AcmeTheme>
      <div className="wrapper" style={{ maxWidth: 360, padding: 16 }}>
        <Select label="Shipping method" options={SHIPPING_OPTIONS} value={method} onChange={setMethod} />
      </div>
    </AcmeTheme>
  );
};

export const WithPlaceholderAndError = () => {
  const [country, setCountry] = useState('');
  const error = country ? undefined : 'Select a country to continue.';
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Select
          label="Country"
          options={COUNTRY_OPTIONS}
          value={country}
          onChange={setCountry}
          placeholder="Choose a country"
          error={error}
        />
      </div>
    </AcmeTheme>
  );
};

export const Disabled = () => {
  return (
    <AcmeTheme>
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Select label="Country" options={COUNTRY_OPTIONS} value="us" onChange={() => {}} disabled />
      </div>
    </AcmeTheme>
  );
};
