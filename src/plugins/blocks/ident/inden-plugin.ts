import { renderElementIdent } from './render-element-ident';
import {SlatePlugin} from "@/core/types";

export const IdentPlugin = (): SlatePlugin => ({
  renderElement: renderElementIdent,
});
