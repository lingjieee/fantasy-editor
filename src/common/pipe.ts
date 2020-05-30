import { Editor } from 'slate';

export function pipe(x: Editor, ...fns: Function[]) {
  return fns.reduce((y: any, fn) => fn(y), x);
}
