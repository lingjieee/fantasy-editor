import { MARK_ITALIC, PluginOption } from '../../types';
import { SlatePlugin } from '../../..';
import { renderLeafItalic } from './render-leaf-italic';
import { onKeyDownMark } from '../on-keydown-mark';

export const ItalicPlugin = ({ hotkey }: PluginOption = {}): SlatePlugin => ({
  renderLeaf: renderLeafItalic,
  onKeyDown: onKeyDownMark(MARK_ITALIC, hotkey ?? 'mod+i'),
});
