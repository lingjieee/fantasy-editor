import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as IconBgColor } from '../../../assets/svg/bgcolor.svg';
import { ReactComponent as IconClear } from '../../../assets/svg/clear.svg';
import { ColorResult, SketchPicker } from 'react-color';
import { isBlockActive, isMarkActive } from '@/common/transforms';
import { BLOCK_CODE, MARK_BG_COLOR } from '@/core/types';
import { ReactEditor, useSlate } from 'slate-react';
import './button-bg-color.less';
import { useLocale } from '@/core/context/locale-provider';
import classNames from 'classnames';
import { Range, Transforms } from 'slate';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style';
import {DropdownButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonBgColor: FunctionComponent<Props> = props => {
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
      if (isMarkActive(editor, MARK_BG_COLOR) && v.hex === '#fff') {
        editor.removeMark(MARK_BG_COLOR);
      } else {
        editor.addMark(MARK_BG_COLOR, v.hex);
      }
    }
  };

  const cleanColor = () => {
    editor.removeMark(MARK_BG_COLOR);
    setVisible(false);
  };

  const show = () => {
    const { selection } = editor;
    setMark(selection);
    setVisible(true);
  };

  const overlay = (
    <div className={classNames('fc-btn-bg-content', 'ant-dropdown-menu')} onMouseDown={e => e.stopPropagation()}>
      <div className="fc-btn-bg-header" onClick={cleanColor}>
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
      overlayClassName="fc-btn-bg-overlay"
      onVisibleChange={setVisible}
      disabled={isBlockActive(editor, BLOCK_CODE)}
    >
      <DropdownButton width={45} onMouseDown={show}
                      disabled={isBlockActive(editor, BLOCK_CODE)}>
        <IconBgColor />
      </DropdownButton>
    </Dropdown>
  );
};

export {ButtonBgColor};
