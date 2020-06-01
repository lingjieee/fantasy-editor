import { renderElementHr } from './render-element-hr';
import {SlatePlugin} from "@/core/types";

export const HrPlugin = (): SlatePlugin => ({
  renderElement: renderElementHr,
});
