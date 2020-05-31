import React, { FunctionComponent } from 'react';
import ToolbarButton from "@/components/toolbar-button";
import {ReactComponent as IconTask} from '../../assets/svg/tasklist.svg';
import {useSlate} from "slate-react";
import {isBlockActive, toggleBlock} from "@/common/transforms";
import {BLOCK_TASKLIST} from "@/plugins/types";

interface OwnProps {}

type Props = OwnProps;

const ButtonTasklist: FunctionComponent<Props> = (props) => {

  const editor = useSlate();

  return (
    <ToolbarButton
      onMouseDown={()=>toggleBlock(editor, BLOCK_TASKLIST)}
      active={isBlockActive(editor, BLOCK_TASKLIST)}
    >
      <IconTask/>
    </ToolbarButton>
  );
};

export default ButtonTasklist;
