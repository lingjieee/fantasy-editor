import React, { FunctionComponent } from 'react';
import { ReactComponent as IconInsertRowUp } from '../../../../assets/svg/insert-row-up.svg';
import { useSlate } from 'slate-react';
import { insertRow } from '../transforms';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertRowTop: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertRow(editor, 'top');
      }}
    >
      <IconInsertRowUp />
    </ToolbarButton>
  );
};

export {ButtonInsertRowTop};
