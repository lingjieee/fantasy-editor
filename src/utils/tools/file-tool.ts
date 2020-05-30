import { Editor, Transforms } from 'slate';
import { BLOCK_FILE, BLOCK_IMAGE } from '../../plugins/types';

export interface FileProps {
  name: string;
  url: string;
  status?: 'finish' | 'pending' | 'error';
}

export const mockUpload = (file: File, onProcess: Function): Promise<FileProps> => {
  const [mime] = file.type.split('/');
  if (mime === 'image') {
    const render = new FileReader();
    return new Promise<FileProps>((resolve, reject) => {
      render.addEventListener('load', () => {
        const url = render.result;
        if (url) {
          resolve({
            name: file.name,
            url: url as string,
            status: 'finish',
          });
        } else {
          reject();
        }
      });
      render.onerror = () => {
        reject();
      };
      render.onabort = () => {
        reject();
      };
      render.readAsDataURL(file);
    });
  } else {
    return new Promise<FileProps>(resolve => {
      resolve({
        name: file.name,
        url: URL.createObjectURL(file),
        status: 'finish',
      });
    });
  }
};

export const insertFile = (editor: Editor, file: FileProps) => {
  const fileNode = {
    type: BLOCK_FILE,
    url: file.url,
    filename: file.name,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, fileNode);
};

export const insertImage = (editor: Editor, file: FileProps) => {
  const image = {
    type: BLOCK_IMAGE,
    url: file.url,
    name: file.name,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, image);
};
