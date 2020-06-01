import { renderElementList } from './render-element-list';
import { onKeyDownList } from './on-list-keydown';
import {SlatePlugin} from "@/core/types";

export const ListPlugin = (): SlatePlugin => ({
  renderElement: renderElementList,
  onKeyDown: onKeyDownList,
});
