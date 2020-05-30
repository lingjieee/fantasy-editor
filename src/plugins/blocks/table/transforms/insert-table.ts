import { Editor, Transforms } from 'slate';
import { isBlockActive } from '../../../../common/transforms';
import { BLOCK_TABLE } from '../../../types';
import { getEmptyTable } from '../util/get-empty-table';

export const insertTable = (editor: Editor, row: number, col: number) => {
  if (!isBlockActive(editor, BLOCK_TABLE)) {
    Transforms.insertNodes(editor, getEmptyTable(row, col));
  }
};
