import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as IconAlignLeft } from '../../../assets/svg/align-left.svg';
import { ReactComponent as IconAlignCenter } from '../../../assets/svg/align-center.svg';
import { ReactComponent as IconAlignRight } from '../../../assets/svg/align-right.svg';
import { ReactComponent as IconAlignJustify } from '../../../assets/svg/align-justify.svg';
import { findBlockActive, isBlockActive } from '@/common/transforms';
import {
  BLOCK_ALIGN_CENTER,
  BLOCK_ALIGN_JUSTIFY,
  BLOCK_ALIGN_LEFT,
  BLOCK_ALIGN_RIGHT,
  BLOCK_CODE,
} from '@/core/types';
import './button-align.less';
import { ReactEditor, useSlate } from 'slate-react';
import { Range, Transforms } from 'slate';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import 'antd/lib/dropdown/style';
import 'antd/lib/menu/style';
import {DropdownButton} from "@/components";

const MenuItem = Menu.Item;
const alignList = [BLOCK_ALIGN_LEFT, BLOCK_ALIGN_CENTER, BLOCK_ALIGN_RIGHT, BLOCK_ALIGN_JUSTIFY];

interface OwnProps {}

type Props = OwnProps;

const ButtonAlign: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(false);
  const editor = useSlate();

  const match = findBlockActive(editor, alignList);
  const value: string = match?.[0]?.type || BLOCK_ALIGN_LEFT;
  const [mark, setMark] = useState<Range | null>(null);

  const onClick = (e: any) => {
    e.domEvent.preventDefault();
    const selectValue = e.key;
    if (selectValue !== value && mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      if (match) {
        Transforms.unwrapNodes(editor, {
          match: n => n.type === match?.[0]?.type,
          split: true,
        });
      }
      Transforms.wrapNodes(editor, {
        type: selectValue,
        children: [],
      });
    }
    setVisible(false);
  };

  const show = () => {
    const { selection } = editor;
    setMark(selection);
    setVisible(true);
  };

  const menu = (
    <Menu onClick={onClick} className="fc-btn-align-overlay">
      <MenuItem key={BLOCK_ALIGN_LEFT}>
        <IconAlignLeft />
      </MenuItem>
      <MenuItem key={BLOCK_ALIGN_CENTER}>
        <IconAlignCenter />
      </MenuItem>
      <MenuItem key={BLOCK_ALIGN_RIGHT}>
        <IconAlignRight />
      </MenuItem>
      <MenuItem key={BLOCK_ALIGN_JUSTIFY}>
        <IconAlignJustify />
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} visible={visible} onVisibleChange={setVisible}>
      <DropdownButton width={45} onMouseDown={show} disabled={isBlockActive(editor, BLOCK_CODE)}>
        {value === BLOCK_ALIGN_CENTER ? (
          <IconAlignCenter />
        ) : value === BLOCK_ALIGN_RIGHT ? (
          <IconAlignRight />
        ) : value === BLOCK_ALIGN_JUSTIFY ? (
          <IconAlignJustify />
        ) : (
          <IconAlignLeft />
        )}
      </DropdownButton>
    </Dropdown>
  );
};

export {ButtonAlign};
