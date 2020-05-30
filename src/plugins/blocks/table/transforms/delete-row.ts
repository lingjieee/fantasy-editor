import { Editor, Transforms } from 'slate';
import { BLOCK_TABLE_ROW } from '../../../types';

export const deleteRow = (editor: Editor) => {
  let currentRow = Editor.above(editor, {
    match: n => n.type === BLOCK_TABLE_ROW,
  });
  if (currentRow) {
    const [, rowPath] = currentRow;
    let [tableNode, tablePath] = Editor.parent(editor, rowPath);
    const row: number = tableNode.row as number;
    if (row === 1) {
      Transforms.removeNodes(editor, {
        at: tablePath,
      });
    } else {
      Transforms.removeNodes(editor, {
        at: rowPath,
      });
      Transforms.setNodes(
        editor,
        {
          row: row - 1,
        },
        {
          at: tablePath,
        },
      );
    }
  }
};
