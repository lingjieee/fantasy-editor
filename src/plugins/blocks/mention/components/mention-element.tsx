import React from 'react';
import {RenderElementProps, useFocused, useSelected} from 'slate-react';
import { MentionRenderElementProps } from '@/plugins/blocks/mention/types';
import './style.less';
import classNames from 'classnames';

const MentionElement: React.FC<MentionRenderElementProps & RenderElementProps> = ({ attributes, children, element, prefix, onClick }) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <span
      {...attributes}
      contentEditable={'false'}
      suppressContentEditableWarning
      className={classNames('fc-mention', { selected: selected && focused })}
      onClick={() => onClick?.({ value: element.value })}
    >
      {prefix}
      {element.value}
      {children}
    </span>
  );
};

export {MentionElement};
