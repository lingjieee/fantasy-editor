import React, {FunctionComponent} from 'react';
import {ReactComponent as IconSplit} from '../../../assets/svg/split-cell-horizontal.svg';
import ToolbarButton from "@/components/toolbar-button";
import {useSlate} from "slate-react";
import {findBlockActive} from "@/common/transforms";
import {BLOCK_TABLE_CELL} from "@/plugins/types";

interface OwnProps {
}

type Props = OwnProps;

const ButtonSplitCell: FunctionComponent<Props> = (props) => {

  let editor = useSlate();
  let active = false;
  let match = findBlockActive(editor, [BLOCK_TABLE_CELL]);
  if(match){
    const {rowspan=1, colspan=1} = match[0];
    if(rowspan>1 || colspan>1){
      active = true;
    }
  }

  const splitCell = () => {

  };

  return (
    <ToolbarButton
      onMouseDown={() => {
        splitCell();
      }}
      disabled={!active}
    >
      <IconSplit/>
    </ToolbarButton>
  );
};

export default ButtonSplitCell;
