import { Editor } from 'slate';

export const withVoid = (types: string[]) => <T extends Editor>(editor: T) => {
  const { isVoid } = editor;
  editor.isVoid = element => (types.includes(element.type as string) ? true : isVoid(element));
  return editor;
};
