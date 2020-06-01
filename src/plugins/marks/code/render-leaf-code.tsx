import React from 'react';
import {MARK_CODE, RenderLeaf} from '@/core/types';
import './code.less';

export const renderLeafCode: RenderLeaf = ({ leaf, children }) => {
  if (leaf[MARK_CODE]) {
    return <code className="fc-code">{children}</code>;
  }
  return children;
};
