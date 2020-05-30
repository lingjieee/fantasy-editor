import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { HistoryEditor } from 'slate-history';
import { ReactComponent as IconUndo } from '../../assets/svg/undo.svg';
import { useSlate } from 'slate-react';

interface OwnProps {}

type Props = OwnProps;

const ButtonUndo: FunctionComponent<Props> = props => {
  let editor: HistoryEditor = useSlate() as any;

  return (
    <ToolbarButton onMouseDown={editor.undo} disabled={editor.history.undos.length === 0}>
      <IconUndo />
    </ToolbarButton>
  );
};

export default ButtonUndo;
