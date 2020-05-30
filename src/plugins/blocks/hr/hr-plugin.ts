import { SlatePlugin } from '../../..';
import { renderElementHr } from './render-element-hr';

export const HrPlugin = (): SlatePlugin => ({
  renderElement: renderElementHr,
});
