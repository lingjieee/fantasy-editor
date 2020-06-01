import { renderElementCodeBlock } from './render-emelemt-code-block';
import { renderLeafCodeBlock } from './render-leaf-code-block';
import { onKeyDownCodeBlock } from './on-code-block-keydown';
import { codeBlockDecorate } from './code-block-decorate';
import {SlatePlugin} from "@/core/types";

export const CodeBlockPlugin = (): SlatePlugin => ({
  renderElement: renderElementCodeBlock,
  renderLeaf: renderLeafCodeBlock,
  onKeyDown: onKeyDownCodeBlock,
  decorate: codeBlockDecorate,
});
