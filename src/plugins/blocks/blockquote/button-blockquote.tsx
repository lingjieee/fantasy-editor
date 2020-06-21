import React, { FunctionComponent } from 'react';
import { ReactComponent as IconQuote } from '../../../assets/svg/quote.svg';
import { useSlate } from 'slate-react';
import { isBlockActive } from '@/common/transforms';
import {BLOCK_CODE, BLOCK_QUOTE} from '@/core/types';
import { Transforms } from 'slate';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonBlockQuote: FunctionComponent<Props> = props => {
  const editor = useSlate();

  const toggleBlock = () => {
    const active = isBlockActive(editor, BLOCK_QUOTE);
    if (active) {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === BLOCK_QUOTE,
      });
    } else {
      Transforms.wrapNodes(editor, {
        type: BLOCK_QUOTE,
        children: [],
      });
    }
  };

  return (
    <ToolbarButton onMouseDown={toggleBlock}
                   disabled={isBlockActive(editor, BLOCK_CODE)}
                   active={isBlockActive(editor, BLOCK_QUOTE)}>
      <IconQuote />
    </ToolbarButton>
  );
};

export {ButtonBlockQuote};
