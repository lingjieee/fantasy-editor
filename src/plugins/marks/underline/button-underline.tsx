import React, { FunctionComponent } from 'react';
import { ReactComponent as IconUnderline } from '@/assets/svg/underline.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_UNDERLINE } from '@/core/types';
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
      active={isMarkActive(editor, MARK_UNDERLINE)}
    >
      <IconUnderline />
    </ToolbarButton>
  );
};

export {ButtonUnderline};
