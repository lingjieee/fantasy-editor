import React from 'react';
import { RenderElement } from '../../..';
import { BLOCK_TABLE, BLOCK_TABLE_CELL, BLOCK_TABLE_ROW } from '../../types';
import './table.less';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { Transforms } from 'slate';

export const renderElementTable: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_TABLE) {
    return <Table attributes={attributes} element={element} children={children} />;
  } else if (element.type === BLOCK_TABLE_ROW) {
    return <tr {...attributes}>{children}</tr>;
  } else if (element.type === BLOCK_TABLE_CELL) {
    return <TableCell attributes={attributes} element={element} children={children} />;
  }
};

const Table: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  const col: number = element.col as number;
  const widths: number[] = (element.widths as any) || [];
  let total = Array(col)
    .fill('')
    .reduce((prev, curr, idx) => prev + (widths[idx] || 100));
  return (
    <div {...attributes} className="fc-table-wrap" onMouseDown={e => e.preventDefault()}>
      <table style={{ width: total }} className="fc-table">
        <colgroup>
          {Array(col)
            .fill('')
            .map((v, i) => (
              <col key={i} width={widths[i] || 100} />
            ))}
        </colgroup>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

const TableCell: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  let editor = useSlate();

  const handleClick = () => {
    let path = ReactEditor.findPath(editor, element);
    Transforms.select(editor, path);
  };

  return (
    <td {...attributes} onClick={handleClick}>
      {children}
    </td>
  );
};
