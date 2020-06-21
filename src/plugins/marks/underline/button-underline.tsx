import React, { FunctionComponent } from 'react';
import { ReactComponent as IconUnderline } from '../../../assets/svg/underline.svg';
import { useSlate } from 'slate-react';
import {isBlockActive, isMarkActive, toggleMark} from '@/common/transforms';
import {BLOCK_CODE, MARK_UNDERLINE} from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonUnderline: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_UNDERLINE);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isMarkActive(editor, MARK_UNDERLINE)}
    >
      <IconUnderline />
    </ToolbarButton>
  );
};

export {ButtonUnderline};
