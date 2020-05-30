import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_SUBSCRIPT } from '../../types';

export const renderLeafSubscript: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_SUBSCRIPT]) {
    return <sub>{children}</sub>;
  }
  return children;
};
