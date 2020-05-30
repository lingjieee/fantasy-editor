import { MARK_STRIKE_THROUGH, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafStrikeThrough } from './render-leaf-strike-through';
import { onKeyDownMark } from '../on-keydown-mark';

export const StrikeThroughPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafStrikeThrough,
  onKeyDown: onKeyDownMark(MARK_STRIKE_THROUGH, hotkey ?? 'mod+shift+k'),
});
