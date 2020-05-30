import React, { FunctionComponent } from 'react';
import ToolbarButton from '../../toolbar-button';
import { ReactComponent as IconInsertRowUp } from '../../../assets/svg/insert-row-up.svg';
import { useSlate } from 'slate-react';
import { insertRow } from '@/plugins/blocks/table';

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertRowTop: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertRow(editor, 'top');
      }}>
      <IconInsertRowUp />
    </ToolbarButton>
  );
};

export default ButtonInsertRowTop;
