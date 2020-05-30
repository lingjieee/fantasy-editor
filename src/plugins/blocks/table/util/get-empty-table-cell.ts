import { BLOCK_PARAGRAPH, BLOCK_TABLE_CELL } from '../../../types';

export const getEmptyTableCell = () => ({
  type: BLOCK_TABLE_CELL,
  children: [
    {
      type: BLOCK_PARAGRAPH,
      children: [{ text: '' }],
    },
  ],
});
