import { Editor, Path, Transforms } from 'slate';
import { getLastNode } from '../utils/get-last-node';
import { BLOCK_IMAGE, BLOCK_PARAGRAPH, BLOCK_TABLE } from './types';

export const withTrailingNode = () => <T extends Editor>(editor: T) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const [lastNode, lastPath] = getLastNode(editor, 1);
      if ([BLOCK_IMAGE].includes(lastNode.type as string)) {
        Transforms.insertNodes(
          editor,
          {
            type: BLOCK_PARAGRAPH,
            children: [{ text: '' }],
          },
          { at: Path.next(lastPath) },
        );
      }
      const path = lastPath.slice(0, 1);
      const [node] = Editor.node(editor, path);
      if (node.type === BLOCK_TABLE) {
        Transforms.insertNodes(
          editor,
          {
            type: BLOCK_PARAGRAPH,
            children: [{ text: '' }],
          },
          { at: Path.next(path) },
        );
      }
    }
    return normalizeNode([currentNode, currentPath]);
  };
  return editor;
};
