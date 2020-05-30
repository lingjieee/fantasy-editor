import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconCode } from '../../assets/svg/code.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_CODE } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonCode: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_CODE);
      }}
      active={isMarkActive(editor, MARK_CODE)}>
      <IconCode />
    </ToolbarButton>
  );
};

export default ButtonCode;
