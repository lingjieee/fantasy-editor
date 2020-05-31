import {Editor, Range} from "slate";
import isHotkey from "is-hotkey";

export const onKeyDownSoftBreak = () => (event: KeyboardEvent, editor: Editor) => {
  if (isHotkey('shift+enter', event) &&
    editor.selection &&
    Range.isCollapsed(editor.selection)) {
    event.preventDefault();
    editor.insertText('\n');
  }
}