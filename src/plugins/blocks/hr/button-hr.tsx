import React, { FunctionComponent } from 'react';
import { ReactComponent as IconHr } from '../../../assets/svg/hr.svg';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { BLOCK_HR, BLOCK_PARAGRAPH } from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonHr: FunctionComponent<Props> = props => {
  const editor = useSlate();

  const insertHr = () => {
    let { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    if (!isCollapsed) {
      Transforms.collapse(editor, { edge: 'end' });
      selection = editor.selection;
    } else {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === BLOCK_PARAGRAPH,
      }) as any;
      if (match) {
        if (!Editor.string(editor, match[1])) {
          Transforms.setNodes(
            editor,
            {
              type: BLOCK_HR,
            },
            {
              at: match[1],
            },
          );
          return;
        }
      }
    }
    Transforms.insertNodes(
      editor,
      {
        type: BLOCK_HR,
        children: [{ text: '' }],
      },
      { at: selection as Range },
    );
  };

  return (
    <ToolbarButton onMouseDown={insertHr}>
      <IconHr />
    </ToolbarButton>
  );
};

export {ButtonHr};
