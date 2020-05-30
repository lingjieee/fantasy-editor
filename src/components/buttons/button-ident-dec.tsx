import React, { FunctionComponent } from 'react';
import { ReactComponent as IconIdentDec } from '../../assets/svg/outdent.svg';
import { Editor, Transforms } from 'slate';
import { BLOCK_INDENT } from '@/plugins/types';
import { isBlockActive } from '@/common/transforms';
import ToolbarButton from '../toolbar-button';
import { useSlate } from 'slate-react';

interface OwnProps {}

type Props = OwnProps;

const ButtonIdentDec: FunctionComponent<Props> = props => {
  let editor = useSlate();

  const toggleIdent = () => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === BLOCK_INDENT,
    }) as any;
    if (match) {
      const [node, path] = match;
      const step = (node?.step || 1) - 1;
      if (step === 0) {
        Transforms.unwrapNodes(editor, {
          at: path,
        });
      } else {
        Transforms.setNodes(
          editor,
          {
            step,
          },
          {
            at: path,
          },
        );
      }
    }
  };

  return (
    <ToolbarButton onMouseDown={toggleIdent} disabled={!isBlockActive(editor, BLOCK_INDENT)}>
      <IconIdentDec />
    </ToolbarButton>
  );
};

export default ButtonIdentDec;
