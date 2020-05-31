import {Editor, Transforms, Path, NodeEntry} from "slate";
import {BLOCK_PARAGRAPH, BLOCK_TABLE_CELL, BLOCK_TABLE_PRE, BLOCK_TABLE_SUF, BLOCK_TABLE_WRAP} from "@/plugins/types";
import {insertRow} from "@/plugins/blocks/table/transforms";

export const getLastNode = (editor: Editor, lastPath: Path): NodeEntry => {
  let i = lastPath.length;
  while (i > 0) {
    const path = lastPath.slice(0, i);
    const node = Editor.node(editor, path);
    if (!!node[0].type) {
      return node;
    }
    i--;
  }
  return Editor.node(editor, lastPath.slice(0, 1));
};

export const onKeyDownTable = (e:KeyboardEvent, editor: Editor) => {
  if(e.key==='Meta'){
    return;
  }
  if(e.key==='z' && e.metaKey){
    return;
  }
  const matchTool = Editor.above(editor, {
    match: n => [BLOCK_TABLE_PRE, BLOCK_TABLE_SUF].includes(n.type as string)
  });
  if(matchTool){
    const [node, path] = matchTool;
    if(!['ArrowUp','ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)){
      if(e.key==='Enter'){
        let wrap = Editor.above(editor, {
          match: n => n.type === BLOCK_TABLE_WRAP
        });
        if(wrap){
          if(node.type === BLOCK_TABLE_PRE){
            Transforms.insertNodes(editor, {
              type: BLOCK_PARAGRAPH,
              children: [{text: ''}]
            }, {at: wrap[1]});
            let currentPath = path;
            path[path.length-2] = path[path.length-2]+1;
            Transforms.select(editor, currentPath);
            e.preventDefault();
          }else{
            let nextPath = Path.next(wrap[1]);
            Transforms.insertNodes(editor, {
              type: BLOCK_PARAGRAPH,
              children: [{text: ''}]
            }, {at: nextPath});
            Transforms.select(editor, nextPath);
            e.preventDefault();
          }
        }
      }else if(e.key==='Backspace'){
        let wrap = Editor.above(editor, {
          match: n => n.type === BLOCK_TABLE_WRAP
        });
        if(wrap){
          if(node.type === BLOCK_TABLE_PRE){
            let previous = Editor.previous(editor, {at: wrap[1]});
            if(previous){
              const text = Editor.string(editor, previous[1]);
              if(text){
                let [,prevPath] = Editor.last(editor, previous[1]);
                Transforms.select(editor, prevPath);
                Transforms.collapse(editor, {edge: 'end'})
              }else{
                let [,prevPath] = Editor.last(editor, previous[1]);
                let [,removePath] = getLastNode(editor, prevPath);
                Transforms.removeNodes(editor, {at: removePath});
                e.preventDefault();
              }
            }
          }else{
            Transforms.removeNodes(editor, {
              at: wrap[1]
            });
            e.preventDefault();
          }
        }
      }else{
        let wrap = Editor.above(editor, {
          match: n => n.type === BLOCK_TABLE_WRAP
        });
        if(wrap){
          if(node.type === BLOCK_TABLE_PRE){
            let previous = Editor.previous(editor, {at: wrap[1]});
            if(previous){
              let [,prevPath] = Editor.last(editor, previous[1]);
              Transforms.select(editor, prevPath);
              Transforms.collapse(editor, {edge: 'end'})
            }else{
              Transforms.insertNodes(editor,{
                type: BLOCK_PARAGRAPH,
                children: [{text: ''}]
              },{at: wrap[1]});
              Transforms.select(editor, wrap[1]);
              Transforms.collapse(editor, {edge:'end'})
            }
          }else if(node.type === BLOCK_TABLE_SUF){
            let next = Editor.next(editor, {at: wrap[1]});
            if(next){
              let [,nextPath] = Editor.first(editor, next[1]);
              Transforms.select(editor, nextPath);
              Transforms.collapse(editor, {edge:'start'})
            }else{
              let nextPath = Path.next(wrap[1]);
              Transforms.insertNodes(editor, {
                type: BLOCK_PARAGRAPH,
                children: [{text: ''}]
              }, {at: nextPath});
              Transforms.select(editor, nextPath);
              Transforms.collapse(editor, {edge: 'start'});
            }
          }
        }
      }
    }
  }else if(e.key==='Tab'){
    const matchCell = Editor.above(editor, {
      match: n => n.type === BLOCK_TABLE_CELL
    });
    if(matchCell){
      const [,cellPath] = matchCell;
      const tablePath = cellPath.slice(0, cellPath.length-2);
      let [table] = Editor.node(editor, tablePath);
      const {row, col}:any = table;
      if(cellPath[cellPath.length-2]===row-1 && cellPath[cellPath.length-1]===col-1){
        // last cell
        insertRow(editor, 'bottom')
        e.preventDefault();
      }else{
        let nextPath = cellPath.slice();
        if(cellPath[cellPath.length-1]===col-1){
          // last cell on line
          nextPath[cellPath.length-2] = cellPath[cellPath.length-2]+1;
          nextPath[cellPath.length-1] = 0;
        }else{
          // other cell
          nextPath[cellPath.length-1] = cellPath[cellPath.length-1]+1;
        }
        Transforms.select(editor, nextPath);
        Transforms.collapse(editor, {edge: 'end'})
        e.preventDefault();
      }
    }
  }else if(['ArrowUp','ArrowDown'].includes(e.key)){
    const matchCell = Editor.above(editor, {
      match: n => n.type === BLOCK_TABLE_CELL
    });
    if(matchCell){
      const [,cellPath] = matchCell;
      const tablePath = cellPath.slice(0, cellPath.length-2);
      let [table] = Editor.node(editor, tablePath);
      const {row}:any = table;
      if(e.key==='ArrowUp'){
        // move up
        if(cellPath[cellPath.length-2]===0){
          // first line
          let wrap = Editor.above(editor, {
            match: n => n.type === BLOCK_TABLE_WRAP
          });
          if(wrap){
            let previous = Editor.previous(editor, {at: wrap[1]});
            if(previous){
              Transforms.select(editor, previous[1]);
              Transforms.collapse(editor, {edge: 'end'});
              e.preventDefault();
            }
          }
        }else{
          let nextPath = cellPath.slice();
          nextPath[cellPath.length-2] = nextPath[cellPath.length-2]-1;
          Transforms.select(editor, nextPath);
          Transforms.collapse(editor, {edge: 'end'});
          e.preventDefault();
        }
      }else{
        // move down
        if(cellPath[cellPath.length-2]===row-1){
          // last line
          let wrap = Editor.above(editor, {
            match: n => n.type === BLOCK_TABLE_WRAP
          });
          if(wrap){
            let next = Editor.next(editor, {at: wrap[1]});
            if(next){
              Transforms.select(editor, next[1]);
              Transforms.collapse(editor, {edge: 'end'});
              e.preventDefault();
            }
          }
        }else{
          let nextPath = cellPath.slice();
          nextPath[cellPath.length-2] = nextPath[cellPath.length-2]+1;
          Transforms.select(editor, nextPath);
          Transforms.collapse(editor, {edge: 'end'});
          e.preventDefault();
        }
      }
    }
  }
}