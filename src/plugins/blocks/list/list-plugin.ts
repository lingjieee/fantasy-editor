import { SlatePlugin } from '../../..';
import { renderElementList } from './render-element-list';
import { onKeyDownList } from './on-list-keydown';

export const ListPlugin = (): SlatePlugin => ({
  renderElement: renderElementList,
  onKeyDown: onKeyDownList,
});
