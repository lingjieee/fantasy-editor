import React, { CSSProperties } from 'react';
import { RenderLeaf } from '../../../index';
import { MARK_LINE_HEIGHT } from '../../types';

export const renderLeafLineHeight: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_LINE_HEIGHT]) {
    let styles: CSSProperties = {
      lineHeight: leaf[MARK_LINE_HEIGHT] as number,
    };
    return <span style={styles}>{children}</span>;
  }
  return children;
};
