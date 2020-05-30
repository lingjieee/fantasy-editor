import { SlatePlugin } from '../../..';
import { renderElementFile } from './render-element-file';

export const FilePlugin = (): SlatePlugin => ({
  renderElement: renderElementFile,
});
