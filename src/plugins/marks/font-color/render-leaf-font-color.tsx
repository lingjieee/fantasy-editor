import React, { CSSProperties } from 'react';
import {MARK_COLOR, RenderLeaf} from '@/core/types';

export const renderLeafFontColor: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_COLOR]) {
    const style: CSSProperties = {
      color: leaf[MARK_COLOR] as string,
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
