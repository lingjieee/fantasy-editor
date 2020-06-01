import { Editor } from 'slate';
import isHotkey from 'is-hotkey';
import { toggleMark } from '@/common/transforms';

export function onKeyDownMark(type: string, hotkey?: string, clear?: string) {
  if (!hotkey) {
    return undefined;
  }
  return (e: any, editor: Editor) => {
    if (isHotkey(hotkey, e)) {
      toggleMark(editor, type, clear);
      e.preventDefault();
    }
  };
}
