import { Editor, Path, Transforms } from 'slate';
import { BLOCK_LI, BLOCK_OL, BLOCK_UL } from '@/core/types';

const ListHotkey = {
  TAB: 'Tab',
  ENTER: 'Enter',
  DELETE_BACKWARD: 'Backspace',
};

const moveDown = (editor: Editor) => {
  const { selection } = editor;
  if (selection) {
    const match = Editor.above(editor, {
      match: (n: any) => n.type === BLOCK_LI,
    });
    if (match) {
      const [, liPath] = match;
      const prevPath = Path.previous(liPath);
      const [prevNode] = Editor.node(editor, prevPath);
      const [lastNode, lastNodePath] = Editor.node(editor, prevPath.concat([(prevNode as any).children.length - 1]));
      if ([BLOCK_OL, BLOCK_UL].includes(lastNode.type as string)) {
        const newPath = lastNodePath.concat([(lastNode as any).children.length]);
        Transforms.moveNodes(editor, {
          at: liPath,
          to: newPath,
        });
      } else {
        const newPath = prevPath.concat([(prevNode as any).children.length]);
        Transforms.moveNodes(editor, {
          at: liPath,
          to: newPath,
        });
        const outerMatch = Editor.above(editor, {
          match: (n: any) => [BLOCK_UL, BLOCK_OL].includes(n.type),
        });
        if (outerMatch) {
          Transforms.wrapNodes(
            editor,
            {
              type: outerMatch[0].type,
              children: [],
            },
            {
              at: newPath,
            },
          );
        }
      }
    }
  }
};

const moveUp = (editor: Editor) => {
  const { selection } = editor;
  if (selection) {
    const match = Editor.above(editor, {
      match: (n: any) => n.type === BLOCK_LI,
    });
    if (match) {
      const [, liPath] = match;
      let nextPath = Path.next(liPath.slice(0, liPath.length - 1));
      let nest = false;
      if (nextPath.length > 1) {
        const [parent] = Editor.node(editor, nextPath.slice(0, nextPath.length - 1));
        if (parent.type === BLOCK_LI) {
          nest = true;
        }
      }
      if (nest) {
        nextPath = Path.next(nextPath.slice(0, nextPath.length - 1));
        const [pNode, pPath] = Editor.node(editor, liPath.slice(0, liPath.length - 1));
        if ((pNode as any).children.length === 1) {
          Transforms.unwrapNodes(editor, {
            at: pPath,
          });
          Transforms.moveNodes(editor, {
            at: pPath,
            to: nextPath,
          });
        } else {
          Transforms.moveNodes(editor, {
            at: liPath,
            to: nextPath,
          });
        }
      } else {
        Transforms.moveNodes(editor, {
          at: liPath,
          to: nextPath,
        });
        Transforms.unwrapNodes(editor, {
          at: nextPath,
        });
      }
    }
  }
};

const addNew = (editor: Editor) => {
  editor.insertBreak();
  const { selection } = editor;
  if (selection) {
    const {
      anchor: { path },
    } = selection;
    const match = Editor.above(editor, {
      match: (n: any) => n.type === BLOCK_LI,
    });
    if (match) {
      const [, liPath] = match;
      const itemPath = path.slice(0, liPath.length + 1);
      const nextPath = Path.next(liPath);
      Transforms.moveNodes(editor, {
        at: itemPath,
        to: nextPath,
      });
      Transforms.wrapNodes(editor, {
        type: BLOCK_LI,
        children: [],
      });
    }
  }
};

export const onKeyDownList = (e: KeyboardEvent, editor: Editor) => {
  if (Object.values(ListHotkey).includes(e.key)) {
    const match = Editor.above(editor, {
      match: n => n.type === BLOCK_LI,
    });
    if (match) {
      const [, path] = match;
      const text = Editor.string(editor, path);
      if (e.key === ListHotkey.TAB) {
        e.preventDefault();
        if (e.shiftKey) {
          moveUp(editor);
        } else {
          if (path[path.length - 1] !== 0) {
            moveDown(editor);
          }
        }
      } else if (e.key === ListHotkey.ENTER) {
        e.preventDefault();
        if (!text) {
          moveUp(editor);
        } else {
          addNew(editor);
        }
      } else if (e.key === ListHotkey.DELETE_BACKWARD) {
        if (!text) {
          e.preventDefault();
          moveUp(editor);
        }
      }
    }
  }
};
