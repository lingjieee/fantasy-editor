import { MARK_SUPERSCRIPT, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafSuperscript } from './render-leaf-superscript';
import { onKeyDownMark } from '../on-keydown-mark';

export const SuperscriptPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafSuperscript,
  onKeyDown: onKeyDownMark(MARK_SUPERSCRIPT, hotkey ?? 'mod+.'),
});
