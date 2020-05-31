import React, {FunctionComponent, useState} from 'react';
// @ts-ignore
import initValue from './value.json';
import {Node} from 'slate';
import FantasyEditor, {Config} from "fantasy-editor";

interface OwnProps {
}

type Props = OwnProps;

const FullUsage: FunctionComponent<Props> = (props) => {

  const [value, setValue] = useState<Node[]>(initValue as any);
  const config: Config = {
    plugin: {
      undo: true,
      redo: true,
      heading: true,
      fontSize: true,
      bold: true,
      italic: true,
      underline: true,
      strikeThrough: true,
      blockquote: true,
      subscript: true,
      superscript: true,
      fontColor: true,
      backgroundColor: true,
      align: true,
      code: true,
      codeBlock: true,
      list: true,
      tasklist: true,
      ident: true,
      link: true,
      image: true,
      file: true,
      hr: true,
      table: true,
      lineHeight: true,
      full: true,
      mention: true
    },
  };

  const onChange = (value: Node[]) => {
    setValue(value);
  };

  return (
    <div style={{padding: 50}}>
      <FantasyEditor value={value} config={config} onChange={onChange}/>
    </div>
  );
};

export default FullUsage;
