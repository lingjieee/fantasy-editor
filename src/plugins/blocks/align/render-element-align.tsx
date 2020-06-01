import React from 'react';
import { RenderElement, BLOCK_ALIGN_CENTER, BLOCK_ALIGN_JUSTIFY, BLOCK_ALIGN_LEFT, BLOCK_ALIGN_RIGHT } from '@/core/types';
import './align.less';

export const renderElementAlign: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_ALIGN_LEFT) {
    return (
      <div {...attributes} className="fc-align-left">
        {children}
      </div>
    );
  }
  if (element.type === BLOCK_ALIGN_CENTER) {
    return (
      <div {...attributes} className="fc-align-center">
        {children}
      </div>
    );
  }
  if (element.type === BLOCK_ALIGN_RIGHT) {
    return (
      <div {...attributes} className="fc-align-right">
        {children}
      </div>
    );
  }
  if (element.type === BLOCK_ALIGN_JUSTIFY) {
    return (
      <div {...attributes} className="fc-align-justify">
        {children}
      </div>
    );
  }
};
