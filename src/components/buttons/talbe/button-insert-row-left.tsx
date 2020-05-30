import React, { FunctionComponent } from 'react';
import ToolbarButton from '../../toolbar-button';
import { ReactComponent as IconInsertColLeft } from '../../../assets/svg/insert-col-left.svg';
import { useSlate } from 'slate-react';
import { insertColumn } from '@/plugins/blocks/table';

interface OwnProps {}

type Props = OwnProps;

const ButtonInsertColLeft: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        insertColumn(editor, 'left');
      }}>
      <IconInsertColLeft />
    </ToolbarButton>
  );
};

export default ButtonInsertColLeft;
