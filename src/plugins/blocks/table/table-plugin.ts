import { SlatePlugin } from '../../..';
import { renderElementTable } from './render-element-table';

export const TablePlugin = (): SlatePlugin => ({
  renderElement: renderElementTable,
});
