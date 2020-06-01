import React, { CSSProperties } from 'react';
import {MARK_BG_COLOR, RenderLeaf} from '@/core/types';

export const renderLeafBgColor: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_BG_COLOR]) {
    const style: CSSProperties = {
      backgroundColor: leaf[MARK_BG_COLOR] as string,
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
