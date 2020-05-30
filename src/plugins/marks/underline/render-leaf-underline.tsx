import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_UNDERLINE } from '../../types';

export const renderLeafUnderline: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_UNDERLINE]) {
    return <u>{children}</u>;
  }
  return children;
};
