import React, { FunctionComponent } from 'react';
import { ReactComponent as IconCode } from '@/assets/svg/code.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_CODE } from '@/core/types';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonCode: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_CODE);
      }}
      active={isMarkActive(editor, MARK_CODE)}
    >
      <IconCode />
    </ToolbarButton>
  );
};

export {ButtonCode};
