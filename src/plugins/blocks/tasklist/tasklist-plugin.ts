import {SlatePlugin} from "@/core/types";
import {renderElementTaskList} from "@/plugins/blocks/tasklist/render-element-tasklist";
import {onKeyDownTask} from "@/plugins/blocks/tasklist/on-task-keydown";

export const TaskListPlugin = ():SlatePlugin => ({
  renderElement: renderElementTaskList,
  onKeyDown: onKeyDownTask
})