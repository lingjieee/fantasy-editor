import React, { FunctionComponent } from 'react';
import { ReactComponent as IconInsertColRight } from '@/assets/svg/insert-col-right.svg';
import { useSlate } from 'slate-react';
import { insertColumn } from '@/plugins/blocks/table';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertColRight: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertColumn(editor, 'left');
      }}
    >
      <IconInsertColRight />
    </ToolbarButton>
  );
};

export {ButtonInsertColRight};
