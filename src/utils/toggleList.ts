import { isBlockActive } from '../common/transforms';
import { BLOCK_LI, BLOCK_PARAGRAPH } from '../core/types';
import { Editor, Transforms } from 'slate';

export const toggleList = (editor: Editor, type: string) => {
  const active = isBlockActive(editor, type);

  Transforms.unwrapNodes(editor, {
    match: (n: any) => n.type === BLOCK_LI,
  });
  Transforms.unwrapNodes(editor, {
    match: (n: any) => n.type === type,
    split: true,
  });

  Transforms.setNodes(editor, {
    type: BLOCK_PARAGRAPH,
  });
  if (!active) {
    Transforms.wrapNodes(editor, {
      type: type,
      children: [],
    });

    const nodes = Array.from(
      Editor.nodes(editor, {
        match: (n: any) => n.type === BLOCK_PARAGRAPH,
      }),
    );

    const listItem = {
      type: BLOCK_LI,
      children: [],
    };
    for (const [, path] of nodes) {
      Transforms.wrapNodes(editor, listItem, {
        at: path,
      });
    }
  }
};
