import React, { CSSProperties } from 'react';
import { RenderLeaf } from '../../..';
import { MARK_BG_COLOR } from '../../types';

export const renderLeafBgColor: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_BG_COLOR]) {
    let style: CSSProperties = {
      backgroundColor: leaf[MARK_BG_COLOR] as string,
    };
    return <span style={style}>{children}</span>;
  }
  return children;
};
