import React, { FunctionComponent } from 'react';
import { ReactComponent as IconSup } from '../../../assets/svg/sup.svg';
import { useSlate } from 'slate-react';
import {isBlockActive, isMarkActive, toggleMark} from '@/common/transforms';
import {BLOCK_CODE, MARK_SUPERSCRIPT} from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonSuperscript: FunctionComponent<Props> = props => {
  const editor = useSlate();
  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_SUPERSCRIPT);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isMarkActive(editor, MARK_SUPERSCRIPT)}
    >
      <IconSup />
    </ToolbarButton>
  );
};

export {ButtonSuperscript};
