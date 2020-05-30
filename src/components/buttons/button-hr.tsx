import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconHr } from '../../assets/svg/hr.svg';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { BLOCK_HR, BLOCK_PARAGRAPH } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonHr: FunctionComponent<Props> = props => {
  let editor = useSlate();

  const insertHr = () => {
    let { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    if (!isCollapsed) {
      Transforms.collapse(editor, { edge: 'end' });
      selection = editor.selection;
    } else {
      let [match] = Editor.nodes(editor, {
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

export default ButtonHr;
