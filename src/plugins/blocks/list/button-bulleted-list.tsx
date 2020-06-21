import React, { FunctionComponent } from 'react';
import { ReactComponent as IconBulletedList } from '../../../assets/svg/bulleted-list.svg';
import { isBlockActive } from '@/common/transforms';
import { useSlate } from 'slate-react';
import {BLOCK_CODE, BLOCK_UL} from '@/core/types';
import { toggleList } from '@/utils/toggleList';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonBulletedList: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleList(editor, BLOCK_UL);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isBlockActive(editor, BLOCK_UL)}
    >
      <IconBulletedList />
    </ToolbarButton>
  );
};

export {ButtonBulletedList};
