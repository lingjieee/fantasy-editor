import { SlatePlugin } from '../../..';
import { renderElementHeading } from './render-element-heading';
import { onKeyDownHeading } from './on-heading-keydown';

export const HeadingPlugin = (): SlatePlugin => ({
  renderElement: renderElementHeading,
  onKeyDown: onKeyDownHeading,
});
