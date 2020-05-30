import { SlatePlugin } from '../../..';
import { renderElementLink } from './render-element-link';

export const LinkPlugin = (): SlatePlugin => ({
  renderElement: renderElementLink,
});
