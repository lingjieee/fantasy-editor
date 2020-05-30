import { BLOCK_FILE } from '../../types';
import { ReactEditor } from 'slate-react';
import { withVoid } from '../../with-void';
import isPromise from 'is-promise';
import { FileProps, insertFile, insertImage, mockUpload } from '@/utils/tools/file-tool';

export interface WithFileProps {
  handleUpload?: (file: File, onProcess: Function) => FileProps | Promise<FileProps>;
}

export const withFile = (props: WithFileProps = {}) => <T extends ReactEditor>(editor: T) => {
  editor = withVoid([BLOCK_FILE])(editor);
  (editor as any).withFile = true;
  const { insertData } = editor;
  const uploadFunc = props.handleUpload || mockUpload;
  editor.insertData = (data: DataTransfer) => {
    const withImage: boolean = (editor as any).withImage;
    const { files } = data;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const [mime] = file.type.split('/');
        const image = mime === 'image';
        const result = uploadFunc(file, () => {});
        if (isPromise(result)) {
          result.then(
            props => {
              if (image && withImage) {
                insertImage(editor, props);
              } else {
                insertFile(editor, props);
              }
            },
            () => {},
          );
        } else {
          if (image && withImage) {
            insertImage(editor, result);
          } else {
            insertFile(editor, result);
          }
        }
      }
    } else {
      insertData(data);
    }
  };
  return editor;
};
