import { renderLeafLineHeight } from './render-leaf-line-height';
import {SlatePlugin} from "@/core/types";

export const LineHeightPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafLineHeight,
});
