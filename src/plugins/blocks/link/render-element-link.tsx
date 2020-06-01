import React from 'react';
import {BLOCK_LINK, RenderElement} from '@/core/types';

export const renderElementLink: RenderElement = ({ attributes, children, element }) => {
  if (element.type === BLOCK_LINK) {
    const url: string = element.url as string;
    return (
      <a {...attributes} target="_blank" href={url} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};
