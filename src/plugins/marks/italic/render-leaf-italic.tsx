import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_ITALIC } from '../../types';

export const renderLeafItalic: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_ITALIC]) {
    return <em>{children}</em>;
  }
  return children;
};
