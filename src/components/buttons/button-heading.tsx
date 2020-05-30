import React, { FunctionComponent, useState } from 'react';
import './button-heading.less';
import { useLocale } from '@/common/locale-provider';
import {
  BLOCK_CODE,
  BLOCK_H1,
  BLOCK_H2,
  BLOCK_H3,
  BLOCK_H4,
  BLOCK_H5,
  BLOCK_H6,
  BLOCK_PARAGRAPH,
} from '@/plugins/types';
import { ReactEditor, useSlate } from 'slate-react';
import { findBlockActive, isBlockActive, toggleBlock } from '@/common/transforms';
import DropdownButton from '../dropdown-button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import 'antd/lib/dropdown/style';
import 'antd/lib/menu/style';
import { Range, Transforms } from 'slate';

const MenuItem = Menu.Item;
const headingList = [BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_H4, BLOCK_H5, BLOCK_H6];

interface OwnProps {}

type Props = OwnProps;

const ButtonHeading: FunctionComponent<Props> = props => {
  let {
    editor: { h1, h2, h3, h4, h5, h6, paragraph },
  } = useLocale();

  const [visible, setVisible] = useState(false);
  let editor = useSlate();

  const match = findBlockActive(editor, headingList);
  const value: string = match?.[0]?.type || BLOCK_PARAGRAPH;
  const [mark, setMark] = useState<Range | null>(null);

  const onClick = (e: any) => {
    e.domEvent.stopPropagation();
    const selectValue = e.key;
    if (selectValue !== value && mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      toggleBlock(editor, selectValue);
    }
    setVisible(false);
  };

  const show = () => {
    const { selection } = editor;
    setMark(selection);
    setVisible(true);
  };

  const menu = (
    <Menu onClick={onClick} className="fc-btn-head-overlay">
      <MenuItem key={BLOCK_H1}>
        <h1>{h1}</h1>
      </MenuItem>
      <MenuItem key={BLOCK_H2}>
        <h2>{h2}</h2>
      </MenuItem>
      <MenuItem key={BLOCK_H3}>
        <h3>{h3}</h3>
      </MenuItem>
      <MenuItem key={BLOCK_H4}>
        <h4>{h4}</h4>
      </MenuItem>
      <MenuItem key={BLOCK_H5}>
        <h5>{h5}</h5>
      </MenuItem>
      <MenuItem key={BLOCK_H6}>
        <h6>{h6}</h6>
      </MenuItem>
      <MenuItem key={BLOCK_PARAGRAPH}>{paragraph}</MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} visible={visible} onVisibleChange={setVisible}>
      <DropdownButton width={100} onMouseDown={show} disabled={isBlockActive(editor, BLOCK_CODE)}>
        {value === BLOCK_H1
          ? h1
          : value === BLOCK_H2
          ? h2
          : value === BLOCK_H3
          ? h3
          : value === BLOCK_H4
          ? h4
          : value === BLOCK_H5
          ? h5
          : value === BLOCK_H6
          ? h6
          : paragraph}
      </DropdownButton>
    </Dropdown>
  );
};

export default ButtonHeading;
