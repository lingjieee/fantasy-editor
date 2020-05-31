import { SlatePlugin } from '../../..';
import { renderElementTable } from './render-element-table';
import {onKeyDownTable} from "@/plugins/blocks/table/on-table-keydown";

export const TablePlugin = (): SlatePlugin => ({
  renderElement: renderElementTable,
  onKeyDown: onKeyDownTable
});
