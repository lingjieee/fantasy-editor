import React from 'react';
import { RenderElement } from '../../..';
import { BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_H4, BLOCK_H5, BLOCK_H6 } from '../../types';

export const renderElementHeading: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_H1) {
    return <h1 {...attributes}>{children}</h1>;
  }
  if (element.type === BLOCK_H2) {
    return <h2 {...attributes}>{children}</h2>;
  }
  if (element.type === BLOCK_H3) {
    return <h3 {...attributes}>{children}</h3>;
  }
  if (element.type === BLOCK_H4) {
    return <h4 {...attributes}>{children}</h4>;
  }
  if (element.type === BLOCK_H5) {
    return <h5 {...attributes}>{children}</h5>;
  }
  if (element.type === BLOCK_H6) {
    return <h6 {...attributes}>{children}</h6>;
  }
};
