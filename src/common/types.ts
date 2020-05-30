import { Editor, NodeEntry, Range } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

export type Decorate = (entry: NodeEntry, editor: Editor) => Range[];
export type OnDOMBeforeInput = (event: Event, editor: Editor) => void;
export type RenderElement = (props: RenderElementProps) => JSX.Element | undefined;
export type RenderLeaf = (props: RenderLeafProps) => JSX.Element | undefined;
export type OnKeyDown = (e: any, editor: Editor, options?: any) => void;

export interface SlatePlugin {
  decorate?: Decorate;
  onDOMBeforeInput?: OnDOMBeforeInput;
  renderElement?: RenderElement;
  renderLeaf?: RenderLeaf;
  onKeyDown?: OnKeyDown;
}

export interface Config {
  plugin?: {
    undo?: boolean;
    redo?: boolean;
    heading?: boolean;
    fontSize?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
    blockquote?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    fontColor?: boolean;
    backgroundColor?: boolean;
    align?: boolean;
    code?: boolean;
    codeBlock?: boolean;
    list?: boolean;
    ident?: boolean;
    lineHeight?: boolean;
    link?: boolean;
    file?: boolean;
    image?: boolean;
    hr?: boolean;
    table?: boolean;
    full?: boolean;
    video?: boolean;
  };
  editor?: {
    height?: number;
  };
}

export interface Locale {
  locale: string;
  editor: {
    placeholder?: string;
    undo?: string;
    redo?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    paragraph?: string;
    removeColor?: string;
  };
}
