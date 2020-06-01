import React, { FunctionComponent } from 'react';
import {ReactComponent as IconMerge} from '../../../../assets/svg/table-merge.svg';
import {findBlockActive} from "@/common/transforms";
import {useSlate} from "slate-react";
import {BLOCK_TABLE} from "@/core/types";
import {Editor, Transforms} from "slate";
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonMergeCell: FunctionComponent<Props> = (props) => {

  let editor = useSlate();
  let active = false;
  let match = findBlockActive(editor, [BLOCK_TABLE]);
  if(match && match[0].range){
    active = true;
  }

  const mergeCell = () => {
    if(match && match[0].range){
      const path = match[1];
      const range = match[0].range;
      let startX = range.x1;
      let startY = range.y1;
      let totalX = range.x2 - range.x1+1;
      let totalY = range.y2 - range.y1+1;
      let mergePath = path.concat([startX, startY]);
      let mergeCell = Editor.node(editor, mergePath);
      let insertPath = mergePath.concat([(mergeCell[0].children as any).length]);
      for(let i = totalX-1; i>=0; i--){
        for(let j = totalY-1; j>=0; j--){
          if(i!==0 || j!==0){
            const cellPath = path.concat([startX+i, startY+j]);
            const [cellNode] = Editor.node(editor, cellPath);
            let children = cellNode.children;
            Transforms.insertNodes(editor, children as any, {at: insertPath});
            Transforms.removeNodes(editor, {at: cellPath});
          }else{
            Transforms.setNodes(editor, {
              rowspan: totalY,
              colspan: totalX,
            }, {at: mergePath});
          }
        }
      }
    }
  };

  return (
    <ToolbarButton
      onMouseDown={()=>{
        mergeCell()
      }}
      disabled={!active}
    >
     <IconMerge/>
    </ToolbarButton>
  );
};

export {ButtonMergeCell};
