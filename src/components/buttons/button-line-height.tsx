import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as IconLineHeight } from '../../assets/svg/line-height.svg';
import { ReactEditor, useSlate } from 'slate-react';
import { Range, Transforms } from 'slate';
import { BLOCK_CODE, MARK_LINE_HEIGHT } from '@/plugins/types';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import 'antd/lib/dropdown/style';
import 'antd/lib/menu/style';
import DropdownButton from '../dropdown-button';
import { isBlockActive } from '@/common/transforms';

const MenuItem = Menu.Item;

interface OwnProps {}

type Props = OwnProps;

const ButtonLineHeight: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(false);

  let editor = useSlate();
  const [mark, setMark] = useState<Range | null>(null);

  const onClick = (e: any) => {
    e.domEvent.preventDefault();
    const selectValue = parseFloat(e.key);
    if (mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      if (selectValue) {
        editor.addMark(MARK_LINE_HEIGHT, selectValue);
      } else {
        editor.removeMark(MARK_LINE_HEIGHT);
      }
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
      <MenuItem key="0">默认</MenuItem>
      <MenuItem key="1">1</MenuItem>
      <MenuItem key="1.15">1.15</MenuItem>
      <MenuItem key="1.5">1.5</MenuItem>
      <MenuItem key="2">2</MenuItem>
      <MenuItem key="2.5">2.5</MenuItem>
      <MenuItem key="3">3</MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} visible={visible} onVisibleChange={setVisible}>
      <DropdownButton width={45} onMouseDown={show} disabled={isBlockActive(editor, BLOCK_CODE)}>
        <IconLineHeight />
      </DropdownButton>
    </Dropdown>
  );
};

export default ButtonLineHeight;
