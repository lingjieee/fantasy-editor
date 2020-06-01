import React from 'react';
import {MARK_BOLD, RenderLeaf} from '@/core/types';

export const renderLeafBold: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_BOLD]) {
    return <strong>{children}</strong>;
  }
  return children;
};
