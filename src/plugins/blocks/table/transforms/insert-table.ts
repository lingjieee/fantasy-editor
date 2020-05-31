import { Editor, Transforms } from 'slate';
import { isBlockActive } from '@/common/transforms';
import {BLOCK_TABLE_WRAP} from '../../../types';
import { getEmptyTable } from '../util/get-empty-table';

export const insertTable = (editor: Editor, row: number, col: number) => {
  if (!isBlockActive(editor, BLOCK_TABLE_WRAP)) {
    Transforms.insertNodes(editor, getEmptyTable(row, col));
    let match = Editor.above(editor, {
      match: n => n.type=== BLOCK_TABLE_WRAP
    });
    if(match){
      const [,path] = match;
      Transforms.select(editor, path.concat([1,0,0]));
    }
  }
};
