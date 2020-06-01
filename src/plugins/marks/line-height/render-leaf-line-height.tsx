import React, { CSSProperties } from 'react';
import {MARK_LINE_HEIGHT, RenderLeaf} from '@/core/types';

export const renderLeafLineHeight: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_LINE_HEIGHT]) {
    const styles: CSSProperties = {
      lineHeight: leaf[MARK_LINE_HEIGHT] as number,
    };
    return <span style={styles}>{children}</span>;
  }
  return children;
};
