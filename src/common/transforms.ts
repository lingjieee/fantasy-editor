import { Editor, Transforms } from 'slate';
import castArray from 'lodash/castArray';

export const isMarkActive = (editor: Editor, type: string) => {
  const marks = Editor.marks(editor);
  return marks ? !!marks[type] : false;
};

export const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type===format,
  }) as any;
  return !!match;
};

export const isBlockActiveList = (editor: Editor, formats: string[]) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => formats.includes(n.type),
  }) as any;
  return !!match;
};

export const findBlockActive = (editor: Editor, formats: string[]) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => formats.includes(n.type),
  }) as any;
  return match;
};

export const toggleMark = (editor: Editor, key: string, clear: string | string[] = []) => {
  const isActive = isMarkActive(editor, key);
  if (isActive) {
    editor.removeMark(key);
    return;
  }

  const clears: string[] = castArray(clear);
  clears.forEach(item => {
    editor.removeMark(item);
  });
  editor.addMark(key, true);
};

export const toggleBlock = (editor: Editor, format: string) => {
  let active = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    {
      type: active ? 'paragraph' : format,
    },
    { split: false },
  );
};
