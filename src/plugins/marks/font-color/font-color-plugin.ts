import { renderLeafFontColor } from './render-leaf-font-color';
import {SlatePlugin} from "@/core/types";

export const FontColorPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafFontColor,
});
