import escapeHtml from 'escape-html';
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
  BLOCK_TASK_LIST,
  BLOCK_UL,
  MARK_BG_COLOR,
  MARK_BOLD, MARK_CODE,
  MARK_COLOR, MARK_FONT_SIZE,
  MARK_ITALIC, MARK_LINE_HEIGHT,
  MARK_STRIKE_THROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from "@/core";
import { languages, Token, tokenize } from 'prismjs';
import 'prismjs/components/prism-antlr4';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-coffeescript';
import 'prismjs/components/prism-cmake';
import 'prismjs/components/prism-django';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-ejs';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-properties';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-scheme';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-wasm';
import 'prismjs/components/prism-yaml';

export const serializeHtml = (node:Node) => {
  if(Text.isText(node)){
    let result = escapeHtml(node.text);
    if(node[MARK_BOLD]){
      result = `<strong>${result}</strong>`
    }
    if(node[MARK_ITALIC]){
      result = `<em>${result}</em>`
    }
    if(node[MARK_UNDERLINE]){
      result = `<u>${result}</u>`
    }
    if(node[MARK_STRIKE_THROUGH]){
      result = `<s>${result}</s>`
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
      result = `<span style="background-color: #f2f2f2; border-radius: 4px; padding: 2px 4px; font-size: 12px;">${result}</span>`
    }
    if(node[MARK_FONT_SIZE]){
      result = `<span style="font-size: ${node[MARK_FONT_SIZE]||'14px'}">${result}</span>`
    }
    if(node[MARK_LINE_HEIGHT]){
      result = `<span style="line-height: ${node[MARK_LINE_HEIGHT]}">${result}</span>`
    }
    return result;
  }
  const children = node.children.map(n=>serializeHtml(n)).join('')
  switch (node.type) {
    case BLOCK_H1:
      return `<h1>${children}</h1>`;
    case BLOCK_H2:
      return `<h2>${children}</h2>`
    case BLOCK_H3:
      return `<h3>${children}</h3>`
    case BLOCK_H4:
      return `<h4>${children}</h4>`
    case BLOCK_H5:
      return `<h5>${children}</h5>`
    case BLOCK_H6:
      return `<h6>${children}</h6>`
    case BLOCK_PARAGRAPH:
      return `<p>${children}</p>`
    case BLOCK_QUOTE:
      return `<blockquote>${children}</blockquote>`
    case BLOCK_ALIGN_LEFT:
      return `<div style="text-align: left">${children}</div>`
    case BLOCK_ALIGN_CENTER:
      return `<div style="text-align: center">${children}</div>`
    case BLOCK_ALIGN_RIGHT:
      return `<div style="text-align: right">${children}</div>`
    case BLOCK_ALIGN_JUSTIFY:
      return `<div style="text-align: justify">${children}</div>`
    case BLOCK_CODE:
      return `<pre class="language-${node.lang}" data-lang="${node.lang}"><code class="language-${node.lang}">${decorateCodeBlock(node)}</code></pre>`
    case BLOCK_UL:
      return `<ul>${children}</ul>`
    case BLOCK_OL:
      return `<ol>${children}</ol>`
    case BLOCK_LI:
      return `<li>${children}</li>`
    case BLOCK_INDENT:
      let step: number = (node.step as number) || 1;
      if (step < 0) {
        step = 1;
      }
      return `<div style="padding-left: ${step*16}px">${children}</div>`
    case BLOCK_LINK:
      return `<a target="_blank" href="${node.url}" rel="noopener noreferrer">${children}</a>`
    case BLOCK_FILE:
      return `<a download="${node.filename}" href="${node.url}" rel="noopener noreferrer">${node.filename}</a>`
    case BLOCK_IMAGE:
      return `<img src="${node.url}" alt="${node.name}"/>`
    case BLOCK_HR:
      return `<hr/>`
    case BLOCK_TABLE_WRAP:
      return children;
    case BLOCK_TABLE_PRE:
    case BLOCK_TABLE_SUF:
      return '';
    case BLOCK_TABLE:
      return `<table style="border-collapse: collapse;border: 1px solid #d9d9d9">${children}</table>`
    case BLOCK_TABLE_ROW:
      return `<tr>${children}</tr>`
    case BLOCK_TABLE_CELL:
      const {rowspan, colspan}:any = node;
      return `<td style="border: 1px solid #d9d9d9; position: relative; padding: 7px 10px;" rowspan="${rowspan||1}" colspan="${colspan||1}">${children}</td>`
    case BLOCK_MENTION:
      return `<span style="padding: 3px 3px 2px;margin: 0 1px;vertical-align: baseline;display: inline-block;border-radius: 4px;background-color: #eee;font-size: 0.9em;box-shadow: none;">@${node.value}</span>`
    case BLOCK_TASK_LIST:
      if(node.checked){
        return `<div><input type="checkbox" checked="checked"><div style="opacity: 0.666;text-decoration: line-through;display: inline-block">${children}</div></div>`
      }else{
        return `<div><input type="checkbox"><div style="display: inline-block">${children}</div></div>`
      }
    default:
      return children;
  }
}

const decorateCodeBlock = (node:Node) => {
  let text = Node.string(node);
  const langName: any = node.lang || 'markup';
  const lang = languages[langName];
  if(lang){
    const tokens = tokenize(text, lang);
    return tokens.map(element=>{
      if(typeof element === 'string'){
        return `<span>${element}</span>`;
      }else{
        const token: Token = element;
        return `<span class="prism-token token ${token.type}">${token.content}</span>`;
      }
    })
  }else{
    return text;
  }
};