import React, { FunctionComponent } from 'react';
import { ReactComponent as IconNumberedList } from '../../../assets/svg/numbered-list.svg';
import { isBlockActive } from '@/common/transforms';
import { useSlate } from 'slate-react';
import {BLOCK_CODE, BLOCK_OL} from '@/core/types';
import { toggleList } from '@/utils/toggleList';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonNumberedList: FunctionComponent<Props> = props => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={() => {
        toggleList(editor, BLOCK_OL);
      }}
      disabled={isBlockActive(editor, BLOCK_CODE)}
      active={isBlockActive(editor, BLOCK_OL)}
    >
      <IconNumberedList />
    </ToolbarButton>
  );
};

export {ButtonNumberedList};
