import {SlatePlugin} from "@/core/types";
import {onKeyDownSoftBreak} from "@/plugins/other/soft-break/on-soft-break-keydown";

export const SoftBreakPlugin = ():SlatePlugin => ({
  onKeyDown: onKeyDownSoftBreak(),
})