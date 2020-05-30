import React, { FunctionComponent } from 'react';
import { ReactComponent as IconSup } from '../../assets/svg/sup.svg';
import { useSlate } from 'slate-react';
import ToolbarButton from '../toolbar-button';
import { isMarkActive, toggleMark } from '@/common/transforms';
import { MARK_SUPERSCRIPT } from '@/plugins/types';

interface OwnProps {}

type Props = OwnProps;

const ButtonSuperscript: FunctionComponent<Props> = props => {
  let editor = useSlate();
  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleMark(editor, MARK_SUPERSCRIPT);
      }}
      active={isMarkActive(editor, MARK_SUPERSCRIPT)}>
      <IconSup />
    </ToolbarButton>
  );
};

export default ButtonSuperscript;
