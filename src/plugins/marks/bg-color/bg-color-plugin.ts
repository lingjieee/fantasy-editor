import { renderLeafBgColor } from './render-leaf-bg-color';
import {SlatePlugin} from "@/core/types";

export const BgColorPlugin = (): SlatePlugin => ({
  renderLeaf: renderLeafBgColor,
});
