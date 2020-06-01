import React, { FunctionComponent } from 'react';
import { ReactComponent as IconInsertRowDown } from '@/assets/svg/insert-row-down.svg';
import { useSlate } from 'slate-react';
import { insertRow } from '@/plugins/blocks/table';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertRowBottom: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertRow(editor, 'bottom');
      }}
    >
      <IconInsertRowDown />
    </ToolbarButton>
  );
};

export {ButtonInsertRowBottom};
