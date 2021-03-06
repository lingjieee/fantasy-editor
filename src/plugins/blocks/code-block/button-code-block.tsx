import React, { FunctionComponent } from 'react';
import { ReactComponent as IconCodeBlock } from '../../../assets/svg/code-snippet.svg';
import { useSlate } from 'slate-react';
import { isBlockActive } from '@/common/transforms';
import { BLOCK_CODE, BLOCK_PARAGRAPH } from '@/core/types';
import { Transforms } from 'slate';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonCodeBlock: FunctionComponent<Props> = props => {
  const editor = useSlate();

  const toggleBlock = () => {
    const active = isBlockActive(editor, BLOCK_CODE);
    Transforms.setNodes(editor, {
      type: active ? BLOCK_PARAGRAPH : BLOCK_CODE,
    });
  };

  return (
    <ToolbarButton onMouseDown={toggleBlock} active={isBlockActive(editor, BLOCK_CODE)}>
      <IconCodeBlock />
    </ToolbarButton>
  );
};

export {ButtonCodeBlock};
