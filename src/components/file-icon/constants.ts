import ai from '../../assets/file-icon/ai.svg';
import app from '../../assets/file-icon/app.svg';
import axure from '../../assets/file-icon/axure.svg';
import book from '../../assets/file-icon/book.svg';
import common from '../../assets/file-icon/common.svg';
import css from '../../assets/file-icon/css.svg';
import dmg from '../../assets/file-icon/dmg.svg';
import excel from '../../assets/file-icon/excel.svg';
import exe from '../../assets/file-icon/exe.svg';
import html from '../../assets/file-icon/html.svg';
import img from '../../assets/file-icon/img.svg';
import jar from '../../assets/file-icon/jar.svg';
import java from '../../assets/file-icon/java.svg';
import js from '../../assets/file-icon/js.svg';
import json from '../../assets/file-icon/json.svg';
import keynote from '../../assets/file-icon/keynote.svg';
import md from '../../assets/file-icon/md.svg';
import music from '../../assets/file-icon/music.svg';
import numbers from '../../assets/file-icon/numbers.svg';
import pages from '../../assets/file-icon/pages.svg';
import pdf from '../../assets/file-icon/pdf.svg';
import php from '../../assets/file-icon/php.svg';
import pkg from '../../assets/file-icon/pkg.svg';
import ppt from '../../assets/file-icon/ppt.svg';
import psd from '../../assets/file-icon/psd.svg';
import python from '../../assets/file-icon/python.svg';
import sh from '../../assets/file-icon/sh.svg';
import sketch from '../../assets/file-icon/sketch.svg';
import sql from '../../assets/file-icon/sql.svg';
import text from '../../assets/file-icon/text.svg';
import video from '../../assets/file-icon/video.svg';
import vue from '../../assets/file-icon/vue.svg';
import word from '../../assets/file-icon/word.svg';
import xmind from '../../assets/file-icon/xmind.svg';
import zip from '../../assets/file-icon/zip.svg';

export const FILE_TYPE_MAP: Record<string, string[]> = {
  ai: ['ai', 'eps'],
  app: ['app'],
  axure: ['rp'],
  book: [
    'mobi',
    'oeb',
    'lit',
    'xeb',
    'ebx',
    'rb',
    'pdb',
    'epub',
    'azw3',
    'hlp',
    'chm',
    'wdl',
    'ceb',
    'abm',
    'pdg',
    'caj',
  ],
  css: ['css', 'less', 'sass'],
  dmg: ['dmg'],
  excel: ['csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx'],
  exe: ['exe'],
  html: ['htm', 'html', 'mht'],
  img: ['png', 'bmp', 'jpg', 'jpeg', 'gif', 'webp', 'tga', 'exif', 'fpx', 'svg', 'hdri', 'raw'],
  java: ['java'],
  jar: ['jar'],
  js: ['js'],
  json: ['json'],
  keynote: ['key'],
  md: ['md', 'markdown'],
  music: ['mp3', 'cda', 'wav', 'wma', 'ra', 'mida', 'ogg', 'ape', 'flac', 'aac'],
  numbers: ['numbers'],
  pages: ['pages'],
  pdf: ['pdf'],
  php: ['php'],
  pkg: ['pkg'],
  ppt: ['fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx'],
  psd: ['psd'],
  python: ['python'],
  sh: ['sh'],
  sketch: ['sketch'],
  sql: ['sql'],
  text: ['text', 'txt'],
  video: ['mp4', 'avi', 'mov', 'rmvb', 'rm', 'flv', 'mpeg', 'wmv', 'mkv'],
  vue: ['vue'],
  word: ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'odt', 'ott', 'rtf'],
  xmind: ['xmind'],
  zip: ['zip', 'rar', 'tar', 'gz', 'gzip', 'uue', 'bz2', 'iso', '7z', 'z', 'ace', 'lzh', 'arj', 'cab'],
};

export const FILE_ICON_MAP: Record<string, string> = {
  ai,
  app,
  axure,
  book,
  css,
  dmg,
  excel,
  exe,
  html,
  img,
  java,
  jar,
  js,
  json,
  keynote,
  md,
  music,
  numbers,
  pages,
  pdf,
  php,
  pkg,
  ppt,
  psd,
  python,
  sh,
  sketch,
  sql,
  text,
  video,
  vue,
  word,
  xmind,
  zip,
  common,
};
