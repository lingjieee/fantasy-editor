import {MentionPluginOptions} from "@/plugins/blocks/mention/types";
import {SlatePlugin} from "@/common/types";
import {renderElementMention} from "@/plugins/blocks/mention/render-element-mention";

export const MentionPlugin = (options?:MentionPluginOptions):SlatePlugin => ({
  renderElement: renderElementMention
})