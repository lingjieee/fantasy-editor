import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as IconTable } from '../../../../assets/svg/table.svg';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style';
import { Range, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { isBlockActive } from '@/common/transforms';
import {BLOCK_TABLE_WRAP} from '@/core/types';
import classNames from 'classnames';
import { insertTable } from '../transforms';
import {ButtonInsertRowTop} from './button-insert-row-top';
import {ButtonInsertRowBottom} from './button-insert-row-bottom';
import {ButtonInsertColLeft} from './button-insert-row-left';
import {ButtonInsertColRight} from './button-insert-row-right';
import {ButtonDeleteRow} from './button-delete-row';
import {ButtonDeleteCol} from './button-delete-col';
import './button-table.less';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonTable: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(false);
  const [mark, setMark] = useState<Range | null>(null);
  const editor = useSlate();
  const active = isBlockActive(editor, BLOCK_TABLE_WRAP);
  const show = () => {
    if (!active) {
      const { selection } = editor;
      setMark(selection);
      setVisible(true);
    }
  };

  const onSelect = (row: number, col: number) => {
    if (!active && mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      insertTable(editor, row + 1, col + 1);
    }
    setVisible(false);
  };

  return (
    <>
      <Popover
        visible={visible}
        content={<SizeSelection onSelect={onSelect} />}
        onVisibleChange={setVisible}
        trigger={['click']}
        placement="bottomLeft"
      >
        <ToolbarButton onMouseDown={show} active={active}>
          <IconTable />
        </ToolbarButton>
      </Popover>
      {active && (
        <>
          <ButtonInsertRowTop />
          <ButtonInsertRowBottom />
          <ButtonInsertColLeft />
          <ButtonInsertColRight />
          <ButtonDeleteRow />
          <ButtonDeleteCol />
        </>
      )}
    </>
  );
};

interface SelectionProps {
  onSelect: (row: number, col: number) => void;
}

const SizeSelection: React.FC<SelectionProps> = ({ onSelect }) => {
  const [renderSize, setRenderSize] = useState({
    row: 4,
    col: 4,
  });
  const [selectSize, setSelectSize] = useState({
    row: 0,
    col: 0,
  });

  const onHover = (r: number, c: number) => {
    setSelectSize({
      row: r + 1,
      col: c + 1,
    });
    let row = r < 3 ? 4 : r + 2;
    let col = c < 3 ? 4 : c + 2;
    if (row > 10) {
      row = 10;
    }
    if (col > 10) {
      col = 10;
    }
    setRenderSize({
      row,
      col,
    });
  };

  const handleSelect = (row: number, col: number) => {
    onSelect(row, col);
    setSelectSize({
      row: 0,
      col: 0,
    });
  };

  const { row, col } = selectSize;
  return (
    <div onMouseDown={e => e.stopPropagation()}>
      <div>
        {Array(renderSize.row)
          .fill('')
          .map((m, r) => (
            <div key={r} className="fe-btn-tb-row">
              {Array(renderSize.col)
                .fill('')
                .map((m, c) => (
                  <div
                    className={classNames('fe-btn-tb-cell', { active: r < row && c < col })}
                    onClick={() => handleSelect(r, c)}
                    onMouseEnter={() => onHover(r, c)}
                    key={c}
                  >
                    &nbsp;
                  </div>
                ))}
            </div>
          ))}
      </div>
      <div className="fe-btn-tb-tips">
        {row}×{col}
      </div>
    </div>
  );
};

export {ButtonTable};
