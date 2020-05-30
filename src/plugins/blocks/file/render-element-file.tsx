import React from 'react';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import classNames from 'classnames';
import './file.less';
import { RenderElement } from '../../..';
import { BLOCK_FILE } from '../../types';
import FileIcon from '../../../components/file-icon/FileIcon';

export const renderElementFile: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_FILE) {
    return <FileElement attributes={attributes} element={element} children={children} />;
  }
};

const FileElement = ({ attributes, children, element }: RenderElementProps) => {
  let selected = useSelected();
  let focused = useFocused();
  return (
    <div {...attributes} className="fc-file-wrap">
      <div
        contentEditable="false"
        className={classNames('fc-file', { selected : selected && focused })}
        suppressContentEditableWarning>
        <FileIcon className="fc-file-icon" name={element.filename as string} />
        <span className="fc-file-filename">{element.filename as string}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};
