import type { ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';

export type TableColumn<T> = {
  /**
   * unique key of the column. Used to read the value from the row when no `render` is given.
   */
  key: string;

  /**
   * header label of the column.
   */
  header: string;

  /**
   * custom cell renderer.
   */
  render?: (row: T) => ReactNode;

  /**
   * horizontal alignment of the cell content on tablet and desktop.
   */
  align?: TableAlign;
};
