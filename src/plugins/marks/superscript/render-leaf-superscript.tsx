import React from 'react';
import {MARK_SUPERSCRIPT, RenderLeaf} from '@/core/types';

export const renderLeafSuperscript: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_SUPERSCRIPT]) {
    return <sup>{children}</sup>;
  }
  return children;
};
