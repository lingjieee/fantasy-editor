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

export interface PluginOption {
  hotkey?: string;
}

export const MARK_BOLD = 'bold';
export const MARK_ITALIC = 'italic';
export const MARK_UNDERLINE = 'underline';
export const MARK_STRIKE_THROUGH = 'strike-through';
export const MARK_SUBSCRIPT = 'subscript';
export const MARK_SUPERSCRIPT = 'superscript';
export const MARK_COLOR = 'font-color';
export const MARK_BG_COLOR = 'bg-color';
export const MARK_CODE = 'code';
export const MARK_PRISM = 'prism';
export const MARK_FONT_SIZE = 'font-size';
export const MARK_LINE_HEIGHT = 'line-height';

export const BLOCK_H1 = 'h1';
export const BLOCK_H2 = 'h2';
export const BLOCK_H3 = 'h3';
export const BLOCK_H4 = 'h4';
export const BLOCK_H5 = 'h5';
export const BLOCK_H6 = 'h6';
export const BLOCK_PARAGRAPH = 'paragraph';
export const BLOCK_QUOTE = 'blockquote';
export const BLOCK_ALIGN_LEFT = 'align-left';
export const BLOCK_ALIGN_CENTER = 'align-center';
export const BLOCK_ALIGN_RIGHT = 'align-right';
export const BLOCK_ALIGN_JUSTIFY = 'align-justify';
export const BLOCK_CODE = 'code-block';
export const BLOCK_CODE_INLINE = 'code-inline';
export const BLOCK_UL = 'ul';
export const BLOCK_OL = 'ol';
export const BLOCK_LI = 'li';
export const BLOCK_INDENT = 'ident';
export const BLOCK_LINK = 'link';
export const BLOCK_FILE = 'file';
export const BLOCK_IMAGE = 'image';
export const BLOCK_HR = 'hr';
export const BLOCK_TABLE_WRAP = 'table-wrap';
export const BLOCK_TABLE = 'table';
export const BLOCK_TABLE_PRE = 'table-pre';
export const BLOCK_TABLE_SUF = 'table-suf';
export const BLOCK_TABLE_ROW = 'table-row';
export const BLOCK_TABLE_CELL = 'table-cell';
export const BLOCK_MENTION = 'mention';
export const BLOCK_TASK_LIST = 'task-list';
