import {Editor} from "slate";
import {withVoid} from "@/plugins/with-void";
import {BLOCK_MENTION} from "@/plugins/types";
import {withInline} from "@/plugins/with-inline";

export const withMention = () => <T extends Editor>(editor:T) => {
  editor = withVoid([BLOCK_MENTION])(editor);
  editor = withInline([BLOCK_MENTION])(editor);

  return editor;
}