import { SlatePlugin } from '../../..';
import { renderLeafFontColor } from './render-leaf-font-color';

export const FontColorPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafFontColor,
});
