import React from 'react';
import {MARK_UNDERLINE, RenderLeaf} from '@/core/types';

export const renderLeafUnderline: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_UNDERLINE]) {
    return <u>{children}</u>;
  }
  return children;
};
