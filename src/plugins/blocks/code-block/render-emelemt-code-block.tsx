import React, { forwardRef } from 'react';
import { RenderElement } from '../../..';
import { BLOCK_CODE, BLOCK_CODE_INLINE } from '../../types';
import './code-block.less';
import { languages } from './constants';
import { ReactEditor, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import Select from 'antd/lib/select';
import 'antd/lib/select/style';

export const renderElementCodeBlock: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_CODE) {
    return (
      <CodeBlock {...attributes} element={element}>
        {children}
      </CodeBlock>
    );
  } else if (element.type === BLOCK_CODE_INLINE) {
    return (
      <div {...attributes} data-slate-type={BLOCK_CODE_INLINE}>
        {children}
      </div>
    );
  }
};

const CodeBlock: React.FC<any> = forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const lang = props.element.lang || 'markup';
  const editor = useSlate();

  const changeLang = (value: any) => {
    const path = ReactEditor.findPath(editor, props.element);
    if (value) {
      Transforms.setNodes(
        editor,
        {
          type: BLOCK_CODE,
          lang: value,
        },
        {
          at: path,
        },
      );
    }
  };

  return (
    <div className="fc-code-block">
      <pre {...rest} ref={ref} key={lang}>
        <code>{children}</code>
      </pre>
      <div contentEditable="false" suppressContentEditableWarning className="select">
        <Select
          value={lang}
          showSearch
          onChange={changeLang}
          virtual={false}
          size="small"
          style={{ width: 100 }}
          dropdownMatchSelectWidth={false}
        >
          {Object.keys(languages).map(key => (
            <Select.Option key={key} value={key}>
              {languages[key]}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
});
