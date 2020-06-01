import {MARK_BOLD, PluginOption, SlatePlugin} from '@/core/types';
import { renderLeafBold } from './render-leaf-bold';
import { onKeyDownMark } from '../on-keydown-mark';

export const BoldPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafBold,
  onKeyDown: onKeyDownMark(MARK_BOLD, hotkey ?? 'mod+b'),
});
