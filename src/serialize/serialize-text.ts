import {Node} from 'slate';

export const serializeText = (nodes:Node[]) => {
  return nodes.map(n => Node.string(n)).join('\n');
}