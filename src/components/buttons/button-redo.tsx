import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { useSlate } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { ReactComponent as IconRedo } from '../../assets/svg/redo.svg';

interface OwnProps {}

type Props = OwnProps;

const ButtonRedo: FunctionComponent<Props> = props => {
  const editor: HistoryEditor = useSlate() as any;

  return (
    <ToolbarButton onMouseDown={editor.redo} disabled={editor.history.redos.length === 0}>
      <IconRedo />
    </ToolbarButton>
  );
};

export default ButtonRedo;
