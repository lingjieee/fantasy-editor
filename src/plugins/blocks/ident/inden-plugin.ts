import { SlatePlugin } from '../../..';
import { renderElementIdent } from './render-element-ident';

export const IdentPlugin = (): SlatePlugin => ({
  renderElement: renderElementIdent,
});
