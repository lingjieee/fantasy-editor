import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconStrikeThrough } from '../../assets/svg/strikethrough.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_STRIKE_THROUGH } from '@/plugins/types';

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

export default ButtonStrikeThrough;
