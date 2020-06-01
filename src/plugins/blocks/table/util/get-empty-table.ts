import {BLOCK_TABLE, BLOCK_TABLE_PRE, BLOCK_TABLE_SUF, BLOCK_TABLE_WRAP} from '@/core/types';
import { getEmptyTableRow } from './get-empty-table-row';

export const getEmptyTable = (row: number, col: number) => ({
  type: BLOCK_TABLE_WRAP,
  children: [
    {
      type: BLOCK_TABLE_PRE,
      children: [{text: ''}]
    },
    {
      type: BLOCK_TABLE,
      row,
      col,
      children: Array(row)
        .fill('')
        .map(() => getEmptyTableRow(col)),
    },
    {
      type: BLOCK_TABLE_SUF,
      children: [{text: ''}]
    }
  ]
});
