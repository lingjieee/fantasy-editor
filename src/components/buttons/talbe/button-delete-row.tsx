import React, { FunctionComponent } from 'react';
import ToolbarButton from '../../toolbar-button';
import { ReactComponent as IconDelRow } from '../../../assets/svg/del-row.svg';
import { useSlate } from 'slate-react';
import { deleteRow } from '@/plugins/blocks/table';

interface OwnProps {}

type Props = OwnProps;

const ButtonDeleteRow: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        deleteRow(editor);
      }}>
      <IconDelRow />
    </ToolbarButton>
  );
};

export default ButtonDeleteRow;
