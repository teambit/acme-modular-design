import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Table } from './table.js';
import type { TableColumn } from './table-column-type.js';
import styles from './table.module.css';

type Person = { id: string; name: string; age: number };

const people: Person[] = [
  { id: `a`, name: `Ada`, age: 36 },
  { id: `b`, name: `Linus`, age: 54 },
];

const columns: TableColumn<Person>[] = [
  { key: `name`, header: `Name` },
  { key: `age`, header: `Age`, align: `right`, render: (row) => `${row.age} yrs` },
];

it(`renders a header cell per column`, () => {
  const { container } = render(<Table columns={columns} rows={people} rowKey={(row) => row.id} />);
  expect(container.querySelectorAll(`.${styles.headCell}`).length).toBe(2);
});

it(`renders a row per item`, () => {
  const { container } = render(<Table columns={columns} rows={people} rowKey={(row) => row.id} />);
  expect(container.querySelectorAll(`tbody .${styles.row}`).length).toBe(2);
});

it(`uses render when provided and the raw value otherwise`, () => {
  const { container } = render(<Table columns={columns} rows={people} rowKey={(row) => row.id} />);
  const cells = container.querySelectorAll(`.${styles.cell}`);
  expect(cells[0].textContent).toBe(`Ada`);
  expect(cells[1].textContent).toBe(`36 yrs`);
});

it(`labels each cell with its header for the stacked layout`, () => {
  const { container } = render(<Table columns={columns} rows={people} rowKey={(row) => row.id} />);
  expect(container.querySelectorAll(`.${styles.cell}`)[1].getAttribute(`data-label`)).toBe(`Age`);
});

it(`applies the alignment class`, () => {
  const { container } = render(<Table columns={columns} rows={people} rowKey={(row) => row.id} />);
  expect(container.querySelectorAll(`.${styles.cell}`)[1].classList.contains(styles.right)).toBe(true);
});

it(`shows the empty message when there are no rows`, () => {
  const { container } = render(
    <Table columns={columns} rows={[]} rowKey={(row: Person) => row.id} emptyMessage="No people" />
  );
  expect(container.querySelector(`.${styles.empty}`)?.textContent).toBe(`No people`);
});

it(`calls onRowClick with the row`, () => {
  const onRowClick = vi.fn();
  const { container } = render(
    <Table columns={columns} rows={people} rowKey={(row) => row.id} onRowClick={(row) => onRowClick(row)} />
  );
  fireEvent.click(container.querySelectorAll(`tbody .${styles.row}`)[1]);
  expect(onRowClick).toHaveBeenCalledWith(people[1]);
});

it(`activates a clickable row with the Enter key`, () => {
  const onRowClick = vi.fn();
  const { container } = render(
    <Table columns={columns} rows={people} rowKey={(row) => row.id} onRowClick={(row) => onRowClick(row)} />
  );
  fireEvent.keyDown(container.querySelectorAll(`tbody .${styles.row}`)[0], { key: `Enter` });
  expect(onRowClick).toHaveBeenCalledWith(people[0]);
});

it(`merges a custom className`, () => {
  const { container } = render(
    <Table columns={columns} rows={people} rowKey={(row) => row.id} className="custom" />
  );
  expect(container.querySelector(`.${styles.wrapper}`)?.classList.contains(`custom`)).toBe(true);
});
