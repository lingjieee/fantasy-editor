import { renderElementImage } from './render-element-image';
import {SlatePlugin} from "@/core/types";

export const ImagePlugin = (): SlatePlugin => ({
  renderElement: renderElementImage,
});
