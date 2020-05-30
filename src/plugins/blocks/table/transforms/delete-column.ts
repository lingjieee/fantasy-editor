import { Editor, Transforms } from 'slate';
import { BLOCK_TABLE, BLOCK_TABLE_CELL } from '../../../types';

export const deleteColumn = (editor: Editor) => {
  const currentCell = Editor.above(editor, {
    match: n => n.type === BLOCK_TABLE_CELL,
  });
  if (currentCell) {
    const currentTable = Editor.above(editor, {
      match: n => n.type === BLOCK_TABLE,
    });
    if (currentTable) {
      const [, cellPath] = currentCell;
      const [tableNode, tablePath] = currentTable;
      const col: number = tableNode.col as number;
      if (col === 1) {
        Transforms.removeNodes(editor, {
          at: tablePath,
        });
      } else {
        const pathToDelete = cellPath.slice();
        const replacePathPos = pathToDelete.length - 2;
        tableNode.children.forEach((row, rowIdx) => {
          pathToDelete[replacePathPos] = rowIdx;
          Transforms.removeNodes(editor, {
            at: pathToDelete,
          });
        });
      }
    }
  }
};
