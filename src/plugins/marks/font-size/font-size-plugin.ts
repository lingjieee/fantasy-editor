import { SlatePlugin } from '../../..';
import { renderLeafFontSize } from './render-leaf-font-size';

export const FontSizePlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafFontSize,
});
