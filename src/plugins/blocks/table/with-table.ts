import {Editor, Range, Point} from "slate";
import {BLOCK_TABLE_CELL} from "@/core";

export const withTable = () => <T extends Editor>(editor:T) => {
  const {deleteBackward, deleteForward} = editor;

  const preventDeleteCell = (operation: any, pointCallback: any) => (
    unit: any
  ) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === BLOCK_TABLE_CELL,
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = pointCallback(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    operation(unit);
  };

  editor.deleteBackward = preventDeleteCell(deleteBackward, Editor.start);

  editor.deleteForward = preventDeleteCell(deleteForward, Editor.end);

  return editor;
};