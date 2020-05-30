import { BLOCK_TABLE_ROW } from '../../../types';
import { getEmptyTableCell } from './get-empty-table-cell';

export const getEmptyTableRow = (count: number) => ({
  type: BLOCK_TABLE_ROW,
  children: Array(count)
    .fill('')
    .map(() => getEmptyTableCell()),
});
