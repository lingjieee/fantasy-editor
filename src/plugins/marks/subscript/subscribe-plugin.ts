import { MARK_SUBSCRIPT, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafSubscript } from './render-leaf-subscript';
import { onKeyDownMark } from '../on-keydown-mark';

export const SubscriptPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafSubscript,
  onKeyDown: onKeyDownMark(MARK_SUBSCRIPT, hotkey ?? 'mod+,'),
});
