import React, { FunctionComponent } from 'react';
import { ReactComponent as IconItalic } from '../../../assets/svg/italic.svg';
import { useSlate } from 'slate-react';
import {isBlockActive, isMarkActive, toggleMark} from '@/common/transforms';
import {BLOCK_CODE, MARK_ITALIC} from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonItalic: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_ITALIC);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isMarkActive(editor, MARK_ITALIC)}
    >
      <IconItalic />
    </ToolbarButton>
  );
};

export {ButtonItalic};
