import React from 'react';
import { RenderLeaf } from '../../..';
import { MARK_CODE } from '../../types';
import './code.less';

export const renderLeafCode: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_CODE]) {
    return <code className="fc-code">{children}</code>;
  }
  return children;
};
