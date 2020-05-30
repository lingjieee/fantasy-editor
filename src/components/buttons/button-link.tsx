import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { ReactComponent as IconLink } from '../../assets/svg/link.svg';
import ToolbarButton from '../toolbar-button';
import { isBlockActive } from '@/common/transforms';
import { ReactEditor, useSlate } from 'slate-react';
import { BLOCK_LINK } from '@/plugins/types';
import { Transforms, Range } from 'slate';
import './button-link.less';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style';

interface OwnProps {}

type Props = OwnProps;

const ButtonLink: FunctionComponent<Props> = props => {
  let editor = useSlate();
  const [value, setValue] = useState({
    editable: true,
    text: '',
    link: '',
  });
  const [mark, setMark] = useState<any>({
    selection: null,
    isCollapsed: false,
  });
  const [visible, setVisible] = useState(false);

  const toggleLink = () => {
    const active = isBlockActive(editor, BLOCK_LINK);
    if (active) {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === BLOCK_LINK,
      });
    } else {
      const { selection } = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      setMark({
        selection,
        isCollapsed,
      });
      setValue({
        editable: !!isCollapsed,
        text: '',
        link: '',
      });
      setVisible(true);
    }
  };

  const onInsert = (value: any) => {
    const { selection, isCollapsed } = mark;
    const link = {
      type: BLOCK_LINK,
      url: value.url,
      children: isCollapsed ? [{ text: value.text }] : [],
    };
    if (selection) {
      ReactEditor.focus(editor);
      Transforms.select(editor, selection);
      if (isCollapsed) {
        Transforms.insertNodes(editor, link, { at: selection });
      } else {
        if (selection) {
          Transforms.wrapNodes(editor, link, { split: true, at: selection });
          Transforms.collapse(editor, { edge: 'end' });
        }
      }
    }
    setValue({
      ...value,
      text: null,
      link: null,
    });
    setVisible(false);
  };

  return (
    <Popover
      visible={visible}
      content={<Input {...value} onCancel={() => setVisible(false)} onSave={onInsert} />}
      onVisibleChange={setVisible}
      trigger={['click']}
      placement="bottom">
      <ToolbarButton onMouseDown={toggleLink} active={isBlockActive(editor, BLOCK_LINK)}>
        <IconLink />
      </ToolbarButton>
    </Popover>
  );
};

interface InputProps {
  editable: boolean;
  text: string;
  link: string;
  onSave: (value: { text: string; url: string }) => void;
  onCancel: () => void;
}

const Input: React.FC<InputProps> = props => {
  const nameRef = useRef<any>();
  const urlRef = useRef<any>();

  const { editable, text, link, onSave, onCancel } = props;

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = text || '';
    }
  }, [text]);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.value = link || '';
    }
  }, [link]);

  const handleSave = () => {
    const text = nameRef.current?.value || '';
    const url = urlRef.current?.value || '';
    if (!url || (editable && !text)) {
      return;
    }
    onSave?.({ text, url });
  };

  return (
    <div className="fc-btn-link-container">
      {editable && (
        <div className="fc-btn-link-row">
          <div className="fc-btn-link-label">
            <label>文本</label>
          </div>
          <div className="fc-btn-link-input-wrap">
            <input type="text" className="fc-btn-link-input" ref={nameRef} />
          </div>
        </div>
      )}
      <div className="fc-btn-link-row">
        <div className="fc-btn-link-label">
          <label>URL</label>
        </div>
        <div className="fc-btn-link-input-wrap">
          <input type="text" className="fc-btn-link-input" ref={urlRef} />
        </div>
      </div>
      <div className="fc-btn-link-button-wrap">
        <button onClick={onCancel}>取消</button>
        <button className="primary" onClick={handleSave}>
          插入
        </button>
      </div>
    </div>
  );
};

export default ButtonLink;
