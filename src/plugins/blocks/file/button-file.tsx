import React, { FunctionComponent } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Range, Transforms } from 'slate';
import { insertFile, insertImage, mockUpload } from '@/utils/tools/file-tool';
import isPromise from 'is-promise';
import { ReactComponent as IconFile } from '../../../assets/svg/file.svg';
import {ToolbarButton} from "@/components";

interface OwnProps {}

type Props = OwnProps;

const ButtonFile: FunctionComponent<Props> = props => {
  const editor = useSlate();

  const handleMouseDown = () => {
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    if (!isCollapsed) {
      Transforms.collapse(editor, { edge: 'end' });
    }
    const eleInput = document.createElement('input');
    eleInput.type = 'file';
    eleInput.style.display = 'none';
    eleInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const [mime] = file.type.split('/');
        const image = mime === 'image';
        const withImage = (editor as any).withImage;
        const result = mockUpload(file, () => {});
        ReactEditor.focus(editor);
        if (selection) {
          Transforms.select(editor, selection);
        }
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
            insertFile(editor, file);
          }
        }
      }
    };
    eleInput.click();
  };

  return (
    <ToolbarButton onMouseDown={handleMouseDown}>
      <IconFile />
    </ToolbarButton>
  );
};

export {ButtonFile};
