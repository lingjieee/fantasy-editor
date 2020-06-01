import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as IconFontColor } from '../../../assets/svg/font-color.svg';
import { ReactComponent as IconClear } from '../../../assets/svg/clear.svg';
import { ColorResult, SketchPicker } from 'react-color';
import { isBlockActive, isMarkActive } from '../../../common/transforms';
import { BLOCK_CODE, MARK_COLOR } from '@/core/types';
import { ReactEditor, useSlate } from 'slate-react';
import './button-font-color.less';
import { useLocale } from '@/core/context/locale-provider';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style';
import classNames from 'classnames';
import { Range, Transforms } from 'slate';
import {DropdownButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonFontColor: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(false);
  const editor = useSlate();
  const {
    editor: { removeColor },
  } = useLocale();
  const [color, setColor] = useState<string>('#1890ff');
  const [mark, setMark] = useState<Range | null>(null);

  const handleColorChange = (v: ColorResult) => {
    setColor(v.hex);
    setVisible(false);
    if (mark) {
      ReactEditor.focus(editor);
      Transforms.select(editor, mark);
      if (isMarkActive(editor, MARK_COLOR) && v.hex === '#000000') {
        editor.removeMark(MARK_COLOR);
      } else {
        editor.addMark(MARK_COLOR, v.hex);
      }
    }
  };

  const cleanColor = () => {
    editor.removeMark(MARK_COLOR);
    setVisible(false);
  };

  const show = () => {
    const { selection } = editor;
    setMark(selection);
    setVisible(true);
  };

  const overlay = (
    <div className={classNames('fc-btn-font-content', 'ant-dropdown-menu')} onMouseDown={e => e.stopPropagation()}>
      <div className="fc-btn-font-header" onClick={cleanColor}>
        <IconClear />
        <span>{removeColor}</span>
      </div>
      <SketchPicker disableAlpha={true} color={color} onChange={handleColorChange} />
    </div>
  );

  return (
    <Dropdown
      trigger={['click']}
      overlay={overlay}
      visible={visible}
      overlayClassName="fc-btn-font-overlay"
      onVisibleChange={setVisible}
    >
      <DropdownButton width={45} onMouseDown={show} disabled={isBlockActive(editor, BLOCK_CODE)}>
        <IconFontColor />
      </DropdownButton>
    </Dropdown>
  );
};

export {ButtonFontColor};
