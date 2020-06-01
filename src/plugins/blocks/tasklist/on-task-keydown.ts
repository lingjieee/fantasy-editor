import {Editor, Transforms} from "slate";
import {BLOCK_PARAGRAPH, BLOCK_TASK_LIST} from "@/core/types";

export const onKeyDownTask = (e:KeyboardEvent, editor: Editor) => {
  const match = Editor.above(editor, {
    match: n => n.type === BLOCK_TASK_LIST
  });
  if(match){
    const [,path] = match;
    if(e.key === 'Enter'){
      const text = Editor.string(editor, path);
      if(!text){
        e.preventDefault();
        Transforms.setNodes(editor, {
          type: BLOCK_PARAGRAPH
        })
      }
    }
  }
}