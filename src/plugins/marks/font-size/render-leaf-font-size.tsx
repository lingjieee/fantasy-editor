import React, { CSSProperties } from 'react';
import { RenderLeaf } from '../../..';
import { MARK_FONT_SIZE } from '../../types';

export const renderLeafFontSize: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_FONT_SIZE]) {
    const style: CSSProperties = {
      fontSize: (leaf[MARK_FONT_SIZE] as string) || '14px',
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
