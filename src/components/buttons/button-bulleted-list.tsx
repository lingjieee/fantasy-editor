import React, { FunctionComponent } from 'react';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconBulletedList } from '../../assets/svg/bulleted-list.svg';
import { isBlockActive } from '@/common/transforms';
import { useSlate } from 'slate-react';
import { BLOCK_UL } from '@/plugins/types';
import { toggleList } from '@/utils/toggleList';

interface OwnProps {}

type Props = OwnProps;

const ButtonBulletedList: FunctionComponent<Props> = props => {
  let editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleList(editor, BLOCK_UL);
      }}
      active={isBlockActive(editor, BLOCK_UL)}>
      <IconBulletedList />
    </ToolbarButton>
  );
};

export default ButtonBulletedList;
