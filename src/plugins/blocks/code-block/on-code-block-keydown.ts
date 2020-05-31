import { Editor, Path, Transforms } from 'slate';
import isHotkey from 'is-hotkey';
import { BLOCK_CODE_INLINE, BLOCK_PARAGRAPH } from '../../types';

export const onKeyDownCodeBlock = (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('Enter', e)) {
    const match = Editor.above(editor, {
      match: n => n.type === BLOCK_CODE_INLINE,
    });
    if (match) {
      const [, path] = match;
      const text = Editor.string(editor, path);
      const [parent, parentPath] = Editor.parent(editor, path);
      // 在最后一行，没有文本且输入回车
      if (!text && path[path.length - 1] === parent.children.length - 1) {
        e.preventDefault();
        Transforms.setNodes(editor, {
          type: BLOCK_PARAGRAPH,
        });
        const newPath = Path.next(parentPath);
        Transforms.moveNodes(editor, {
          at: path,
          to: newPath,
        });
      }
    }
  }
};
