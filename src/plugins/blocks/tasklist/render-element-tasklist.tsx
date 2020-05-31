import React from 'react';
import {RenderElement} from "@/common/types";
import {BLOCK_TASKLIST} from "@/plugins/types";
import {ReactEditor, RenderElementProps, useEditor, useReadOnly} from "slate-react";
import CheckBox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import {Transforms} from "slate";
import classNames from 'classnames';
import './style.less';

export const renderElementTaskList:RenderElement = (props) => {
  if(props.element.type === BLOCK_TASKLIST){
    return <TaskListElement {...props} children={props.children}/>
  }
}

const TaskListElement:React.FC<RenderElementProps> = ({attributes, children, element}) => {

  const checked = !!element.checked;
  let editor = useEditor();
  let readOnly = useReadOnly();

  const handleCheckboxChange = (e) => {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, {checked: e.target.checked}, {at: path})
  };

  return(
    <div {...attributes} className="fc-task-list">
      <div
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={classNames('fc-task-text', {finish: checked})}
      >
        {children}
      </div>
      <div className="fc-task-list-check"
           contentEditable="false"
           suppressContentEditableWarning>
        <CheckBox
          onChange={handleCheckboxChange}
          disabled={readOnly}
          checked={checked}/>
      </div>
    </div>
  )
}