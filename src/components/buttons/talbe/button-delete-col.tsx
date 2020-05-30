import React, { FunctionComponent } from 'react';
import ToolbarButton from '../../toolbar-button';
import { ReactComponent as IconDelCol } from '../../../assets/svg/del-col.svg';
import { useSlate } from 'slate-react';
import { deleteColumn } from '@/plugins/blocks/table';

interface OwnProps {}

type Props = OwnProps;

const ButtonDeleteCol: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        deleteColumn(editor);
      }}>
      <IconDelCol />
    </ToolbarButton>
  );
};

export default ButtonDeleteCol;
