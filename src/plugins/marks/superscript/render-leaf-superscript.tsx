import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_SUPERSCRIPT } from '../../types';

export const renderLeafSuperscript: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_SUPERSCRIPT]) {
    return <sup>{children}</sup>;
  }
  return children;
};
