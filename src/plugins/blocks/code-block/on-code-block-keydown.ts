import {Editor, Path, Point, Range, Transforms} from 'slate';
import isHotkey from 'is-hotkey';
import { BLOCK_CODE, BLOCK_PARAGRAPH } from '@/core/types';

export const onKeyDownCodeBlock = (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('Enter', e)) {
    const match = Editor.above(editor, {
      match: n => n.type === BLOCK_CODE,
    });
    if (match) {
      const [, path] = match;
      const text = Editor.string(editor, path);
      e.preventDefault();
      const {selection} = editor;
      if(selection && Range.isCollapsed(selection)){
        const start = Editor.end(editor, path);
        if(text.endsWith('\n')&&Point.equals(selection.anchor, start)){
          Transforms.delete(editor, {
            at: {
              anchor: {
                offset: selection.anchor.offset-1,
                path: selection.anchor.path
              },
              focus: selection.focus
            }
          })
          let nextPath = Path.next(path);
          Transforms.insertNodes(editor, {
            type: BLOCK_PARAGRAPH,
            children: [{
              text: ''
            }]
          }, {
            at: nextPath
          });
          Transforms.select(editor, nextPath);
          return;
        }
      }
      editor.insertText('\n');
    }
  }
};
