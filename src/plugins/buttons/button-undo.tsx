import React, { FunctionComponent } from 'react';
import { HistoryEditor } from 'slate-history';
import { ReactComponent as IconUndo } from '../../assets/svg/undo.svg';
import { useSlate } from 'slate-react';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonUndo: FunctionComponent<Props> = props => {
  const editor: HistoryEditor = useSlate() as any;

  return (
    <ToolbarButton onMouseDown={editor.undo} disabled={editor.history.undos.length === 0}>
      <IconUndo />
    </ToolbarButton>
  );
};

export {ButtonUndo};
