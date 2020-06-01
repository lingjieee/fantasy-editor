import React, { FunctionComponent } from 'react';
import { ReactComponent as IconDelRow } from '@/assets/svg/del-row.svg';
import { useSlate } from 'slate-react';
import { deleteRow } from '@/plugins/blocks/table';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonDeleteRow: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        deleteRow(editor);
      }}
    >
      <IconDelRow />
    </ToolbarButton>
  );
};

export {ButtonDeleteRow};
