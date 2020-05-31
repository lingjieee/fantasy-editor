import { Editor, NodeEntry } from 'slate';

export const getLastNode = (editor: Editor, level: number): NodeEntry => {
  const [, lastPath] = Editor.last(editor, []);
  let i = lastPath.length;
  while (i > 0) {
    const path = lastPath.slice(0, i);
    const node = Editor.node(editor, path);
    if (!!node[0].type) {
      return node;
    }
    i--;
  }
  return Editor.node(editor, lastPath.slice(0, 1));
};
