import { Editor } from 'slate';
import { OnKeyDown, SlatePlugin } from '@/core/types';

export const onKeydownPlugins = (editor: Editor, plugins: SlatePlugin[], onKeyDownList: OnKeyDown[]) => (
  event: any,
) => {
  onKeyDownList.forEach(onKeyDown => {
    onKeyDown(event, editor);
  });
  plugins.forEach(({ onKeyDown }) => {
    onKeyDown?.(event, editor);
  });
};
