import React, { FunctionComponent } from 'react';
import {ReactComponent as IconTask} from '@/assets/svg/tasklist.svg';
import {useSlate} from "slate-react";
import {isBlockActive, toggleBlock} from "@/common/transforms";
import {BLOCK_TASK_LIST} from "@/core/types";
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonTaskList: FunctionComponent<Props> = (props) => {

  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={()=>toggleBlock(editor, BLOCK_TASK_LIST)}
      active={isBlockActive(editor, BLOCK_TASK_LIST)}
    >
      <IconTask/>
    </ToolbarButton>
  );
};

export {ButtonTaskList};
