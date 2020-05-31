import React, {useRef, useState} from 'react';
import { RenderElement } from '../../..';
import {
  BLOCK_TABLE,
  BLOCK_TABLE_CELL,
  BLOCK_TABLE_PRE,
  BLOCK_TABLE_ROW,
  BLOCK_TABLE_SUF,
  BLOCK_TABLE_WRAP
} from '../../types';
import './table.less';
import {ReactEditor, RenderElementProps, useSelected, useSlate} from 'slate-react';
import {TableSelectProvider, useTableSelect} from "@/plugins/blocks/table/table-select-context";
import classNames from 'classnames';
import {Editor, Transforms} from "slate";

export const renderElementTable: RenderElement = ({ attributes, children, element }) => {
  if(element.type === BLOCK_TABLE_WRAP){
    return <TableWrap attributes={attributes} element={element} children={children}/>
  }else if(element.type === BLOCK_TABLE_PRE || element.type ===BLOCK_TABLE_SUF){
    return <TableTool attributes={attributes} element={element} children={children}/>
  }else if (element.type === BLOCK_TABLE) {
    return <Table attributes={attributes} element={element} children={children} />;
  } else if (element.type === BLOCK_TABLE_ROW) {
    return <tr {...attributes}>{children}</tr>;
  } else if (element.type === BLOCK_TABLE_CELL) {
    return <TableCell attributes={attributes} element={element} children={children} />;
  }
};

const TableTool:React.FC<RenderElementProps> = ({attributes, children, element}) => {
  return(
    <span className="fc-table-tool" {...attributes}>{children}</span>
  )
}

const TableWrap:React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  return(
    <div {...attributes} className="fc-table-wrap">
      {children}
    </div>
  )
}

const Table: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  const col: number = element.col as number;
  const widths: number[] = (element.widths as any) || [];
  const total = Array(col)
    .fill('')
    .reduce((prev, curr, idx) => prev + (widths[idx] || 100), 0);

  const [select, setSelect] = useState(false);
  const [startPoint, setStartPoint] = useState({x: -1, y: -1});
  const [endPoint, setEndPoint] = useState({x: -1, y: -1});
  let selected = useSelected();
  const startRef = useRef<any>(null);
  let editor = useSlate();

  const startSelect = (x:number, y:number) => {
    // startRef.current = {x,y};
  };

  const moveSelect = (x:number, y:number) => {
    // if(select){
    //   if(endPoint.x !== x || endPoint.y !==y){
    //     setEndPoint({x,y});
    //   }
    // }else if(startRef.current){
    //   if(x!==startRef.current.x || y!==startRef.current.y){
    //     setSelect(true);
    //     setStartPoint(startRef.current);
    //     setEndPoint({x,y});
    //   }
    //   startRef.current = null;
    // }
  };

  const stopSelect = (x:number, y:number) => {
    // if(select){
    //   setEndPoint({x, y});
    //   setSelect(false);
    //   effectNode()
    // }else if(startRef.current){
    //   setStartPoint({x, y});
    //   setEndPoint({x, y});
    //   startRef.current = null;
    //   effectNode()
    // }
  }

  const onMouseLeave = () => {
    // if(select){
    //   setSelect(false);
    //   effectNode()
    // }if(startRef.current){
    //   const {x,y} = startRef.current;
    //   setStartPoint({x, y});
    //   setEndPoint({x, y});
    //   startRef.current = null;
    //   effectNode()
    // }
  };

  const getRange = () => {
    return {
      x1: Math.min(startPoint.x , endPoint.x),
      x2: Math.max(startPoint.x , endPoint.x),
      y1: Math.min(startPoint.y , endPoint.y),
      y2: Math.max(startPoint.y , endPoint.y),
    }
  };

  const effectNode = () => {
    let range = getRange();
    if(range.x1===range.x2 && range.y1===range.y2){
      range = null;
    }
    let path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, {
      range: range
    }, {at: path});
  };

  let range = getRange();

  return (
    <div className="fc-table-container">
      <TableSelectProvider
        select={select}
        selected={selected}
        selectRange={range}
        startSelect={startSelect}
        moveSelect={moveSelect}
        stopSelect={stopSelect}>
        <table style={{ width: total }}
               className={classNames('fc-table')}
               onMouseLeave={onMouseLeave}>
          <colgroup>
            {Array(col)
              .fill('')
              .map((v, i) => (
                <col key={i} width={widths[i] || 100} />
              ))}
          </colgroup>
          <tbody>{children}</tbody>
        </table>
      </TableSelectProvider>
    </div>
  );
};

const TableCell: React.FC<RenderElementProps> = ({ attributes, children, element }) => {

  let editor = useSlate();
  let path = ReactEditor.findPath(editor, element);
  const x = path[path.length-2];
  const y = path[path.length-1];

  let {
    select,
    selected,
    startSelect,
    moveSelect,
    stopSelect,
    selectRange
  } = useTableSelect();

  const handleMouseDown = () => {
    if(!select){
      startSelect(x, y);
    }
  };

  const handleMouseEnter = () => {
    moveSelect(x, y);
  };

  const handleMouseUp = () => {
    stopSelect(x, y);
  };

  const inSelect = (
    x >= selectRange.x1
    && x <= selectRange.x2
    && y >= selectRange.y1
    && y <= selectRange.y2
  )

  const {rowspan, colspan}:any = element;

  return (
    <td {...attributes}
        className={classNames({selected: inSelect && selected})}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        rowSpan={rowspan||1}
        colSpan={colspan||1}
    >
      {children}
    </td>
  );
};