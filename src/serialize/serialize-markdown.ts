import {Node, Text} from 'slate';
import {
  BLOCK_ALIGN_CENTER,
  BLOCK_ALIGN_JUSTIFY,
  BLOCK_ALIGN_LEFT,
  BLOCK_ALIGN_RIGHT,
  BLOCK_CODE,
  BLOCK_FILE,
  BLOCK_H1,
  BLOCK_H2,
  BLOCK_H3,
  BLOCK_H4,
  BLOCK_H5,
  BLOCK_H6,
  BLOCK_HR,
  BLOCK_IMAGE,
  BLOCK_INDENT,
  BLOCK_LI,
  BLOCK_LINK,
  BLOCK_MENTION,
  BLOCK_OL,
  BLOCK_PARAGRAPH,
  BLOCK_QUOTE,
  BLOCK_TABLE,
  BLOCK_TABLE_CELL,
  BLOCK_TABLE_PRE,
  BLOCK_TABLE_ROW,
  BLOCK_TABLE_SUF,
  BLOCK_TABLE_WRAP,
  BLOCK_TASK_LIST, BLOCK_UL,
  MARK_BG_COLOR,
  MARK_BOLD,
  MARK_CODE,
  MARK_COLOR,
  MARK_FONT_SIZE,
  MARK_ITALIC,
  MARK_LINE_HEIGHT,
  MARK_STRIKE_THROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from "@/core";

const serialize = (node:Node, listLevel?:number, liIdx?:number) => {
  if(Text.isText(node)){
    let result = node.text.replaceAll('\n', '  \n');
    if(node[MARK_BOLD]){
      result = `**${result}**`
    }
    if(node[MARK_ITALIC]){
      result = `*${result}*`
    }
    if(node[MARK_UNDERLINE]){
      result = `<s>${result}</s>`
    }
    if(node[MARK_STRIKE_THROUGH]){
      result = `~~${result}~~`
    }
    if(node[MARK_SUBSCRIPT]){
      result = `<sub>${result}</sub>`
    }
    if(node[MARK_SUPERSCRIPT]){
      result = `<sup>${result}</sup>`
    }
    if(node[MARK_COLOR]){
      result = `<span style="color: ${node[MARK_COLOR]}">${result}</span>`
    }
    if(node[MARK_BG_COLOR]){
      result = `<span style="background-color: ${node[MARK_BG_COLOR]}">${result}</span>`
    }
    if(node[MARK_CODE]){
      result = `\`${result}\``
    }
    if(node[MARK_FONT_SIZE]){
      result = `<span style="font-size: ${node[MARK_FONT_SIZE]||'14px'}">${result}</span>`
    }
    if(node[MARK_LINE_HEIGHT]){
      result = `<span style="line-height: ${node[MARK_LINE_HEIGHT]}">${result}</span>`
    }
    return result;
  }
  let children;
  if(node.type===BLOCK_OL){
    const level = (listLevel??0)+1;
    children = node.children.map((n,i)=>serialize(n,level,i)).join('')
  }else if(node.type===BLOCK_UL){
    const level = (listLevel??0)+1;
    children = node.children.map((n)=>serialize(n,level)).join('')
  }else{
    children = node.children.map(n=>serialize(n, listLevel)).join('')
  }
  switch (node.type) {
    case BLOCK_H1:
      return `# ${children}\n`;
    case BLOCK_H2:
      return `## ${children}\n`
    case BLOCK_H3:
      return `### ${children}\n`
    case BLOCK_H4:
      return `#### ${children}\n`
    case BLOCK_H5:
      return `##### ${children}\n`
    case BLOCK_H6:
      return `###### ${children}\n`
    case BLOCK_PARAGRAPH:
      return `${children}  \n`
    case BLOCK_QUOTE:
      return `> ${children.replaceAll('\n', '\n> ')}\n\n`
    case BLOCK_ALIGN_LEFT:
      return `<div style="text-align: left">${children}</div>\n`
    case BLOCK_ALIGN_CENTER:
      return `<div style="text-align: center">${children}</div>\n`
    case BLOCK_ALIGN_RIGHT:
      return `<div style="text-align: right">${children}</div>\n`
    case BLOCK_ALIGN_JUSTIFY:
      return `<div style="text-align: justify">${children}</div>\n`
    case BLOCK_CODE:
      return `\`\`\`${node.lang}\n${children}\n\`\`\`\n`
    case BLOCK_UL:
    case BLOCK_OL:
      return `${children}\n`;
    case BLOCK_LI:
      let prefix = '';
      if((listLevel??1)>1){
        for(let i = 1; i < listLevel; i++){
          prefix+='  ';
        }
      }
      if(typeof liIdx === 'number'){
        return `${prefix}${liIdx+1}. ${children}`;
      }else{
        return `${prefix}* ${children}`
      }
    case BLOCK_INDENT:
      let step: number = (node.step as number) || 1;
      if (step < 0) {
        step = 1;
      }
      return `<div style="padding-left: ${step*16}px">${children}</div>\n`
    case BLOCK_LINK:
      return `[${children}](${node.url})`
    case BLOCK_FILE:
      return `[${node.filename}](${node.url})`
    case BLOCK_IMAGE:
      return `![${node.name}](${node.url})`
    case BLOCK_HR:
      return `---`
    case BLOCK_TABLE_WRAP:
      return children;
    case BLOCK_TABLE_PRE:
    case BLOCK_TABLE_SUF:
      return '';
    case BLOCK_TABLE:
      return `<table style="border-collapse: collapse;">${children}</table>`
    case BLOCK_TABLE_ROW:
      return `<tr>${children}</tr>`
    case BLOCK_TABLE_CELL:
      const {rowspan, colspan}:any = node;
      return `<td style="border: 1px solid #d9d9d9; position: relative; padding: 7px 10px;" rowspan="${rowspan||1}" colspan="${colspan||1}">${children}</td>`
    case BLOCK_MENTION:
      return `<span style="padding: 3px 3px 2px;margin: 0 1px;vertical-align: baseline;display: inline-block;border-radius: 4px;background-color: #eee;font-size: 0.9em;box-shadow: none;">@${node.value}</span>`
    case BLOCK_TASK_LIST:
      if(node.checked){
        return `[x]${children}\n`;
      }else{
        return `[ ]${children}\n`
      }
    default:
      return children;
  }
}

export const serializeMarkdown = (nodes:Node[]) => {
  const editor = {
    children: nodes
  }
  return serialize(editor);
};