import { Editor, Transforms } from 'slate';
import isHotkey from 'is-hotkey';
import { BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_H4, BLOCK_H5, BLOCK_H6, BLOCK_PARAGRAPH } from '../../types';
import { findBlockActive } from '../../../common/transforms';

const headingList = [BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_H4, BLOCK_H5, BLOCK_H6];

export const onKeyDownHeading = (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('Enter', e)) {
    const match = findBlockActive(editor, headingList);
    if (match) {
      const [, path] = match;
      const text = Editor.string(editor, path);
      if (!text) {
        e.preventDefault();
        Transforms.setNodes(editor, {
          type: BLOCK_PARAGRAPH,
        });
      }
    }
  }
};
