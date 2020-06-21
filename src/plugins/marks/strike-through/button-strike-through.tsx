import React, { FunctionComponent } from 'react';
import { ReactComponent as IconStrikeThrough } from '../../../assets/svg/strikethrough.svg';
import { useSlate } from 'slate-react';
import {isBlockActive, isMarkActive, toggleMark} from '@/common/transforms';
import {BLOCK_CODE, MARK_STRIKE_THROUGH} from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonStrikeThrough: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_STRIKE_THROUGH);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isMarkActive(editor, MARK_STRIKE_THROUGH)}
    >
      <IconStrikeThrough />
    </ToolbarButton>
  );
};

export {ButtonStrikeThrough};
