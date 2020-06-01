import { renderElementHeading } from './render-element-heading';
import { onKeyDownHeading } from './on-heading-keydown';
import {SlatePlugin} from "@/core/types";

export const HeadingPlugin = (): SlatePlugin => ({
  renderElement: renderElementHeading,
  onKeyDown: onKeyDownHeading,
});
