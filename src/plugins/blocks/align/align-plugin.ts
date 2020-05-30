import { SlatePlugin } from '../../..';
import { renderElementAlign } from './render-element-align';

export const AlignPlugin = (): SlatePlugin => ({
  renderElement: renderElementAlign,
});
