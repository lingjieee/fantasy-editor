import React, { FunctionComponent } from 'react';
import { ReactComponent as IconImage } from '../../../assets/svg/image.svg';
import { ReactEditor, useSlate } from 'slate-react';
import { Range, Transforms } from 'slate';
import { insertImage, mockUpload } from '@/utils/tools/file-tool';
import isPromise from 'is-promise';
import {ToolbarButton} from "@/components";
import {isBlockActive} from "@/common";
import {BLOCK_CODE} from "@/core";

interface OwnProps {}

type Props = OwnProps;

const ButtonImage: FunctionComponent<Props> = props => {
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
    eleInput.accept = 'image/*';
    eleInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const result = mockUpload(file, () => {});
        ReactEditor.focus(editor);
        if (selection) {
          Transforms.select(editor, selection);
        }
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
    };
    eleInput.click();
  };

  return (
    <ToolbarButton
      disabled={isBlockActive(editor, BLOCK_CODE)}
      onMouseDown={handleMouseDown}>
      <IconImage />
    </ToolbarButton>
  );
};

export {ButtonImage};
