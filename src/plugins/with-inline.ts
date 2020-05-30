import { Editor } from 'slate';

export const withInline = (types: string[]) => <T extends Editor>(editor: T) => {
  const { isInline } = editor;
  editor.isInline = element => (types.includes(element.type as string) ? true : isInline(element));
  return editor;
};
