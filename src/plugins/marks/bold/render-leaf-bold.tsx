import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_BOLD } from '../../types';

export const renderLeafBold: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_BOLD]) {
    return <strong>{children}</strong>;
  }
  return children;
};
