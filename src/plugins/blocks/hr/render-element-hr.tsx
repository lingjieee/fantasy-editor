import React from 'react';
import {BLOCK_HR, RenderElement} from '@/core/types';
import './hr.less';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import classNames from 'classnames';

export const renderElementHr: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_HR) {
    return <HrElement attributes={attributes} element={element} children={children} />;
  }
};

const HrElement = ({ attributes, children }: RenderElementProps) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <div {...attributes}>
      <div
        contentEditable="false"
        className={classNames('fc-hr', { selected: selected && focused })}
        suppressContentEditableWarning
      >
        <hr />
      </div>
      <div>{children}</div>
    </div>
  );
};
