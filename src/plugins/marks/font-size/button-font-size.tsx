import React, { FunctionComponent, useState } from 'react';
import { isBlockActive } from '@/common/transforms';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { BLOCK_CODE, MARK_FONT_SIZE } from '@/core/types';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import 'antd/lib/dropdown/style';
import 'antd/lib/menu/style';
import {DropdownButton} from "@/components";

const MenuItem = Menu.Item;

interface OwnProps {}

type Props = OwnProps;

const ButtonFontSize: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(false);

  const editor = useSlate();
  const marks = Editor.marks(editor);
  const value: string = marks?.[MARK_FONT_SIZE] || '14px';
  const [mark, setMark] = useState<Range | null>(null);

  const onClick = (e: any) => {
    e.domEvent.preventDefault();
    const selectValue = e.key;
    if (selectValue !== value && mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      editor.addMark(MARK_FONT_SIZE, selectValue);
    }
    setVisible(false);
  };

  const show = () => {
    const { selection } = editor;
    setMark(selection);
    setVisible(true);
  };

  const menu = (
    <Menu onClick={onClick} style={{ minWidth: 80 }}>
      <MenuItem key="12px">12px</MenuItem>
      <MenuItem key="13px">13px</MenuItem>
      <MenuItem key="14px">14px</MenuItem>
      <MenuItem key="15px">15px</MenuItem>
      <MenuItem key="16px">16px</MenuItem>
      <MenuItem key="19px">19px</MenuItem>
      <MenuItem key="22px">22px</MenuItem>
      <MenuItem key="24px">24px</MenuItem>
      <MenuItem key="29px">29px</MenuItem>
      <MenuItem key="32px">32px</MenuItem>
      <MenuItem key="40px">40px</MenuItem>
      <MenuItem key="48px">48px</MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} visible={visible} onVisibleChange={setVisible}>
      <DropdownButton width={60} onMouseDown={show} disabled={isBlockActive(editor, BLOCK_CODE)}>
        {value}
      </DropdownButton>
    </Dropdown>
  );
};

export {ButtonFontSize};
