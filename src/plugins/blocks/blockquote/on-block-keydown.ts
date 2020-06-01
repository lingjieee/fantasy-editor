import { Editor, Path, Transforms } from 'slate';
import isHotkey from 'is-hotkey';
import { BLOCK_QUOTE } from '@/core/types';

export const onKeyDownBlockquote = (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('Enter', e)) {
    const match = Editor.above(editor, {
      match: n => n.type === BLOCK_QUOTE,
    });
    if (match) {
      const { selection } = editor;
      const [node, path] = match;
      if (selection) {
        const childPath = Editor.path(editor, selection);
        if (childPath.length > path.length) {
          const idx = childPath[path.length];
          if (idx === node.children.length - 1) {
            const lastPath = childPath.slice(0, path.length + 1);
            const text = Editor.string(editor, lastPath);
            if (!text) {
              e.preventDefault();
              const newPath = Path.next(path);
              Transforms.moveNodes(editor, {
                at: lastPath,
                to: newPath,
              });
            }
          }
        }
      }
    }
  }
};
