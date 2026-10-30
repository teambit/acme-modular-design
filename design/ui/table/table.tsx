import React from 'react';
import classNames from 'classnames';
import type { TableColumn } from './table-column-type.js';
import styles from './table.module.css';

export type TableProps<T> = {
  /**
   * the columns to display.
   */
  columns: TableColumn<T>[];

  /**
   * the rows to display.
   */
  rows: T[];

  /**
   * returns a stable unique key for a row.
   */
  rowKey: (row: T) => string;

  /**
   * message shown when there are no rows.
   */
  emptyMessage?: string;

  /**
   * called with the row when a row is clicked or activated with the keyboard.
   */
  onRowClick?: (row: T) => void;

  /**
   * class name for the table.
   */
  className?: string;

  /**
   * inline style for the table.
   */
  style?: React.CSSProperties;
};

function readValue<T>(row: T, key: string): React.ReactNode {
  const value = (row as Record<string, unknown>)[key];
  if (value === null || value === undefined) return ``;
  if (typeof value === `string` || typeof value === `number`) return value;
  return String(value);
}

/**
 * A responsive data table. Renders a semantic table on tablet and desktop,
 * and stacks each row into a card under 768px.
 */
export function Table<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = `Nothing to show yet.`,
  onRowClick,
  className,
  style,
}: TableProps<T>) {
  const clickable = Boolean(onRowClick);

  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      <table className={styles.table} role="table">
        <thead className={styles.head} role="rowgroup">
          <tr className={styles.headRow} role="row">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                role="columnheader"
                className={classNames(styles.headCell, styles[column.align ?? `left`])}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body} role="rowgroup">
          {rows.length === 0 && (
            <tr className={styles.emptyRow} role="row">
              <td className={styles.empty} colSpan={Math.max(columns.length, 1)} role="cell">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              role="row"
              className={classNames(styles.row, clickable && styles.clickable)}
              tabIndex={clickable ? 0 : undefined}
              onClick={() => onRowClick?.(row)}
              onKeyDown={(event) => {
                if (!clickable) return;
                if (event.key === `Enter` || event.key === ` `) {
                  event.preventDefault();
                  onRowClick?.(row);
                }
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  role="cell"
                  data-label={column.header}
                  className={classNames(styles.cell, styles[column.align ?? `left`])}
                >
                  <span className={styles.value}>
                    {column.render ? column.render(row) : readValue(row, column.key)}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
