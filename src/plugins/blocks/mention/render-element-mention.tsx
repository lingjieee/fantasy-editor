import React from 'react';
import {MentionRenderElementProps} from "@/plugins/blocks/mention/types";
import {BLOCK_MENTION} from "@/plugins/types";
import MentionElement from "@/plugins/blocks/mention/components/mention-element";

export const renderElementMention = ({prefix = '@', element, children, ...rest}:MentionRenderElementProps) => {
    if(element.type === BLOCK_MENTION){
      return <MentionElement prefix={prefix} element={element} children={children} {...rest}/>
    }
}