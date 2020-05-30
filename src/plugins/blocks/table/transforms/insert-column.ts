import { Editor, Path, Transforms } from 'slate';
import { BLOCK_TABLE, BLOCK_TABLE_CELL } from '../../../types';
import { getEmptyTableCell } from '../util/get-empty-table-cell';

export const insertColumn = (editor: Editor, position: 'left' | 'right') => {
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
      const nextCellPath = position === 'left' ? cellPath : Path.next(cellPath);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = newCellPath[replacePathPos];
      tableNode.children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        Transforms.insertNodes(editor, getEmptyTableCell(), {
          at: newCellPath,
          select: rowIdx === currentRowIdx,
        });
      });
      const col = (tableNode.col as number) + 1;
      Transforms.setNodes(
        editor,
        {
          col,
        },
        {
          at: tablePath,
        },
      );
    }
  }
};
