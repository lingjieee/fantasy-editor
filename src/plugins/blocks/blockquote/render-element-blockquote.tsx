import React from 'react';
import { RenderElement } from '../../..';
import { BLOCK_QUOTE } from '../../types';
import './blockquote.less';

export const renderElementBlockQuote: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_QUOTE) {
    return (
      <blockquote {...attributes} className="fc-blockquote">
        {children}
      </blockquote>
    );
  }
};
