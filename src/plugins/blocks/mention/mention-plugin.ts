import { MentionPluginOptions } from '@/plugins/blocks/mention/types';
import { renderElementMention } from '@/plugins/blocks/mention/render-element-mention';
import {SlatePlugin} from "@/core/types";

export const MentionPlugin = (options: MentionPluginOptions = {}): SlatePlugin => ({
  renderElement: renderElementMention(options),
});
