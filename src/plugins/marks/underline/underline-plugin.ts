import { MARK_UNDERLINE, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafUnderline } from './render-leaf-underline';
import { onKeyDownMark } from '../on-keydown-mark';

export const UnderlinePlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafUnderline,
  onKeyDown: onKeyDownMark(MARK_UNDERLINE, hotkey ?? 'mod+u'),
});
