import React, { FunctionComponent } from 'react';
import { ReactComponent as IconInsertColLeft } from '../../../../assets/svg/insert-col-left.svg';
import { useSlate } from 'slate-react';
import { insertColumn } from '../transforms';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertColLeft: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertColumn(editor, 'left');
      }}
    >
      <IconInsertColLeft />
    </ToolbarButton>
  );
};

export {ButtonInsertColLeft};
