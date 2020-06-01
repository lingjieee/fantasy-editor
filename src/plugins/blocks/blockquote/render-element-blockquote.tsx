import React from 'react';
import {BLOCK_QUOTE, RenderElement} from '@/core/types';
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
