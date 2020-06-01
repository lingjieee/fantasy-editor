import React, { FunctionComponent } from 'react';
import { ReactComponent as IconDelCol } from '@/assets/svg/del-col.svg';
import { useSlate } from 'slate-react';
import { deleteColumn } from '@/plugins/blocks/table';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonDeleteCol: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        deleteColumn(editor);
      }}
    >
      <IconDelCol />
    </ToolbarButton>
  );
};

export {ButtonDeleteCol};
