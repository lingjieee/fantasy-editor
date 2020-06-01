import { ReactEditor } from 'slate-react';
import { withVoid } from '../../with-void';
import { BLOCK_IMAGE } from '@/core/types';
import { isImageUrl } from '@/utils/is-url';
import { FileProps, insertImage, mockUpload } from '@/utils/tools/file-tool';
import isPromise from 'is-promise';

export interface WithImageProps {
  handleUpload?: (file: File, onProcess: Function) => FileProps | Promise<FileProps>;
}

export const withImage = (props: WithImageProps = {}) => <T extends ReactEditor>(editor: T) => {
  editor = withVoid([BLOCK_IMAGE])(editor);
  (editor as any).withImage = true;
  const { insertData } = editor;
  const uploadFunc = props.handleUpload || mockUpload;
  editor.insertData = (data: DataTransfer) => {
    if ((editor as any).withFile) {
      insertData(data);
    } else {
      const text = data.getData('text/plain');
      const { files } = data;
      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          const [mime] = file.type.split('/');
          if (mime === 'image') {
            const result = uploadFunc(file, () => {});
            if (isPromise(result)) {
              result.then(
                props => {
                  insertImage(editor, props);
                },
                () => {},
              );
            } else {
              insertImage(editor, result);
            }
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, {
          url: text,
          name: '',
          status: 'finish',
        });
      } else {
        insertData(data);
      }
    }
  };
  return editor;
};
