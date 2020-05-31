import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconBold } from '../../assets/svg/bold.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_BOLD } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonBold: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_BOLD);
      }}
      active={isMarkActive(editor, MARK_BOLD)}
    >
      <IconBold />
    </ToolbarButton>
  );
};

export default ButtonBold;
