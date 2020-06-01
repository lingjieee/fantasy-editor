import { renderLeafFontSize } from './render-leaf-font-size';
import {SlatePlugin} from "@/core/types";

export const FontSizePlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafFontSize,
});
