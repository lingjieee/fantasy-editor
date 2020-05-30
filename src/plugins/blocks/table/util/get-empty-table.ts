import { BLOCK_TABLE } from '../../../types';
import { getEmptyTableRow } from './get-empty-table-row';

export const getEmptyTable = (row: number, col: number) => ({
  type: BLOCK_TABLE,
  row,
  col,
  children: Array(row)
    .fill('')
    .map(() => getEmptyTableRow(col)),
});
