import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_STRIKE_THROUGH } from '../../types';

export const renderLeafStrikeThrough: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_STRIKE_THROUGH]) {
    return <s>{children}</s>;
  }
  return children;
};
