import React, { FunctionComponent } from 'react';
import ToolbarButton from '../../toolbar-button';
import { ReactComponent as IconInsertRowDown } from '../../../assets/svg/insert-row-down.svg';
import { useSlate } from 'slate-react';
import { insertRow } from '@/plugins/blocks/table';

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

export default ButtonInsertRowBottom;
