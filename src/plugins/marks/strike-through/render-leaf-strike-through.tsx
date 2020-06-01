import React from 'react';
import {MARK_STRIKE_THROUGH, RenderLeaf} from '@/core/types';

export const renderLeafStrikeThrough: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_STRIKE_THROUGH]) {
    return <s>{children}</s>;
  }
  return children;
};
