import { Editor, Node, Transforms } from 'slate';
import { MentionNodeData } from '@/plugins/blocks/mention/types';
import { BLOCK_MENTION } from '@/core/types';

export const insertMention = (editor: Editor, data: MentionNodeData) => {
  const mention: Node = {
    type: BLOCK_MENTION,
    children: [{ text: '' }],
    ...data,
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
