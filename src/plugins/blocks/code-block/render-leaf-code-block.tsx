import React from 'react';
import {MARK_PRISM, RenderLeaf} from '@/core/types';
import 'prismjs/themes/prism.css';

export const renderLeafCodeBlock: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_PRISM]) {
    return <span className={leaf?.className as string}>{children}</span>;
  }
  return children;
};
