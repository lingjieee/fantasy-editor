import { renderElementAlign } from './render-element-align';
import {SlatePlugin} from "@/core/types";

export const AlignPlugin = (): SlatePlugin => ({
  renderElement: renderElementAlign,
});
