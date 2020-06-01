import React, { FunctionComponent } from 'react';
import { ReactComponent as IconSup } from '../../../assets/svg/sup.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_SUPERSCRIPT } from '@/core/types';
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
      active={isMarkActive(editor, MARK_SUPERSCRIPT)}
    >
      <IconSup />
    </ToolbarButton>
  );
};

export {ButtonSuperscript};
