import { renderElementTable } from './render-element-table';
import {onKeyDownTable} from "@/plugins/blocks/table/on-table-keydown";
import {SlatePlugin} from "@/core/types";

export const TablePlugin = (): SlatePlugin => ({
  renderElement: renderElementTable,
  onKeyDown: onKeyDownTable
});
