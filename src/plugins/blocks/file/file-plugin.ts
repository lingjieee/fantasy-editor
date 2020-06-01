import { renderElementFile } from './render-element-file';
import {SlatePlugin} from "@/core/types";

export const FilePlugin = (): SlatePlugin => ({
  renderElement: renderElementFile,
});
