import { MARK_BOLD, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafBold } from './render-leaf-bold';
import { onKeyDownMark } from '../on-keydown-mark';

export const BoldPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafBold,
  onKeyDown: onKeyDownMark(MARK_BOLD, hotkey ?? 'mod+b'),
});
