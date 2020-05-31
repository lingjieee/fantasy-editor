import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconItalic } from '../../assets/svg/italic.svg';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_ITALIC } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonItalic: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_ITALIC);
      }}
      active={isMarkActive(editor, MARK_ITALIC)}
    >
      <IconItalic />
    </ToolbarButton>
  );
};

export default ButtonItalic;
