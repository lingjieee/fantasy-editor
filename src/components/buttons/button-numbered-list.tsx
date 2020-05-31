import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconNumberedList } from '../../assets/svg/numbered-list.svg';
import { isBlockActive } from '@/common/transforms';
import { useSlate } from 'slate-react';
import { BLOCK_OL } from '@/plugins/types';
import { toggleList } from '@/utils/toggleList';

interface OwnProps {}

type Props = OwnProps;

const ButtonNumberedList: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleList(editor, BLOCK_OL);
      }}
      active={isBlockActive(editor, BLOCK_OL)}
    >
      <IconNumberedList />
    </ToolbarButton>
  );
};

export default ButtonNumberedList;
