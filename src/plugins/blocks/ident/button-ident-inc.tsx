import React, { FunctionComponent } from 'react';
import { isBlockActive } from '@/common/transforms';
import { useSlate } from 'slate-react';
import { BLOCK_INDENT } from '@/core/types';
import { ReactComponent as IconIdentInc } from '@/assets/svg/ident.svg';
import { Editor, Transforms } from 'slate';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonIdentInc: FunctionComponent<Props> = props => {
  const editor = useSlate();

  const toggleIdent = () => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === BLOCK_INDENT,
    }) as any;
    if (match) {
      const [node, path] = match;
      const step = (node?.step || 1) + 1;
      Transforms.setNodes(
        editor,
        {
          step,
        },
        {
          at: path,
        },
      );
    } else {
      Transforms.wrapNodes(editor, {
        type: BLOCK_INDENT,
        step: 1,
        children: [],
      });
    }
  };

  return (
    <ToolbarButton onMouseDown={toggleIdent} active={isBlockActive(editor, BLOCK_INDENT)}>
      <IconIdentInc />
    </ToolbarButton>
  );
};

export {ButtonIdentInc};
