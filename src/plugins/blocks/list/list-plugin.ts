import { SlatePlugin } from '../../..';
import { renderElementList } from './render-element-list';
import { onKeyDownList } from './on-lise-keydown';

export const ListPlugin = (): SlatePlugin => ({
  renderElement: renderElementList,
  onKeyDown: onKeyDownList,
});
