import React, { CSSProperties } from 'react';
import {MARK_FONT_SIZE, RenderLeaf} from '@/core/types';

export const renderLeafFontSize: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_FONT_SIZE]) {
    const style: CSSProperties = {
      fontSize: (leaf[MARK_FONT_SIZE] as string) || '14px',
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
