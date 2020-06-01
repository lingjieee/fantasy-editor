import {MARK_SUBSCRIPT, PluginOption, SlatePlugin} from '@/core/types';
import { renderLeafSubscript } from './render-leaf-subscript';
import { onKeyDownMark } from '../on-keydown-mark';

export const SubscriptPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafSubscript,
  onKeyDown: onKeyDownMark(MARK_SUBSCRIPT, hotkey ?? 'mod+,'),
});
