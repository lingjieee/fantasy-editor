import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_PRISM } from '../../types';
import 'prismjs/themes/prism.css';

export const renderLeafCodeBlock: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_PRISM]) {
    return <span className={leaf?.className as string}>{children}</span>;
  }
  return children;
};
