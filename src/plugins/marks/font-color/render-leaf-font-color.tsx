import React, { CSSProperties } from 'react';
import { RenderLeaf } from '../../..';
import { MARK_COLOR } from '../../types';

export const renderLeafFontColor: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_COLOR]) {
    const style: CSSProperties = {
      color: leaf[MARK_COLOR] as string,
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
