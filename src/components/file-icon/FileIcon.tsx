import React, { FunctionComponent } from 'react';
import { FILE_ICON_MAP, FILE_TYPE_MAP } from './constants';

const getIconType = (extname: string) => {
  let fileType: string = 'common';
  Object.keys(FILE_TYPE_MAP).map(type => {
    FILE_TYPE_MAP[type].map(name => {
      if (name === extname) {
        fileType = type;
      }
      return null;
    });
    return null;
  });
  return fileType;
};

const getExtname = (filename: string) => {
  if (!filename) {
    return false;
  }
  const index = filename.lastIndexOf('.');
  if (index !== -1) {
    return filename.substring(index + 1, filename.length).toLowerCase();
  }
  return false;
};

interface OwnProps {
  extname?: string;
  url?: string;
  name?: string;
  className?: string;
}

type Props = OwnProps;

const FileIcon: FunctionComponent<Props> = props => {
  const { extname, url, name, className } = props;
  let ext = extname;
  if (url && getExtname(url)) {
    ext = getExtname(url) as string;
  } else if (name && getExtname(name)) {
    ext = getExtname(name) as string;
  }
  const file = FILE_ICON_MAP[getIconType(ext as string)] || FILE_ICON_MAP['common'];
  return <img src={file} className={className} alt="" />;
};

export default FileIcon;
