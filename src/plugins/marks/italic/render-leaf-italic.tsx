import React from 'react';
import {MARK_ITALIC, RenderLeaf} from '@/core/types';

export const renderLeafItalic: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_ITALIC]) {
    return <em>{children}</em>;
  }
  return children;
};
