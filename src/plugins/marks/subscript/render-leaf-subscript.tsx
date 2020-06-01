import React from 'react';
import {MARK_SUBSCRIPT, RenderLeaf} from '@/core/types';

export const renderLeafSubscript: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_SUBSCRIPT]) {
    return <sub>{children}</sub>;
  }
  return children;
};
