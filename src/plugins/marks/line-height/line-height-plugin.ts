import { SlatePlugin } from '../../../index';
import { renderLeafLineHeight } from './render-leaf-line-height';

export const LineHeightPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafLineHeight,
});
