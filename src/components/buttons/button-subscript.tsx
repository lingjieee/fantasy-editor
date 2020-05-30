import React, { FunctionComponent } from 'react';
import { ReactComponent as IconSub } from '../../assets/svg/sub.svg';
import { useSlate } from 'slate-react';
import ToolbarButton from '../toolbar-button';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_SUBSCRIPT } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonSubscript: FunctionComponent<Props> = props => {
  let editor = useSlate();
  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_SUBSCRIPT);
      }}
      active={isMarkActive(editor, MARK_SUBSCRIPT)}>
      <IconSub />
    </ToolbarButton>
  );
};

export default ButtonSubscript;
