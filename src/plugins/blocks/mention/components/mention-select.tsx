import React, {FunctionComponent, useEffect, useRef} from 'react';
import {MentionNodeData} from "@/plugins/blocks/mention/types";
import {ReactEditor, useSlate} from "slate-react";
import {Range} from 'slate';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './style.less'

interface MentionSelectProps {
  at: Range| null;
  options: MentionNodeData[];
  valueIndex: number;
}

const Portal:({children:any}) => React.ReactPortal =
  ({children}) => ReactDOM.createPortal(children, document.body);

const MentionSelect: FunctionComponent<MentionSelectProps> =
  ({
    at,
    options,
    valueIndex,
   }) => {

  const ref = useRef<HTMLDivElement>();
  const editor = useSlate();

  useEffect(()=>{
    if(at && options.length>0){
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, at);
      const rect = domRange.getBoundingClientRect();
      if(el){
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [options.length, editor, at]);

  if(!at || !options.length){
    return null;
  }

  return (
    <Portal>
      <div ref={ref} className="fc-select-portal">
        {options.map((option,i)=>(
          <div
            key={`${i}${option.value}`}
            className={classNames("fc-select-item", {selected: i===valueIndex})}
          >
            {option.value}
          </div>
        ))}
      </div>
    </Portal>
  );
};

export default MentionSelect;
