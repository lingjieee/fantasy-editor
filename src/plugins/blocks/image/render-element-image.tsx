import React from 'react';
import {BLOCK_IMAGE, RenderElement} from '@/core/types';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import './image.module.less';
import classNames from 'classnames';

export const renderElementImage: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_IMAGE) {
    return <ImageElement attributes={attributes} children={children} element={element} />;
  }
};

const ImageElement = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable="false" suppressContentEditableWarning>
        <img src={element.url as string} className={classNames('fc-image', { selected: selected && focused })} alt="" />
      </div>
      <div>{children}</div>
    </div>
  );
};
