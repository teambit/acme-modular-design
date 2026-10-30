import React, { useState } from 'react';
import { AcmeTheme } from '@acme-modular/design.theme.acme-theme';
import { Table } from './table.js';
import type { TableColumn } from './table-column-type.js';

type Order = {
  id: string;
  customer: string;
  status: string;
  items: number;
  totalCents: number;
};

const orders: Order[] = [
  { id: `ORD-1042`, customer: `Maya Levi`, status: `Delivered`, items: 3, totalCents: 12850 },
  { id: `ORD-1043`, customer: `Daniel Cohen`, status: `Processing`, items: 1, totalCents: 4990 },
  { id: `ORD-1044`, customer: `Noa Barak`, status: `Shipped`, items: 5, totalCents: 23400 },
  { id: `ORD-1045`, customer: `Omar Haddad`, status: `Cancelled`, items: 2, totalCents: 7600 },
];

const formatCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const columns: TableColumn<Order>[] = [
  { key: `id`, header: `Order` },
  { key: `customer`, header: `Customer` },
  { key: `status`, header: `Status` },
  { key: `items`, header: `Items`, align: `center` },
  { key: `total`, header: `Total`, align: `right`, render: (row) => formatCents(row.totalCents) },
];

export const OrdersTable = () => (
  <AcmeTheme>
    <Table columns={columns} rows={orders} rowKey={(row) => row.id} />
  </AcmeTheme>
);

export const ClickableRows = () => {
  const [selected, setSelected] = useState<string>(`None yet`);
  return (
    <AcmeTheme>
      <Table
        columns={columns}
        rows={orders}
        rowKey={(row) => row.id}
        onRowClick={(row) => setSelected(row.id)}
      />
      <p>Selected order: {selected}</p>
    </AcmeTheme>
  );
};

export const EmptyTable = () => (
  <AcmeTheme>
    <Table
      columns={columns}
      rows={[]}
      rowKey={(row: Order) => row.id}
      emptyMessage="No orders match your filters."
    />
  </AcmeTheme>
);
