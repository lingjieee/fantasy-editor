import { renderElementBlockQuote } from './render-element-blockquote';
import { onKeyDownBlockquote } from './on-block-keydown';
import {SlatePlugin} from "@/core/types";

export const BlockQuotePlugin = (): SlatePlugin => ({
  renderElement: renderElementBlockQuote,
  onKeyDown: onKeyDownBlockquote,
});
