import { SlatePlugin } from '../../..';
import { renderElementBlockQuote } from './render-element-blockquote';
import { onKeyDownBlockquote } from './on-block-keydown';

export const BlockQuotePlugin = (): SlatePlugin => ({
  renderElement: renderElementBlockQuote,
  onKeyDown: onKeyDownBlockquote,
});
