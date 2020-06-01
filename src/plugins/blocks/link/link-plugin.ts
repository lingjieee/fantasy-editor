import { renderElementLink } from './render-element-link';
import {SlatePlugin} from "@/core/types";

export const LinkPlugin = (): SlatePlugin => ({
  renderElement: renderElementLink,
});
