import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconCodeBlock } from '../../assets/svg/code-snippet.svg';
import { useSlate } from 'slate-react';
import { isBlockActive } from '@/common/transforms';
import { BLOCK_CODE, BLOCK_CODE_INLINE, BLOCK_PARAGRAPH } from '@/plugins/types';
import { Transforms } from 'slate';

interface OwnProps {}

type Props = OwnProps;

const ButtonCodeBlock: FunctionComponent<Props> = props => {
  let editor = useSlate();

  const toggleBlock = () => {
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
  };

  return (
    <ToolbarButton onMouseDown={toggleBlock} active={isBlockActive(editor, BLOCK_CODE)}>
      <IconCodeBlock />
    </ToolbarButton>
  );
};

export default ButtonCodeBlock;
