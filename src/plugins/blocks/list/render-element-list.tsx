import React from 'react';
import { RenderElement } from '../../..';
import { BLOCK_LI, BLOCK_OL, BLOCK_UL } from '../../types';

export const renderElementList: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_UL) {
    return <ul {...attributes}>{children}</ul>;
  }
  if (element.type === BLOCK_OL) {
    return <ol {...attributes}>{children}</ol>;
  }
  if (element.type === BLOCK_LI) {
    return <li {...attributes}>{children}</li>;
  }
};
