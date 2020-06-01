import React, { FunctionComponent } from 'react';
import { ReactComponent as IconStrikeThrough } from '@/assets/svg/strikethrough.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_STRIKE_THROUGH } from '@/core/types';
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
      active={isMarkActive(editor, MARK_STRIKE_THROUGH)}
    >
      <IconStrikeThrough />
    </ToolbarButton>
  );
};

export {ButtonStrikeThrough};
