import { SlatePlugin } from '../../..';
import { renderElementImage } from './render-element-image';

export const ImagePlugin = (): SlatePlugin => ({
  renderElement: renderElementImage,
});
