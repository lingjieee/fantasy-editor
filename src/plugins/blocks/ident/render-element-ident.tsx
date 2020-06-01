import React, { CSSProperties } from 'react';
import {BLOCK_INDENT, RenderElement} from '@/core/types';

export const renderElementIdent: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_INDENT) {
    let step: number = (element.step as number) || 1;
    if (step < 0) {
      step = 1;
    }
    const style: CSSProperties = {
      paddingLeft: step * 16,
    };
    return (
      <div {...attributes} style={style}>
        {children}
      </div>
    );
  }
};
