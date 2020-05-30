import { SlatePlugin } from '../../..';
import { renderLeafBgColor } from './render-leaf-bg-color';

export const BgColorPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafBgColor,
});
