import React, { FunctionComponent } from 'react';
import { ReactComponent as IconBold } from '../../../assets/svg/bold.svg';
import { useSlate } from 'slate-react';
import {isBlockActive, isMarkActive, toggleMark} from '@/common/transforms';
import {BLOCK_CODE, MARK_BOLD} from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonBold: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_BOLD);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isMarkActive(editor, MARK_BOLD)}
    >
      <IconBold />
    </ToolbarButton>
  );
};

export {ButtonBold};
