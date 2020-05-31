import { Editor, Path, Transforms } from 'slate';
import { BLOCK_TABLE_ROW } from '../../../types';
import { getEmptyTableRow } from '../util/get-empty-table-row';

export const insertRow = (editor: Editor, position: 'top' | 'bottom') => {
  const currentRow = Editor.above(editor, {
    match: n => n.type === BLOCK_TABLE_ROW,
  });
  if (currentRow) {
    const [, rowPath] = currentRow;
    const [tableNode, tablePath] = Editor.parent(editor, rowPath);
    const col = tableNode.col as number;
    Transforms.insertNodes(editor, getEmptyTableRow(col), {
      at: position === 'top' ? rowPath : Path.next(rowPath),
      select: true,
    });
    const row = (tableNode.row as number) + 1;
    Transforms.setNodes(
      editor,
      {
        row,
      },
      {
        at: tablePath,
      },
    );
  }
};
