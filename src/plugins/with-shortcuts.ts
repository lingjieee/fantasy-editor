import { Editor, Range, Transforms } from 'slate';
import {
  BLOCK_CODE, BLOCK_CODE_INLINE,
  BLOCK_H1,
  BLOCK_H2,
  BLOCK_H3,
  BLOCK_H4,
  BLOCK_H5,
  BLOCK_H6,
  BLOCK_LI,
  BLOCK_OL, BLOCK_PARAGRAPH,
  BLOCK_QUOTE, BLOCK_TASK_LIST,
  BLOCK_UL,
} from '@/core/types';
import { toggleList } from '@/utils/toggleList';
import {isBlockActive} from "@/common/transforms";
import {languages} from './blocks/code-block/constants';

const SHORTCUTS: Record<string, string> = {
  '*': BLOCK_LI,
  '-': BLOCK_LI,
  '+': BLOCK_LI,
  '1.': BLOCK_LI,
  '>': BLOCK_QUOTE,
  '#': BLOCK_H1,
  '##': BLOCK_H2,
  '###': BLOCK_H3,
  '####': BLOCK_H4,
  '#####': BLOCK_H5,
  '######': BLOCK_H6,
  '[]': BLOCK_TASK_LIST,
};

export const withShortcuts = () => <T extends Editor>(editor: T) => {
  const { insertText } = editor;
  editor.insertText = text => {
    const { selection } = editor;
    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      const type = SHORTCUTS[beforeText];
      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        if (type !== BLOCK_LI) {
          Transforms.setNodes(
            editor,
            { type },
            {
              match: n => Editor.isBlock(editor, n),
            },
          );
        } else {
          const type = beforeText === '1.' ? BLOCK_OL : BLOCK_UL;
          toggleList(editor, type);
        }
        return;
      }else if(beforeText.startsWith('```')){
        if(beforeText==='```'){
          Transforms.select(editor, range);
          Transforms.delete(editor);
          const active = isBlockActive(editor, BLOCK_CODE);
          Transforms.unwrapNodes(editor, {
            match: (n: any) => n.type === BLOCK_CODE,
          });
          Transforms.setNodes(editor, {
            type: active ? BLOCK_PARAGRAPH : BLOCK_CODE_INLINE,
          });
          if (!active) {
            Transforms.wrapNodes(editor, {
              type: BLOCK_CODE,
              lang: 'markup',
              children: [],
            });
          }
          return;
        }else{
          const lang = beforeText.replace('```', '');
          if(languages[lang]){
            Transforms.select(editor, range);
            Transforms.delete(editor);
            const active = isBlockActive(editor, BLOCK_CODE);
            Transforms.unwrapNodes(editor, {
              match: (n: any) => n.type === BLOCK_CODE,
            });
            Transforms.setNodes(editor, {
              type: active ? BLOCK_PARAGRAPH : BLOCK_CODE_INLINE,
            });
            if (!active) {
              Transforms.wrapNodes(editor, {
                type: BLOCK_CODE,
                lang: lang,
                children: [],
              });
            }
            return;
          }
        }
      }
    }
    console.log('insert')
    insertText(text);
  };

  return editor;
};
