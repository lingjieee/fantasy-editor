import { Editor, Transforms } from 'slate';
import { BLOCK_TABLE } from '../../../types';

export const deleteTable = (editor: Editor) => {
  const match = Editor.above(editor, {
    match: n => n.type === BLOCK_TABLE,
  });
  if (match) {
    Transforms.removeNodes(editor, {
      at: match[1],
    });
  }
};
