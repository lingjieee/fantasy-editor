import {MARK_CODE, PluginOption, SlatePlugin} from '@/core/types';
import { renderLeafCode } from './render-leaf-code';
import { onKeyDownMark } from '../on-keydown-mark';

export const CodePlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafCode,
  onKeyDown: onKeyDownMark(MARK_CODE, hotkey ?? 'mod+`'),
});
