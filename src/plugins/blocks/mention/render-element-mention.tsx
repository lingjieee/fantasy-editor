import React from 'react';
import { MentionRenderElementProps } from '@/plugins/blocks/mention/types';
import { BLOCK_MENTION } from '@/core/types';
import {MentionElement} from '@/plugins/blocks/mention/components/mention-element';
import {RenderElementProps} from "slate-react";

export const renderElementMention = ({ prefix = '@', onClick }: MentionRenderElementProps) => ({attributes, element, children}:RenderElementProps) => {
  if (element.type === BLOCK_MENTION) {
    return <MentionElement prefix={prefix} element={element} children={children} onClick={onClick} attributes={attributes} />;
  }
};
